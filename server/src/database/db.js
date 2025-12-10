import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "9840",
  port: 5432,
  database: "blood_bank",
});

pool
  .connect()
  .then((client) => {
    console.log("Connected to Postgres");
    client.release();
  })
  .catch((err) => console.log("failed connect to postres", err));
export default pool;
