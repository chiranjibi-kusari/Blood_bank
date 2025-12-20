import pool from "../database/db.js";
// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching users", error: err.message });
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
      [name, email, phone, role, req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
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
      [req.params.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ msg: "User not found" });
    res.json({ msg: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting user", error: err.message });
  }
};
