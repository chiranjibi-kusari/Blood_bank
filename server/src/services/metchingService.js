import pool from "../database/db.js";
import { compatibleDonorGroups } from "../utils/compatibility.js";
import { haversineKm } from "../utils/haversine.js";
import { spawn } from "child_process";
import path from "path";

export async function predictMatch(features) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.resolve("server/ml/predict.py");
    const py = spawn("python", [scriptPath]);
    py.stdin.write(JSON.stringify(features));
    py.stdin.end();

    let data = "";
    py.stdout.on("data", (chunk) => (data += chunk.toString()));
    py.stderr.on("data", (err) => reject(err.toString()));
    py.on("close", () => resolve(parseFloat(data)));
  });
}

function urgencyLevel(urgency) {
  switch (urgency?.toLowerCase()) {
    case "high":
      return 3;
    case "medium":
      return 2;
    case "low":
      return 1;
    default:
      return 2;
  }
}

const matchDonorsForRequest = async (requestId, topN = 10) => {
  const reqRes = await pool.query("SELECT * FROM requests WHERE id=$1", [
    requestId,
  ]);
  if (reqRes.rows.length === 0) throw new Error("Request not found");
  const req = reqRes.rows[0];

  const groups = compatibleDonorGroups(req.blood_group);
  if (groups.length === 0) return [];

  const donorsRes = await pool.query(
    `SELECT id, user_id, blood_group, units, donation_date, latitude, longitude
     FROM donations
     WHERE blood_group = ANY($1::text[]) AND units > 0`,
    [groups],
  );

  const donors = donorsRes.rows;

  const scoredDonors = await Promise.all(
    donors.map(async (d) => {
      const distance =
        req.latitude && req.longitude && d.latitude && d.longitude
          ? haversineKm(req.latitude, req.longitude, d.latitude, d.longitude)
          : 0;

      const recencyDays = d.donation_date
        ? (Date.now() - new Date(d.donation_date).getTime()) /
          (1000 * 60 * 60 * 24)
        : 30;

      const score = await predictMatch({
        distance,
        units_ratio: Math.min(d.units / req.units, 1),
        urgency: urgencyLevel(req.urgency),
        recency_days: recencyDays,
      });

      return { ...d, distance, score };
    }),
  );

  return scoredDonors.sort((a, b) => b.score - a.score).slice(0, topN);
};

export default matchDonorsForRequest;
