import pool from "../database/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//register user

export const registerUser = async (req, res) => {
  const { name, email, phone, role = "user", password } = req.body;

  try {
    // Check if email already exists
    const existing = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      const errorMsg =
        role === "admin"
          ? "Admin registration failed: email already exists"
          : "User registration failed: email already exists";
      return res.status(400).json({ msg: errorMsg });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    const result = await pool.query(
      "INSERT INTO users (name, email, phone, role, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, phone, role",
      [name, email, phone, role, hashedPassword],
    );

    const user = result.rows[0];

    // ✅ Different success messages
    const successMsg =
      user.role === "admin"
        ? "Admin registered successfully"
        : "User registered successfully";

    res.status(201).json({ msg: successMsg, user });
  } catch (err) {
    console.error("Login error FULL:", err); // 👈 VERY IMPORTANT
    const errorMsg =
      role === "admin"
        ? "Admin registration error: server issue"
        : "User registration error: server issue";
    res.status(500).json({ msg: errorMsg, error: err.message });
  }
};

//login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.status(400).json({
        msg: "Login failed: account not found",
      });
    }

    const user = result.rows[0];

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      const errorMsg =
        user.role === "admin"
          ? "Admin login failed: incorrect password"
          : "User login failed: incorrect password";
      return res.status(400).json({ msg: errorMsg });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" },
    );

    // ✅ Different success messages
    const successMsg =
      user.role === "admin"
        ? "Admin login successful"
        : "User login successful";

    res.json({
      msg: successMsg,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    const errorMsg =
      req.body.role === "admin"
        ? "Admin login error: server issue"
        : "User login error: server issue";
    res.status(500).json({ msg: errorMsg, error: err.message });
  }
};

// Get all users with pagination
export const getAllUsers = async (req, res) => {
  try {
    // Get page and limit (size) from query parameters, with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(req.query.size) || 10;

    // Validate parameters
    if (page < 1) {
      return res.status(400).json({
        success: false,
        msg: "Page must be greater than 0",
      });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        msg: "Limit must be between 1 and 100",
      });
    }

    // Calculate offset
    const offset = (page - 1) * limit;

    // Get total count of users
    const countResult = await pool.query(
      "SELECT COUNT(*) FROM users WHERE role='user'",
    );
    const total = parseInt(countResult.rows[0].count);

    // Get paginated users WITHOUT password and sensitive data
    const result = await pool.query(
      `SELECT 
        id,
        name, 
        email, 
        phone, 
        role
       FROM users WHERE role='user'
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Return paginated response with all pagination info
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: total,
        totalPages: totalPages,
      },
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching users",
      error: err.message,
    });
  }
};

// Get single user by ID
export const getUserById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [
      req.params.id,
    ]);
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user", error: err.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { name, email, phone, role } = req.body;
  try {
    const result = await pool.query(
      "UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING id, name, email, phone, role",
      [name, email, phone, role, req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ msg: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM users WHERE id=$1 RETURNING id",
      [req.params.id],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user", error: err.message });
  }
};
