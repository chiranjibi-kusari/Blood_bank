---- 1. user table (common for all roles)

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(15) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  role VARCHAR(20) DEFAULT 'user'  -- 'admin' or 'user'
);


--2. donations table

CREATE TABLE donations (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
  units INT NOT NULL,
  donation_date DATE DEFAULT CURRENT_DATE
);
INSERT INTO donations 
(user_id, name, email, phone, address, blood_group, units, donation_date) 
VALUES
(2, 'Sita Koirala', 'sita.koirala@example.com', '9800000002', 'Patan Hospital, Lalitpur', 'A+', 3, CURRENT_DATE);


ALTER TABLE requests ADD COLUMN latitude NUMERIC, ADD COLUMN longitude NUMERIC;
ALTER TABLE donations ADD COLUMN latitude NUMERIC, ADD COLUMN longitude NUMERIC;

--3. requests table
CREATE TABLE requests (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(15) NOT NULL,
  address VARCHAR(100) NOT NULL,
  blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),  -- include AB-
  urgency VARCHAR(10) CHECK (urgency IN ('low','medium','high')),
  units INT NOT NULL,
  status VARCHAR(20) CHECK (status IN ('pending','approved','fulfilled','rejected')),
  request_date DATE DEFAULT CURRENT_DATE
);
INSERT INTO requests (name, email, phone, address, blood_group, urgency, units, status)
VALUES
( 'Sita Koirala', 'sita@gmail.com', '9800000003', 'Pokhara, Nepal', 'AB+', 'high', 1, 'fulfilled'),
('Ram Shrestha', 'ram@gmail.com', '9800000002', 'Bhaktapur, Nepal', 'B+', 'low', 3, 'approved');

INSERT INTO requests 
(user_id, name, email, phone, address, blood_group, urgency, units, status) 
VALUES
(1, 'Hari Sharma', 'hari.sharma@example.com', '9800000001', 'Teaching Hospital, Kathmandu', 'A+', 'high', 2, 'pending');


SELECT * FROM requests

--4.inventory

  CREATE TABLE inventory (
    id SERIAL PRIMARY KEY,
    blood_group VARCHAR(5) CHECK (blood_group IN ('A+','A-','B+','B-','AB+','AB-','O+','O-')),
    units INT DEFAULT 0,
    expired_date DATE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



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