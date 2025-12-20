import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Await the query and use lowercase 'admin'
    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1 AND role='admin'",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(400).json({ msg: "Admin not found" });
    }

    const admin = result.rows[0];

    // Compare hashed password
    if (password !== admin.password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Success response
    res.json({
      msg: "Admin login successful",
      token,
      admin: { id: admin.id, name: admin.name, role: admin.role },
    });
  } catch (error) {
    console.error("Admin login error:", error.message);
    res.status(500).json({ msg: "Admin login failed", error: error.message });
  }
};

export default adminLogin;
