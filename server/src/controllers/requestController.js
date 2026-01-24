import pool from "../database/db.js";
import geocodeAddress from "../utils/geocode.js";
import matchDonorsForRequest from "../services/metchingService.js";

//create
export const createRequest = async (req, res) => {
  try {
    const {
      user_id,
      name,
      email,
      phone,
      address,
      blood_group,
      urgency,
      units,
    } = req.body;
    const coords = await geocodeAddress(address);

    const result = await pool.query(
      `INSERT INTO requests 
       (user_id, name, email, phone, address, blood_group, urgency, units, status, latitude, longitude) 
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'pending',$9,$10) RETURNING *`,
      [
        user_id,
        name,
        email,
        phone,
        address,
        blood_group,
        urgency,
        units,
        coords?.lat,
        coords?.lon,
      ],
    );

    res.json({ msg: "Request created successfully", request: result.rows[0] });
  } catch (err) {
    res.status(500).json({ msg: "Error creating request", error: err.message });
  }
};

//get all requests

export const getAllRequest = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests ORDER BY id");
    res.json({
      msg: "list of requests",
      data: result.rows,
    });
  } catch (err) {
    res.status(500).json({
      msg: "Error fetching requests",
      error: err.message,
    });
  }
};

//get single request
export const getRequestById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests WHERE id=$1", [
      req.params.id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Request not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching request", error: err.message });
  }
};

//approve request
export const approveRequest = async (req, res) => {
  try {
    const request = await pool.query("SELECT * FROM requests WHERE id=$1", [
      req.params.id,
    ]);
    if (request.rows.length === 0) {
      return res.status(404).json({ msg: "Request not found" });
    }

    const { blood_group, units } = request.rows[0];

    // ✅ Fixed SQL syntax
    await pool.query(
      `UPDATE inventory 
       SET units = GREATEST(units - $1, 0) 
       WHERE blood_group = $2`,
      [units, blood_group],
    );

    await pool.query("UPDATE requests SET status='approved' WHERE id=$1", [
      req.params.id,
    ]);

    res.json({ msg: "Request approved and inventory updated" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error approving request", error: err.message });
  }
};

//rejcet request
export const rejectRequest = async (req, res) => {
  try {
    const result = await pool.query(
      "UPDATE requests SET status='rejected' WHERE id=$1 RETURNING id",
      [req.params.id],
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "Request Not Found" });
    }
    res.json({ msg: "Request rejected successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error rejection request", error: err.message });
  }
};

//match
export const matchRequest = async (req, res) => {
  try {
    const matches = await matchDonorsForRequest(req.params.id, 10);
    res.json({ request_id: req.params.id, matches });
  } catch (err) {
    console.error("Match donors error:", err); // full traceback in logs
    res.status(500).json({
      msg: "Error matching donors",
      error: err.message, // ✅ include actual error
    });
  }
};
