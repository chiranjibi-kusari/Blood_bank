---- 1. user table (common for all roles)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user'  -- 'admin' or 'user'
);

SELECT * FROM users

--2. donations table

CREATE TABLE donations (
  id SERIAL PRIMARY KEY, -- Using UUID as shown in ima
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units INT NOT NULL,
  donation_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  latitude NUMERIC,
  longitude NUMERIC
);
SELECT * FROM donations
CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units INT NOT NULL,
  urgency VARCHAR(10) CHECK (urgency IN ('low','medium','high')),
  request_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  latitude NUMERIC,
  longitude NUMERIC,
  hospital_name VARCHAR(200),
  patient_name VARCHAR(100),
  patient_age INT
);

SELECT * FROM requests


--5.match table

CREATE TABLE matching_logs (
  id SERIAL PRIMARY KEY,
  request_id INT REFERENCES requests(id) ON DELETE CASCADE,
  donor_id INT REFERENCES donations(id) ON DELETE CASCADE,
  distance_km DECIMAL(6,2),
  compatibility BOOLEAN,
  score DECIMAL(6,2),
  outcome VARCHAR(20) CHECK (outcome IN ('success','fail')),
  matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);