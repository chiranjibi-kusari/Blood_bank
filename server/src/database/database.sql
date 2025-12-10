CREATE DATABASE blood_bank;

--user table (common for all roles)
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) CHECK (role IN ('donor','recipient','admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);