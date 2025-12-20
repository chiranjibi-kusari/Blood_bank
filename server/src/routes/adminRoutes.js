import express from "express";
import adminLogin from "../controllers/adminController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/login", adminLogin);

router.get(
  "/adminDashboard",
  authMiddleware,
  roleMiddleware(["admin"]),
  (req, res) => {
    res.json({ msg: "Welcome admin" });
  }
);

export default router;
