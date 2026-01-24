import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";
export const RoleBasePrivateRoute = ({ children, allowedRole }) => {
  const [cookies] = useCookies(["token", "role"]);
  const hasAccess = cookies.token && allowedRole.include(cookies.role);
  return hasAccess ? children : <Navigate to="/login" replace />;
};
export const PublicRoute = ({ children }) => {
  const [cookies] = useCookies(["role"]);
  return cookies.token ? <Navigate to="/" replace /> : children;
};
