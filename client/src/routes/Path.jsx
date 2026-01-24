import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/pages/Home.jsx";
import About from "../pages/pages/About.jsx";
import Service from "../pages/pages/Service.jsx";
import { PublicRoute } from "./Guard.jsx";
import Login from "../pages/auth/Login.jsx";
import RoleBaseRedirect from "./RoleBaseRedirect.jsx";
import AdminRoute from "./AdminRoute.jsx";
import UserRoute from "./UserRoute.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";

const Path = () => {
  return (
    <Routes>
      {/*public routes*/}
      <Route path="/home" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Service />} />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      {/*role redirect*/}
      <Route path="/" element={<RoleBaseRedirect />} />
      {AdminRoute}
      {UserRoute}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Path;
