import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export const RoleBasePrivateRoute = ({ children, allowedRole }) => {
  const [cookies] = useCookies(["token", "role"]);
  // Fixed: "includes" not "include"
  const hasAccess = cookies.token && allowedRole.includes(cookies.role);
  return hasAccess ? children : <Navigate to="/home" replace />;
};

export const PublicRoute = ({ children }) => {
  const [cookies] = useCookies(["token"]); // Check for token
  return cookies.token ? <Navigate to="/" replace /> : children;
};
