import pool from "../database/db.js";
import geocodeAddress from "../utils/geocode.js";

//export const createDonation = async (req, res) => {
//  try {
//    const { address, blood_group, units, donation_date } = req.body;
//    const user_id = req.user.id;
//    const user_role = req.user.role;

//    console.log("Creating donation for user:", { user_id, user_role });

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

//    // Insert donation (let SERIAL id auto-generate)
//    const result = await pool.query(
//      `INSERT INTO donations
//       (user_id, name, email, phone, address, blood_group, units, donation_date, latitude, longitude)
//       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
//       RETURNING *`,
//      [
//        user_id,
//        name,
//        email,
//        phone,
//        address,
//        blood_group,
//        donation_date,
//        parseInt(units),
//        coords?.lat || null,
//        coords?.lon || null,
//      ],
//    );

//    res.status(201).json({
//      success: true,
//      msg: "Donation created successfully",
//      donation: result.rows[0],
//    });
//  } catch (err) {
//    console.error("Error in createDonation:", err);
//    res.status(500).json({
//      msg: "Error creating donation",
//      error: err.message,
//    });
//  }
//};

//get all donations
//export const getAllDonations = async (req, res) => {
//  try {
//    const page = parseInt(req.query.page) || 1;
//    const limit = parseInt(req.query.limit) || parseInt(req.query.size) || 10;
//    const offset = (page - 1) * limit;
//    const countResult = await pool.query("SELECT COUNT(*) FROM donations");
//    const APositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='A+'",
//    );
//    const ANegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='A-'",
//    );
//    const BPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='B+'",
//    );
//    const BNegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='B-'",
//    );
//    const OPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='O+'",
//    );
//    const ONegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='O-'",
//    );
//    const ABPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='AB+'",
//    );
//    const ABNegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='AB-'",
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
//      `SELECT * FROM donations ORDER BY id LIMIT $1 OFFSET $2`,
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
//    res
//      .status(500)
//      .json({ msg: "Error fetching donations", error: err.message });
//  }
//};

//export const getAllDonations = async (req, res) => {
//  try {
//    const userRole = req.user.role;
//    const userId = req.user.id;
//    const page = parseInt(req.query.page) || 1;
//    const limit = parseInt(req.query.limit) || parseInt(req.query.size) || 10;
//    const offset = (page - 1) * limit;
//    const countResult = await pool.query("SELECT COUNT(*) FROM donations");
//    const APositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='A+'",
//    );
//    const ANegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='A-'",
//    );
//    const BPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='B+'",
//    );

//    const BNegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='B-'",
//    );

//    const OPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='O+'",
//    );
//    const ONegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='O-'",
//    );
//    const ABPositive = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='AB+'",
//    );
//    const ABNegative = await pool.query(
//      "SELECT COUNT(*) FROM donations WHERE blood_group='AB-'",
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
//    let query, params;

//    if (userRole === "admin") {
//      // Admin sees all donations
//      query = "SELECT * FROM donations ORDER BY created_at DESC";
//      params = [];
//    } else {
//      // User sees only their own donations
//      query =
//        "SELECT * FROM donations WHERE user_id = $1 ORDER BY created_at DESC";
//      params = [userId];
//    }

//    const result = await pool.query(query, params);
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
//      msg: "Error fetching donations",
//      error: err.message,
//    });
//  }
//};

