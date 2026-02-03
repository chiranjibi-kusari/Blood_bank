import { PythonShell } from "python-shell";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import pool from "../database/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class MLHelper {
  constructor() {
    this.pythonScriptPath = join(__dirname, "../ml/predict.py");
  }

  // Blood compatibility function
  isBloodCompatible(recipientBg, donorBg) {
    const compatibilityRules = {
      "A+": ["A+", "A-", "O+", "O-"],
      "A-": ["A-", "O-"],
      "B+": ["B+", "B-", "O+", "O-"],
      "B-": ["B-", "O-"],
      "AB+": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      "AB-": ["AB-", "A-", "B-", "O-"],
      "O+": ["O+", "O-"],
      "O-": ["O-"],
    };
    return compatibilityRules[recipientBg]?.includes(donorBg) || false;
  }

  // Calculate distance using Haversine formula
  calculateDistance(lat1, lon1, lat2, lon2) {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;

    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRad(lat1)) *
        Math.cos(this.toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  toRad(degrees) {
    return degrees * (Math.PI / 180);
  }

  // Call Python ML model
  async predictMatch(features) {
    try {
      const options = {
        mode: "text",
        pythonPath: "python3",
        pythonOptions: ["-u"],
        scriptPath: join(__dirname, "../ml"),
        args: [JSON.stringify(features)],
      };

      return new Promise((resolve, reject) => {
        PythonShell.run("predict.py", options, (err, results) => {
          if (err) {
            console.error("❌ ML Prediction error:", err);
            resolve(0.5);
          } else {
            try {
              const probability = parseFloat(results[0]);
              resolve(isNaN(probability) ? 0.5 : probability);
            } catch (error) {
              console.error("❌ Error parsing ML result:", error);
              resolve(0.5);
            }
          }
        });
      });
    } catch (error) {
      console.error("❌ ML prediction failed:", error);
      return 0.5;
    }
  }

  // Extract features for ML model
  extractFeatures(request, donor, distance) {
    const now = new Date();
    const donationDate = new Date(donor.donation_date);
    const daysSinceDonation = Math.max(
      0,
      Math.floor((now - donationDate) / (1000 * 60 * 60 * 24)),
    );

    return {
      distance_km: Math.min(distance / 100, 1),
      blood_exact_match: request.blood_group === donor.blood_group ? 1 : 0,
      blood_compatible: this.isBloodCompatible(
        request.blood_group,
        donor.blood_group,
      )
        ? 1
        : 0,
      donor_experience: Math.min(donor.donation_count || 0, 10) / 10,
      days_since_last_donation: Math.min(daysSinceDonation, 365) / 365,
      urgency_high: request.urgency === "high" ? 1 : 0,
      urgency_medium: request.urgency === "medium" ? 1 : 0,
      time_of_day: now.getHours() / 24,
      day_of_week: now.getDay() / 7,
      requested_units: Math.min(request.units, 10) / 10,
      available_units: Math.min(donor.units, 10) / 10,
      patient_age: request.patient_age
        ? Math.min(request.patient_age, 100) / 100
        : 0.5,
    };
  }

  // Get donor history from database
  async getDonorHistory(userId) {
    try {
      const result = await query(
        `SELECT COUNT(*) as donation_count, 
                MAX(donation_date) as last_donation_date,
                AVG(units) as avg_units
         FROM donations 
         WHERE user_id = $1`,
        [userId],
      );
      return (
        result.rows[0] || {
          donation_count: 0,
          last_donation_date: null,
          avg_units: 1,
        }
      );
    } catch (error) {
      console.error("Error getting donor history:", error);
      return { donation_count: 0, last_donation_date: null, avg_units: 1 };
    }
  }
}

export default new MLHelper();
