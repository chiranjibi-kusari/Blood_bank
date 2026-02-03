import pool from "../database/db.js";
import geocodeAddress from "../utils/geocode.js";

//create

//export const createRequest = async (req, res) => {
//  try {
//    const {
//      address,
//      blood_group,
//      units,
//      urgency = "medium",
//      hospital_name,
//      patient_name,
//      patient_age,
//      request_date,
//    } = req.body;

//    const user_id = req.user.id;
//    const user_role = req.user.role;

//    console.log("Creating request for user:", { user_id, user_role });

//    // Get user details from database
//    const userResult = await pool.query(
//      "SELECT name, email, phone FROM users WHERE id = $1",
//      [user_id],
//    );

//    if (userResult.rows.length === 0) {
//      return res.status(404).json({ msg: "User not found" });
//    }

//    const { name, email, phone } = userResult.rows[0];

//    // Geocode address (with error handling)
//    let coords = { lat: null, lon: null };
//    try {
//      coords = await geocodeAddress(address);
//    } catch (geoError) {
//      console.warn("Geocoding failed:", geoError.message);
//    }

//    // Insert request (let SERIAL id auto-generate)
//    const result = await pool.query(
//      `INSERT INTO requests
//       (user_id, name, email, phone, address, blood_group, units, urgency,
//        request_date, latitude, longitude, hospital_name, patient_name, patient_age)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
//       RETURNING *`,
//      [
//        user_id,
//        name,
//        email,
//        phone,
//        address,
//        blood_group,
//        parseInt(units),
//        urgency,
//        coords?.lat || null,
//        coords?.lon || null,
//        hospital_name || null,
//        patient_name || null,
//        patient_age ? parseInt(patient_age) : null,
//      ],
//    );

