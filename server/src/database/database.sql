CREATE DATABASE blood_bank;

-- 1. user table (common for all roles)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) CHECK (role IN ('donor','recipient','admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. donor table
CREATE TABLE donors (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6),
  last_donation_date DATE
);


-- 3. Recipient table

CREATE TABLE recipients (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  required_blood_group VARCHAR(5) CHECK (required_blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  urgency VARCHAR(10) CHECK (urgency IN ('low','medium','high')),
  hospital_name VARCHAR(100),
  latitude DECIMAL(9,6),
  longitude DECIMAL(9,6)
  );

  -- 4. inventory table (blood stock)
  CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    blood_group VARCHAR(5) CHECK (required_blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
    unit_available INT DEFAULT 0,
    expired_date DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 5. donations table
  CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    donor_id INT REFERENCES donors(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL,
    units INT CHECK (units>0),
    donation_date DATE DEFAULT CURRENT_DATE,
    location_name VARCHAR(100)
  );

  -- 6. Requests table
  CREATE TABLE requests (
    id SERIAL PRIMARY KEY,
    recipient_id INT REFERENCES recipients(id) ON DELETE CASCADE,
    blood_group VARCHAR(5) NOT NULL,
    units INT CHECK (units>0),
    urgency VARCHAR(10) CHECK (urgency IN ('low','medium','high')),
    status VARCHAR(20) CHECK (status IN ('pending','approved','fulfilled','rejected')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );

  -- 7. Matches table (donor-recipient matching logs)
  CREATE TABLE matches (
    id SERIAL PRIMARY KEY,
    request_id INT REFERENCES requests(id) ON DELETE CASCADE,
    donor_id INT REFERENCES donors(id) ON DELETE CASCADE,
    distance_km DECIMAL(6,2),
    compatible BOOLEAN,
    notified BOOLEAN DEFAULT FALSE,
    outcome VARCHAR(20) CHECK (outcome IN ('success','fail'))
  );