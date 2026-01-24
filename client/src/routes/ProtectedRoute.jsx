import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const ProtectedRoute = ({ children, allowedRole }) => {
  const [cookies] = useCookies[("token", "role")];
  const token = cookies.token;
  const role = cookies.role;

  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && !allowedRole.include(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default ProtectedRoute;
