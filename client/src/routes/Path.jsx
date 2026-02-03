import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/pages/Home.jsx";
import About from "../pages/pages/About.jsx";
import Service from "../pages/pages/Service.jsx";
import { PublicRoute, RoleBasePrivateRoute } from "./Guard.jsx";
import Login from "../pages/auth/Login.jsx";
import RoleBaseRedirect from "./RoleBaseRedirect.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";
import PublicLayout from "../layouts/PublicLayout.jsx";
import Layout from "../pages/Layout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Donor from "../pages/admin/donor/Donor";
import Request from "../pages/admin/request/Request.jsx";
import UserDashboard from "../pages/user/UserDashboard";
import Myrequest from "../pages/user/request/Myrequest";
import MyResponse from "../pages/user/response/MyResponse";
import User from "../pages/admin/user/User.jsx";
import MatchingResults from "../pages/user/MatchingResults.jsx";

const Path = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<RoleBaseRedirect />} />

      <Route
        path="/home"
        element={
          <PublicLayout>
            <Home />
          </PublicLayout>
        }
      />
      <Route
        path="/about"
        element={
          <PublicLayout>
            <About />
          </PublicLayout>
        }
      />
      <Route
        path="/service"
        element={
          <PublicLayout>
            <Service />
          </PublicLayout>
        }
      />
      {/*<Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />*/}

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <RoleBasePrivateRoute allowedRole={["admin", "admin"]}>
            <Layout />
          </RoleBasePrivateRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} index />
        <Route path="donor" element={<Donor />} />
        <Route path="request" element={<Request />} />
        <Route path="user" element={<User />} />
        {/*<Route path="approve-donations" element={<ApproveDonor />} />
        <Route path="approve-requests" element={<ApproveRequest />} />*/}
      </Route>

      {/* User Routes */}
      <Route
        path="/user"
        element={
          <RoleBasePrivateRoute allowedRole={["user", "user"]}>
            <Layout />
          </RoleBasePrivateRoute>
        }
      >
        <Route path="dashboard" element={<UserDashboard />} index />
        <Route path="my-donation" element={<MyResponse />} />
        <Route path="my-request" element={<Myrequest />} />
        <Route path="matching" element={<MatchingResults />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default Path;
