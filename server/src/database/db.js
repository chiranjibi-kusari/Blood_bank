//import pkg from "pg";
//import dotenv from "dotenv";

//dotenv.config();

//const { Pool } = pkg;

//const pool = new Pool({
//  user: "postgres",
//  host: "localhost",
//  password: "9840",
//  port: 5432,
//  database: "blood_bank",
//});

//pool
//  .connect()
//  .then((client) => {
//    console.log("Connected to PostgreSQL database");
//    client.release();
//  })
//  .catch((err) => console.log("failed connect to postres", err));
//export default pool;

import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  ssl: { rejectUnauthorized: false }, // required for Supabase
});

pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to Supabase PostgreSQL");
    client.release();
  })
  .catch((err) => console.error("❌ Failed to connect:", err));

export default pool;
