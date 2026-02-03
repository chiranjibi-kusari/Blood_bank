import React, { useState } from "react";
import logo from "../assets/images/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";
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
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Login from "../pages/auth/Login";
const Navbar = () => {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const showSnackbar = (message, severity = "info") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

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
          <div className="mt-1">
            {/*<span className="text-2xl pl-10 font-bold text-gray-900">
              Login Your Account
            </span>*/}
          </div>
          <IconButton onClick={handleCloseDialog} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <Login onClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-center px-14 bg-red-600 z-50 fixed w-full top-0 left-0">
        <img src={logo} className="h-11 w-11 rounded-full m-2" alt="logo" />
        <div className="flex gap-6 cursor-pointer text-white font-bold text-xl list-none">
          <NavLink to={"/home"}>
            <li>Home</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
          <NavLink to={"/about"} className="">
            <li>About Us</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
          <NavLink to={"/service"}>
            <li>Services</li>
            <hr className=" border-2 border-black hidden" />
          </NavLink>
        </div>
        <button onClick={handleOpenDialog}>
          <h1 className="font-bold text-xl text-white">Login</h1>
          <hr className=" border-2 border-black hidden" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
