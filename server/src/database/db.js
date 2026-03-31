import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

//const pool = new Pool({
//  user: "postgres",
//  host: "localhost",
//  password: "9840",
//  port: 5432,
//  database: "blood_bank",
//});

const pool = new Pool({
  user: process.env.DB_USER, // postgres
  host: process.env.DB_HOST, // db.abcxyz.supabase.co
  password: process.env.DB_PASSWORD, // YOUR_PASSWORD
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME, // postgres
  ssl: { rejectUnauthorized: false }, // important for cloud db
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL database");
    client.release();
  })
  .catch((err) => console.log("failed connect to postres", err));
export default pool;
