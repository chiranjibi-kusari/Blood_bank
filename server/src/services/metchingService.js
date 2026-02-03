import pool from "../database/db.js";
import axios from "axios";

const bloodCompatibility = {
  "A+": ["A+", "A-", "O+", "O-"],
  "A-": ["A-", "O-"],
  "B+": ["B+", "B-", "O+", "O-"],
  "B-": ["B-", "O-"],
  "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "AB-": ["A-", "B-", "AB-", "O-"],
  "O+": ["O+", "O-"],
  "O-": ["O-"],
};

const urgencyMap = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 3,
};

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export async function matchDonorsForRequest(requestId) {
  const reqRes = await pool.query("SELECT * FROM requests WHERE id = $1", [
    requestId,
  ]);

  if (!reqRes.rows.length) throw new Error("Request not found");

  const request = reqRes.rows[0];
  const compatible = bloodCompatibility[request.blood_group];

  const donorsRes = await pool.query(
    `SELECT *, CURRENT_DATE - donation_date AS days_since_donation
     FROM donations
     WHERE blood_group = ANY($1)`,
    [compatible],
  );

  const results = [];

  for (const donor of donorsRes.rows) {
    const distance = haversine(
      request.latitude,
      request.longitude,
      donor.latitude,
      donor.longitude,
    );

    const mlResponse = await axios.post("http://localhost:8000/predict", {
      distance: distance,
      days_since_donation: donor.days_since_donation,
      urgency: urgencyMap[request.urgency],
    });

    results.push({
      donor_id: donor.id,
      name: donor.name,
      blood_group: donor.blood_group,
      phone: donor.phone,
      distance_km: distance.toFixed(2),
      priority_score: mlResponse.data.priority_score,
    });
  }

  return results.sort((a, b) => b.priority_score - a.priority_score);
}
