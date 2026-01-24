import pool from "../database/db.js";
import geocodeAddress from "../utils/geocode.js";


//create donations
export const createDonation = async (req, res) => {
  try {
    const { user_id, name, email, phone, address, blood_group, units } =
      req.body;
    const coords = await geocodeAddress(address);

    const result = await pool.query(
      `INSERT INTO donations 
       (user_id, name, email, phone, address, blood_group, units, donation_date, latitude, longitude) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,CURRENT_DATE,$8,$9) RETURNING *`,
      [
        user_id,
        name,
        email,
        phone,
        address,
        blood_group,
        units,
        coords?.lat,
        coords?.lon,
      ]
    );

    res.json({
      msg: "Donation created successfully",
      donation: result.rows[0],
    });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating donation", error: err.message });
  }
};

//get all donations
export const getAllDonations = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donations ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching donations", error: err.message });
  }
};
// Get single donation
export const getDonationById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donations WHERE id=$1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Donation not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching donation", error: err.message });
  }
};

//update donation
export const updateDonations = async (req, res) => {
  const { name, email, phone, address, blood_group, units } = req.body;
  try {
    const result = await pool.query(
      "UPDATE donations SET name=$1,email=$2,phone=$3,address=$4,blood_group=$5,units=$6 WHERE id=$7 RETURNING id,name,email,phone,address,blood_group,units",
      [name, email, phone, address, blood_group, units, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Donation not found" });
    }
    res.json({
      msg: "Donation updated successfully",
      donations: result.rows[0],
    });
  } catch (err) {
    res.status(500).json({ msg: "Error updating user", error: err.message });
  }
};
// Delete donation
export const deleteDonation = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM donations WHERE id=$1 RETURNING id",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Donation not found" });
    }
    res.json({ msg: "Donation delete successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error deleting donation", error: err.message });
  }
};
