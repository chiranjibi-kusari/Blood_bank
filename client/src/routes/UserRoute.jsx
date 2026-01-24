import React from "react";
import { Route } from "react-router-dom";
import { RoleBasePrivateRoute } from "./Guard";
import Layout from "../pages/Layout";
import UserDashboard from "../pages/user/UserDashboard";
import Myrequest from "../pages/user/request/Myrequest";
import MyResponse from "../pages/user/response/MyResponse";

const UserRoute = () => {
  <Route
    path="/user"
    element={
      <RoleBasePrivateRoute allowedRole={["ROLE_USER"]}>
        <Layout />
      </RoleBasePrivateRoute>
    }
  >
    <Route path="dashboard" element={<UserDashboard />} index={true} />
    <Route path="request" element={<Myrequest />} />
    <Route path="response" element={<MyResponse />} />
  </Route>;
};

export default UserRoute;
