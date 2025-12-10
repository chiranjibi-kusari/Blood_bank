import pool from "../database/db.js";

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM userss");
    res.json(result.rows);
    console.log(res.json(result.rows));
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
