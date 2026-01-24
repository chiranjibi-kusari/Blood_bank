import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

const roleDashBoard = {
  ROLE_ADMIN: "/admin/dashboard",
  ROLE_USER: "/user/dashboard",
};
const RoleBaseRedirect = () => {
  const [cookies] = useCookies("role", "token");
  if (cookies.role && cookies.token) {
    const route = roleDashBoard[cookies.role];
    if (route) {
      return <Navigate to={route} replace />;
    } else {
      return <Navigate to="/login" replace />;
    }
  }
  return <Navigate to="/login" replace />;
};

export default RoleBaseRedirect;