//    res.status(201).json({
//      success: true,
//      msg: "Blood request created successfully",
//      request: result.rows[0],
//    });
//  } catch (err) {
//    console.error("Error in createRequest:", err);
//    res.status(500).json({
//      msg: "Error creating blood request",
//      error: err.message,
//    });
//  }
//};
export const createRequest = async (req, res) => {
  try {
    const {
      address,
      blood_group,
      units,
      urgency = "medium",
      hospital_name,
      patient_name,
      patient_age,
      request_date,
    } = req.body;

    const user_id = req.user.id;
    const user_role = req.user.role;

    console.log("Creating request for user:", { user_id, user_role });

    // Validate required fields
    if (!address || !blood_group || !units || !request_date) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Validate units is a positive integer
    const unitsNum = parseInt(units);
    if (isNaN(unitsNum) || unitsNum <= 0) {
      return res.status(400).json({ msg: "Units must be a positive number" });
    }

    // Validate and format the request date
    let formattedRequestDate;
    try {
      // Parse the date (could be string from frontend)
      const inputDate = new Date(request_date);

      // Check if date is valid
      if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ msg: "Invalid date format" });
      }

      // Format as YYYY-MM-DD for PostgreSQL DATE type
      formattedRequestDate = inputDate.toISOString().split("T")[0];

      // Get today's date at midnight UTC for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayUTC = new Date(today.toISOString().split("T")[0]);

      // Check if request date is not in the past
      // Compare dates by creating new Date objects with only date part
      const requestDateOnly = new Date(formattedRequestDate);

      if (requestDateOnly < todayUTC) {
        return res.status(400).json({
          msg: "Request date cannot be in the past",
          details: {
            request_date: formattedRequestDate,
            today: todayUTC.toISOString().split("T")[0],
          },
        });
      }
    } catch (dateError) {
      return res.status(400).json({
        msg: "Invalid date format. Please use a valid date",
        error: dateError.message,
      });
    }

    // Validate blood_group
    const validBloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
    if (!validBloodGroups.includes(blood_group)) {
      return res.status(400).json({
        msg: "Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",
      });
    }

    // Validate urgency
    const validUrgencies = ["low", "medium", "high", "critical"];
    if (!validUrgencies.includes(urgency)) {
      return res.status(400).json({
        msg: "Invalid urgency level. Must be one of: low, medium, high, critical",
      });
    }

    // Get user details from database
    const userResult = await pool.query(
      "SELECT name, email, phone FROM users WHERE id = $1",
      [user_id],
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ msg: "User not found" });
    }

    const { name, email, phone } = userResult.rows[0];

    // Geocode address (with error handling)
    let coords = { lat: null, lon: null };
    try {
      coords = await geocodeAddress(address);
    } catch (geoError) {
      console.warn("Geocoding failed:", geoError.message);
    }

    // Insert request
    const result = await pool.query(
      `INSERT INTO requests 
       (user_id, name, email, phone, address, blood_group, units, urgency, 
        request_date, latitude, longitude, hospital_name, patient_name, patient_age) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
       RETURNING *`,
      [
        user_id,
        name,
        email,
        phone,
        address,
        blood_group,
        unitsNum,
        urgency,
        formattedRequestDate,
        coords?.lat || null,
        coords?.lon || null,
        hospital_name || null,
        patient_name || null,
        patient_age ? parseInt(patient_age) : null,
      ],
    );

    res.status(201).json({
      success: true,
      msg: "Blood request created successfully",
      request: result.rows[0],
    });
  } catch (err) {
    console.error("Error in createRequest:", err);

    // Handle specific PostgreSQL errors
    if (err.code === "22007") {
      // invalid_datetime_format
      return res.status(400).json({
        msg: "Invalid date format. Please use YYYY-MM-DD format",
      });
    }

    if (err.code === "23514") {
      // check_violation for blood_group or urgency
      if (err.constraint && err.constraint.includes("blood_group")) {
        return res.status(400).json({
          msg: "Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",
        });
      }
      if (err.constraint && err.constraint.includes("urgency")) {
        return res.status(400).json({
          msg: "Invalid urgency level. Must be one of: low, medium, high, critical",
        });
      }
    }

    res.status(500).json({
      msg: "Error creating blood request",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};

//get all requests

//export const getAllRequest = async (req, res) => {
//  try {
//    const page = parseInt(req.query.page) || 1;
//    const limit = parseInt(req.query.limit) || parseInt(req.query.size) || 10;
//    const offset = (page - 1) * limit;
//    const countResult = await pool.query("SELECT COUNT(*) FROM requests");
//    const APositive = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='A+'",
//    );
//    const ANegative = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='A-'",
//    );
//    const BPositive = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='B+'",
//    );
//    const BNegative = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='B-'",
//    );
//    const OPositive = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='O+'",
//    );
//    const ONegative = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='O-'",
//    );
//    const ABPositive = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='AB+'",
//    );
//    const ABNegative = await pool.query(
//      "SELECT COUNT(*) FROM requests WHERE blood_group='AB-'",
//    );
//    const total = parseInt(countResult.rows[0].count);
//    const totalAPositive = parseInt(APositive.rows[0].count);
//    const totalANegative = parseInt(ANegative.rows[0].count);
//    const totalBPositive = parseInt(BPositive.rows[0].count);
//    const totalBNegative = parseInt(BNegative.rows[0].count);
//    const totalOPositive = parseInt(OPositive.rows[0].count);
//    const totalONegative = parseInt(ONegative.rows[0].count);
//    const totalABPositive = parseInt(ABPositive.rows[0].count);
//    const totalABNegative = parseInt(ABNegative.rows[0].count);

//    const result = await pool.query(
//      `SELECT * FROM requests LIMIT $1 OFFSET $2`,
//      [limit, offset],
//    );
//    const totalPages = Math.ceil(total / limit);

//    res.json({
//      success: true,
//      data: result.rows,
//      pagination: {
//        currentPage: page,
//        pageSize: limit,
//        totalItems: total,
//        totalPages: totalPages,
//        totalAPositive: totalAPositive,
//        totalANegative: totalANegative,
//        totalBPositive: totalBPositive,
//        totalBNegative: totalBNegative,
//        totalOPositive: totalOPositive,
//        totalONegative: totalONegative,
//        totalABPositive: totalABPositive,
//        totalABNegative: totalABNegative,
//      },
//    });
//  } catch (err) {
//    res.status(500).json({
//      msg: "Error fetching requests",
//      error: err.message,
//    });
//  }
//};
export const getAllRequest = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(req.query.size) || 10;
    const offset = (page - 1) * limit;

    let dataQuery, dataParams;
    let countQuery, countParams;
    let bloodGroupQuery, bloodGroupParams;
    let urgencyQuery, urgencyParams;

    if (userRole === "admin") {
      // Admin sees all requests with pagination
      dataQuery = `
        SELECT * FROM requests 
        ORDER BY 
          CASE WHEN urgency = 'high' THEN 1
               WHEN urgency = 'medium' THEN 2
               ELSE 3
          END,
          created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      dataParams = [limit, offset];

      // Total count for admin
      countQuery = "SELECT COUNT(*) FROM requests";
      countParams = [];

      // Blood group counts for admin
      bloodGroupQuery = `
        SELECT 
          COUNT(CASE WHEN blood_group = 'A+' THEN 1 END) as total_a_positive,
          COUNT(CASE WHEN blood_group = 'A-' THEN 1 END) as total_a_negative,
          COUNT(CASE WHEN blood_group = 'B+' THEN 1 END) as total_b_positive,
          COUNT(CASE WHEN blood_group = 'B-' THEN 1 END) as total_b_negative,
          COUNT(CASE WHEN blood_group = 'O+' THEN 1 END) as total_o_positive,
          COUNT(CASE WHEN blood_group = 'O-' THEN 1 END) as total_o_negative,
          COUNT(CASE WHEN blood_group = 'AB+' THEN 1 END) as total_ab_positive,
          COUNT(CASE WHEN blood_group = 'AB-' THEN 1 END) as total_ab_negative
        FROM requests
      `;
      bloodGroupParams = [];

      // Urgency counts for admin
      urgencyQuery = `
        SELECT 
          COUNT(CASE WHEN urgency = 'high' THEN 1 END) as total_high,
          COUNT(CASE WHEN urgency = 'medium' THEN 1 END) as total_medium,
          COUNT(CASE WHEN urgency = 'low' THEN 1 END) as total_low
        FROM requests
      `;
      urgencyParams = [];
    } else {
      // Regular user sees only their own requests with pagination
      dataQuery = `
        SELECT * FROM requests 
        WHERE user_id = $1 
        ORDER BY 
          CASE WHEN urgency = 'high' THEN 1
               WHEN urgency = 'medium' THEN 2
               ELSE 3
          END,
          created_at DESC 
        LIMIT $2 OFFSET $3
      `;
      dataParams = [userId, limit, offset];

      // Total count for regular user
      countQuery = "SELECT COUNT(*) FROM requests WHERE user_id = $1";
      countParams = [userId];

      // Blood group counts for regular user
      bloodGroupQuery = `
        SELECT 
          COUNT(CASE WHEN blood_group = 'A+' THEN 1 END) as total_a_positive,
          COUNT(CASE WHEN blood_group = 'A-' THEN 1 END) as total_a_negative,
          COUNT(CASE WHEN blood_group = 'B+' THEN 1 END) as total_b_positive,
          COUNT(CASE WHEN blood_group = 'B-' THEN 1 END) as total_b_negative,
          COUNT(CASE WHEN blood_group = 'O+' THEN 1 END) as total_o_positive,
          COUNT(CASE WHEN blood_group = 'O-' THEN 1 END) as total_o_negative,
          COUNT(CASE WHEN blood_group = 'AB+' THEN 1 END) as total_ab_positive,
          COUNT(CASE WHEN blood_group = 'AB-' THEN 1 END) as total_ab_negative
        FROM requests
        WHERE user_id = $1
      `;
      bloodGroupParams = [userId];

      // Urgency counts for regular user
      urgencyQuery = `
        SELECT 
          COUNT(CASE WHEN urgency = 'high' THEN 1 END) as total_high,
          COUNT(CASE WHEN urgency = 'medium' THEN 1 END) as total_medium,
          COUNT(CASE WHEN urgency = 'low' THEN 1 END) as total_low
        FROM requests
        WHERE user_id = $1
      `;
      urgencyParams = [userId];
    }

    // Execute queries in parallel for better performance
    const [dataResult, countResult, bloodGroupResult, urgencyResult] =
      await Promise.all([
        pool.query(dataQuery, dataParams),
        pool.query(countQuery, countParams),
        pool.query(bloodGroupQuery, bloodGroupParams),
        pool.query(urgencyQuery, urgencyParams),
      ]);

    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    const bloodGroupData = bloodGroupResult.rows[0];
    const urgencyData = urgencyResult.rows[0];

    res.json({
      success: true,
      data: dataResult.rows,
      pagination: {
        currentPage: page,
        pageSize: limit,
        totalItems: total,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        totalAPositive: parseInt(bloodGroupData.total_a_positive) || 0,
        totalANegative: parseInt(bloodGroupData.total_a_negative) || 0,
        totalBPositive: parseInt(bloodGroupData.total_b_positive) || 0,
        totalBNegative: parseInt(bloodGroupData.total_b_negative) || 0,
        totalOPositive: parseInt(bloodGroupData.total_o_positive) || 0,
        totalONegative: parseInt(bloodGroupData.total_o_negative) || 0,
        totalABPositive: parseInt(bloodGroupData.total_ab_positive) || 0,
        totalABNegative: parseInt(bloodGroupData.total_ab_negative) || 0,
        totalHighUrgency: parseInt(urgencyData.total_high) || 0,
        totalMediumUrgency: parseInt(urgencyData.total_medium) || 0,
        totalLowUrgency: parseInt(urgencyData.total_low) || 0,
      },
      user: {
        role: userRole,
        id: userId,
      },
    });
  } catch (err) {
    console.error("Error in getAllRequest:", err);
    res.status(500).json({
      success: false,
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
