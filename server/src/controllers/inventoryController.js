import { INVALID } from "zod/v3";
import pool from "../database/db.js";

//get all inventory
export const getAllInventory = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching inventory", error: err.message });
  }
};

//get single inventory
export const getInventoryById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM inventory WHERE id=$1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Inventory record not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching inventory record", error: err.message });
  }
};

//update inventory records
export const updateInventory = async (req, res) => {
  const { unit_available, expired_date } = req.body;
  try {
    const result = await pool.query(
      "UPDATE inventory SET unit_available=$1,expired_date=$2 WHERE id=$3 RETURNING *",
      [unit_available, expired_date, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Inventory record not found" });
    }
    res.json({
      msg: "Inventory updated successfully",
      inventory: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error updating inventory", error: err.message });
  }
};

//delete inventory

export const deleteInventory = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM inventory WHERE id=$1 RETURNING *",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Inventory record not found" });
    }
    res.json({ msg: "Inventory record deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error deleting inventory", error: err.message });
  }
};
