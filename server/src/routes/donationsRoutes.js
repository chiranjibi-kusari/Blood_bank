import express from "express";
import {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonations,
  deleteDonation,
  getDonationChartData,
} from "../controllers/donationsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "user"]),
  createDonation,
);
// In your routes file
router.get("/chart-data", authMiddleware, getDonationChartData);
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "user"]),
  getAllDonations,
);
router.get("/:id", authMiddleware, getDonationById);
//router.post("/", authMiddleware, createDonation);   // ✅ RESTful create
router.put("/:id", authMiddleware, updateDonations);
router.delete("/:id", authMiddleware, deleteDonation);

export default router;
