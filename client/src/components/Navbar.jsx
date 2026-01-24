import React from "react";
import logo from "../assets/images/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <div className="flex justify-between items-center px-14 bg-red-600 z-50 fixed w-full top-0 left-0">
        <img src={logo} className="h-11 w-11 rounded-full m-2" alt="logo" />
        <div className="flex gap-6 cursor-pointer text-white font-bold text-xl list-none">
          <NavLink to={"/home"}>
            <li>Home</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
          <NavLink to={"/about"} className="">
            <li>About Us</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
          <NavLink to={"/service"}>
            <li>Services</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
        </div>
        <button>
          <h1 className="font-bold text-xl text-white">Login</h1>
          <hr className=" border-2 border-black hidden" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
