import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const roleDashBoard = {
  admin: "/admin/dashboard",
  user: "/user/dashboard",
};

const RoleBaseRedirect = () => {
  const [cookies] = useCookies(["role", "token"]);
  if (cookies.role && cookies.token) {
    const route = roleDashBoard[cookies.role];
    if (route) {
      return <Navigate to={route} replace />;
    } else {
      return <Navigate to="/home" replace />;
    }
  }
  return <Navigate to="/home" replace />;
};

export default RoleBaseRedirect;
