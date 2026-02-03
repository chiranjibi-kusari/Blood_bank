import React from "react";
import { Route } from "react-router-dom";
import { RoleBasePrivateRoute } from "./Guard";
import Layout from "../pages/Layout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Myrequest from "../pages/user/request/Myrequest";
import MyResponse from "../pages/user/response/MyResponse";

const AdminRoute = () => {
  return (
    // ADDED RETURN STATEMENT HERE
    <Route
      path="/user"
      element={
        <RoleBasePrivateRoute allowedRole={["user", "user"]}>
          {" "}
          {/* Include both */}
          <Layout />
        </RoleBasePrivateRoute>
      }
    >
      <Route path="dashboard" element={<AdminDashboard />} index={true} />
      <Route path="my-donation" element={<MyResponse />} />
      <Route path="my-request" element={<Myrequest />} />
    </Route>
  );
};

export default AdminRoute;