export const createDonation = async (req, res) => {
  try {
    const { address, blood_group, units, donation_date } = req.body;
    const user_id = req.user.id;
    const user_role = req.user.role;

    console.log("Creating donation for user:", { user_id, user_role });

    // Validate required fields
    if (!address || !blood_group || !units || !donation_date) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Validate units is a positive integer
    const unitsNum = parseInt(units);
    if (isNaN(unitsNum) || unitsNum <= 0) {
      return res.status(400).json({ msg: "Units must be a positive number" });
    }

    // Validate and format the date
    let formattedDate;
    try {
      // Parse the date (could be string from frontend)
      const inputDate = new Date(donation_date);

      // Check if date is valid
      if (isNaN(inputDate.getTime())) {
        return res.status(400).json({ msg: "Invalid date format" });
      }

      // Format as YYYY-MM-DD for PostgreSQL DATE type
      formattedDate = inputDate.toISOString().split("T")[0];

      // Get today's date at midnight UTC for comparison
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayUTC = new Date(today.toISOString().split("T")[0]);

      // Check if donation date is in the future
      // Compare dates by creating new Date objects with only date part
      const donationDateOnly = new Date(formattedDate);

      if (donationDateOnly < todayUTC) {
        return res.status(400).json({
          msg: "Donation date cannot be in the future",
          details: {
            donation_date: formattedDate,
            today: todayUTC.toISOString().split("T")[0],
          },
        });
      }

      // Optional: Check if date is too far in the past (e.g., more than 2 years)
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
      twoYearsAgo.setHours(0, 0, 0, 0);

      if (donationDateOnly < twoYearsAgo) {
        return res.status(400).json({
          msg: "Donation date is too far in the past (maximum 2 years)",
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

    // Insert donation
    const result = await pool.query(
      `INSERT INTO donations 
       (user_id, name, email, phone, address, blood_group, units, donation_date, latitude, longitude) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        user_id,
        name,
        email,
        phone,
        address,
        blood_group,
        unitsNum,
        formattedDate,
        coords?.lat || null,
        coords?.lon || null,
      ],
    );

    res.status(201).json({
      success: true,
      msg: "Donation created successfully",
      donation: result.rows[0],
    });
  } catch (err) {
    console.error("Error in createDonation:", err);

    // Handle specific PostgreSQL errors
    if (err.code === "22007") {
      // invalid_datetime_format
      return res.status(400).json({
        msg: "Invalid date format. Please use YYYY-MM-DD format",
      });
    }

    if (err.code === "23514") {
      // check_violation for blood_group
      return res.status(400).json({
        msg: "Invalid blood group. Must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",
      });
    }

    res.status(500).json({
      msg: "Error creating donation",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
};
export const getAllDonations = async (req, res) => {
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

    if (userRole === "admin") {
      // Admin sees all donations with pagination
      dataQuery = `
        SELECT * FROM donations 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      dataParams = [limit, offset];

      // Total count for admin
      countQuery = "SELECT COUNT(*) FROM donations";
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
        FROM donations
      `;
      bloodGroupParams = [];
    } else {
      // Regular user sees only their own donations with pagination
      dataQuery = `
        SELECT * FROM donations 
        WHERE user_id = $1 
        ORDER BY created_at DESC 
        LIMIT $2 OFFSET $3
      `;
      dataParams = [userId, limit, offset];

      // Total count for regular user
      countQuery = "SELECT COUNT(*) FROM donations WHERE user_id = $1";
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
        FROM donations
        WHERE user_id = $1
      `;
      bloodGroupParams = [userId];
    }

    // Execute queries in parallel for better performance
    const [dataResult, countResult, bloodGroupResult] = await Promise.all([
      pool.query(dataQuery, dataParams),
      pool.query(countQuery, countParams),
      pool.query(bloodGroupQuery, bloodGroupParams),
    ]);

    const total = parseInt(countResult.rows[0].count);
    const totalPages = Math.ceil(total / limit);

    const bloodGroupData = bloodGroupResult.rows[0];

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
      },
      user: {
        role: userRole,
        id: userId,
      },
    });
  } catch (err) {
    console.error("Error in getAllDonations:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching donations",
      error: err.message,
    });
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
      [name, email, phone, address, blood_group, units, req.params.id],
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
      [req.params.id],
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

export const getDonationChartData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // Target user ID (admin can view specific user's data)
    const targetUserId = req.query.userId || userId;

    console.log('Fetching chart data for user ID:', targetUserId);

    // Query to get donation history grouped by date
    // Each unit is typically 0.5 liters (standard blood bag)
    const query = `
      SELECT 
        donation_date,
        SUM(units) as total_units,
        COUNT(*) as donation_count
      FROM donations 
      WHERE user_id = $1
      GROUP BY donation_date
      ORDER BY donation_date ASC
    `;

    const result = await pool.query(query, [targetUserId]);
    
    console.log('Query result:', result.rows);

    // Format the data for the chart
    // Convert units to liters (1 unit = 0.5 liters standard blood bag)
    const chartData = result.rows.map(row => ({
      date: new Date(row.donation_date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }),
      liters: (row.total_units * 0.5).toFixed(2), // Convert units to liters
      units: row.total_units,
      donation_count: row.donation_count,
      rawDate: row.donation_date
    }));

    console.log('Formatted chart data:', chartData);

    // Calculate totals for summary
    const totals = result.rows.reduce((acc, row) => {
      acc.totalUnits += parseInt(row.total_units) || 0;
      acc.totalDonations += parseInt(row.donation_count) || 0;
      return acc;
    }, { totalUnits: 0, totalDonations: 0 });

    res.json({
      success: true,
      data: chartData,
      summary: {
        totalUnits: totals.totalUnits,
        totalLiters: (totals.totalUnits * 0.5).toFixed(2),
        totalDonations: totals.totalDonations,
        conversionNote: "1 unit = 0.5 liters (standard blood bag)"
      },
      user: {
        role: userRole,
        id: userId
      }
    });
  } catch (err) {
    console.error("Error in getDonationChartData:", err);
    res.status(500).json({
      success: false,
      msg: "Error fetching donation chart data",
      error: err.message,
    });
  }
};
