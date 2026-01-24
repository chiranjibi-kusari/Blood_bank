import express from "express";
import {
  getAllDonations,
  getDonationById,
  createDonation,
  updateDonations,
  deleteDonation,
} from "../controllers/donationsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createDonation);
router.get("/", authMiddleware, getAllDonations);
router.get("/:id", authMiddleware, getDonationById);
//router.post("/", authMiddleware, createDonation);   // ✅ RESTful create
router.put("/:id", authMiddleware, updateDonations);
router.delete("/:id", authMiddleware, deleteDonation);

export default router;
