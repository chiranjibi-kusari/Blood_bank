import pool from "../database/db.js";

/* Distance calculation (Haversine formula) */
function calculateDistance(lat1, lon1, lat2, lon2) {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export const findMatchingDonors = async (requestId) => {
  // 1. Get request details
  const requestResult = await pool.query(
    `SELECT * FROM requests WHERE id = $1`,
    [requestId],
  );

  if (requestResult.rows.length === 0) {
    throw new Error("Request not found");
  }

  const request = requestResult.rows[0];

  // 2. Find eligible donors
  const donorsResult = await pool.query(
    `
    SELECT
      d.id AS donation_id,
      d.user_id AS donor_user_id,
      d.name,
      d.phone,
      d.blood_group,
      d.units,
      d.latitude,
      d.longitude,
      uds.last_donation_date
    FROM donations d
    LEFT JOIN user_donation_stats uds ON uds.user_id = d.user_id
    WHERE
      d.status = 'available'
      AND d.expiry_date >= CURRENT_DATE
      AND check_blood_compatibility($1, d.blood_group) = TRUE
    `,
    [request.blood_group],
  );

  // 3. Calculate distance + log matches
  const matchedDonors = [];

  for (const donor of donorsResult.rows) {
    const distance = calculateDistance(
      request.latitude,
      request.longitude,
      donor.latitude,
      donor.longitude,
    );

    await pool.query(
      `
      INSERT INTO matching_logs (
        request_id,
        donor_id,
        donor_user_id,
        requester_user_id,
        distance_km,
        compatibility,
        outcome
      )
      VALUES ($1, $2, $3, $4, $5, TRUE, 'success')
      `,
      [
        request.id,
        donor.donation_id,
        donor.donor_user_id,
        request.user_id,
        distance,
      ],
    );

    matchedDonors.push({
      donation_id: donor.donation_id,
      name: donor.name,
      phone: donor.phone,
      blood_group: donor.blood_group,
      units: donor.units,
      distance_km: distance,
    });
  }

  // 4. Sort by nearest distance
  matchedDonors.sort(
    (a, b) => (a.distance_km ?? 9999) - (b.distance_km ?? 9999),
  );

  return matchedDonors;
};
