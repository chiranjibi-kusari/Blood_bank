import React from "react";
import { Route, Routes } from "react-router-dom";
import { RoleBasePrivateRoute } from "./Guard";
import Layout from "../pages/Layout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Donor from "../pages/admin/donor/Donor";
import Request from "../pages/admin/donor/Request";

const AdminRoute = () => {
  <Route
    path="/admin"
    element={
      <RoleBasePrivateRoute allowedRole={["ROLE_ADMIN"]}>
        <Layout />
      </RoleBasePrivateRoute>
    }
  >
    <Route path="dashboard" element={<AdminDashboard />} index={true} />
    <Route path="donor" element={<Donor />} />
    <Route path="request" element={<Request />} />
  </Route>;
};

export default AdminRoute;
