// src/components/Footer.jsx
import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-red-600 text-white py-6">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left side: Logo / Title */}
        <h1 className="text-2xl font-bold">RedLife Blood Bank</h1>

        {/* Center: Navigation links */}
        <div className="flex gap-6 mt-4 md:mt-0">
          <NavLink to="/" className="hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline">
            About Us
          </NavLink>
          <NavLink to="/service" className="hover:underline">
            Services
          </NavLink>
          <NavLink to="/login" className="hover:underline">
            Login
          </NavLink>
        </div>

        {/* Right side: Copyright */}
        <p className="mt-4 md:mt-0 text-sm">
          © {new Date().getFullYear()} Blood Bank Management System. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
