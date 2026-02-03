import React, { useState } from "react";
import Card from "../../components/reusable/Card";
import { useGetDonation } from "../../components/hooks/useDonation";
import { FaUsers, FaDonate, FaHandHoldingHeart } from "react-icons/fa";
import { useGetUserList } from "../../components/hooks/useUser";
import { useGetRequest } from "../../components/hooks/useRequest";
import CreateDonation from "./response/CreateDonation";
import CreateRequest from "./request/CreateRequest";
import {
  Close as CloseIcon,
  Refresh,
  Error as ErrorIcon,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Alert,
  Snackbar,
} from "@mui/material";
import BloodTypeBarChart from "../../components/graph/BloodTypeBarChart";
import RequestBloodTypePieChart from "../../components/graph/RequestBloodTypePieChart";
import LineGraph from "../../components/graph/LineGraph";

const UserDashboard = () => {
  // Separate states for Request and Donation dialogs
  const [openRequestDialog, setOpenRequestDialog] = useState(false);
  const [openDonationDialog, setOpenDonationDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Request Dialog Handlers
  const handleOpenRequestDialog = () => {
    setOpenRequestDialog(true);
  };

  const handleCloseRequestDialog = () => {
    setOpenRequestDialog(false);
  };

  // Donation Dialog Handlers
  const handleOpenDonationDialog = () => {
    setOpenDonationDialog(true);
  };

  const handleCloseDonationDialog = () => {
    setOpenDonationDialog(false);
  };

  const {
    data: donationData,
    isLoading: donationLoading,
    error: donationError,
  } = useGetDonation();

  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useGetUserList();

  const {
    data: requestData,
    isLoading: requestLoading,
    error: requestError,
  } = useGetRequest();

  // Handle loading states
  if (donationLoading || userLoading || requestLoading) {
    return (
      <div className="px-10 flex items-center justify-center h-64">
        <div className="text-xl">Loading dashboard data...</div>
      </div>
    );
  }

  // Handle errors
  if (donationError || userError || requestError) {
    return (
      <div className="px-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error loading dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  // Use optional chaining and provide fallback values
  const totalDonations = donationData?.pagination?.totalItems || 0;
  const totalUsers = userData?.pagination?.totalItems || 0;
  const totalRequests = requestData?.pagination?.totalItems || 0;

  return (
    <div className="px-10">
      {/* Single Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Request Dialog */}
      <Dialog
        open={openRequestDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseRequestDialog();
          }
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            bgcolor: "#1e40af",
            color: "white",
          }}
        >
          <span className="text-lg font-semibold">Create Blood Request</span>
          <IconButton
            onClick={handleCloseRequestDialog}
            size="small"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 4 }}>
          <CreateRequest
            onClose={handleCloseRequestDialog}
            onSuccess={() => {
              setSnackbar({
                open: true,
                message: "Blood request created successfully!",
                severity: "success",
              });
              handleCloseRequestDialog();
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Donation Dialog */}
      <Dialog
        open={openDonationDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseDonationDialog();
          }
        }}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
            bgcolor: "#dc2626",
            color: "white",
          }}
        >
          <span className="text-lg font-semibold">Create Blood Donation</span>
          <IconButton
            onClick={handleCloseDonationDialog}
            size="small"
            sx={{ color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2, pb: 4 }}>
          <CreateDonation
            onClose={handleCloseDonationDialog}
            onSuccess={() => {
              setSnackbar({
                open: true,
                message: "Donation created successfully!",
                severity: "success",
              });
              handleCloseDonationDialog();
            }}
          />
        </DialogContent>
      </Dialog>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold pb-1 text-gray-800">
            User Dashboard
          </h1>
          <p className="pb-6 text-gray-600">
            Manage your blood donations and requests
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleOpenRequestDialog}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <FaHandHoldingHeart className="text-lg" />
            Request Blood
          </button>
          <button
            onClick={handleOpenDonationDialog}
            className="bg-red-600 hover:bg-red-700 px-6 py-3 text-white rounded-lg font-medium flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
          >
            <FaDonate className="text-lg" />
            Donate Blood
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card
          name="Total my Donations"
          icon={<FaDonate className="text-2xl text-red-600" />}
          total={totalDonations}
          bg="bg-gradient-to-r from-red-500 to-red-600"
          textColor="text-white"
        />
        <Card
          name="Total my Requests"
          icon={<FaHandHoldingHeart className="text-2xl text-blue-600" />}
          total={totalRequests}
          bg="bg-gradient-to-r from-blue-500 to-blue-600"
          textColor="text-white"
        />
      </div>

      <LineGraph />

      {/* Request Blood Types */}
      <div className="mb-8 mt-10">
        <div className="flex justify-between flex-col items-center mb-4">
          <h1 className="text-xl font-semibold text-gray-800">
            My Request Blood Types
          </h1>
          <span className="text-sm text-gray-500">
            Summary of your blood requests by type
          </span>
        </div>
        <RequestBloodTypePieChart
          requestData={requestData}
          title="Blood Type Request"
          name={"Requests"}
        />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleOpenRequestDialog}
            className="bg-white hover:bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md"
          >
            <FaHandHoldingHeart className="text-3xl text-blue-600 mb-2" />
            <span className="font-medium text-gray-800">New Blood Request</span>
            <span className="text-sm text-gray-600 mt-1">
              Request blood urgently
            </span>
          </button>
          <button
            onClick={handleOpenDonationDialog}
            className="bg-white hover:bg-red-50 border border-red-200 rounded-lg p-4 flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md"
          >
            <FaDonate className="text-3xl text-red-600 mb-2" />
            <span className="font-medium text-gray-800">New Donation</span>
            <span className="text-sm text-gray-600 mt-1">
              Schedule blood donation
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
