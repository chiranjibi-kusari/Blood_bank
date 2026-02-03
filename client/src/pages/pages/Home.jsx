import React, { useState } from "react";
import banner from "../../assets/images/banner.png";
import blood2 from "../../assets/images/blood2.jpg";
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

import Login from "../auth/Login.jsx";
const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="">
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

      <Dialog
        open={openDialog}
        onClose={(event, reason) => {
          if (reason !== "backdropClick" && reason !== "escapeKeyDown") {
            handleCloseDialog();
          }
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <Login onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      <div className="bg-white pb-10">
        <img src={banner} className="py-14 h-screen w-full" alt="banner" />
        <div className="px-10 text-white">
          <div className="flex justify-center gap-10">
            <div className="text-xl font-semibold flex gap-8 flex-col ">
              <p className="bg-red-600 pl-16 py-2">
                “The blood you donate gives someone another chance at life.”
              </p>
              <p className="bg-red-600 pl-16 py-1.5">
                “One pint, one person, one chance: your donation is a lifesaving
                step.”
              </p>
              <p className="bg-red-600 pl-16 py-1.5">
                “Give a little today so someone can breathe, move, and live
                tomorrow.”
              </p>
              <p className="bg-red-600 pl-16 py-1.5">
                “Just a few minutes of your time can mean everything to someone
                in need—a second chance, a moment of hope, even a life saved.”
              </p>
            </div>
            <img src={blood2} alt="blood2" className="w-96 h-80 rounded-md" />
          </div>
          <div className="pt-10 text-center">
            {/*<p className="mt-4 text-lg">
              Saving lives through efficient blood donation and request.
            </p>*/}
            <h1 className="text-2xl text-black font-bold pb-4">
              Register today and be part of a life-saving network
            </h1>

            <button
              onClick={handleOpenDialog}
              className="bg-red-600 px-4 py-2 text-xl font-bold rounded-md hover:text-black"
            >
              <h1 className="font-bold text-xl text-white">Registe Now</h1>
              <hr className=" border-2 border-black hidden" />
            </button>
          </div>
        </div>
      </div>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-[600px] max-h-[90vh] overflow-y-auto">
            <Login />
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 text-red-600 font-bold hover:underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
