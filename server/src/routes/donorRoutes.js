import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getDonors,
  getDonorsByID,
  updateDonor,
  deleteDonor,
} from "../controllers/donorController.js";
const router = express.Router();
router.get("/", authMiddleware, getDonors);
router.get("/:id", authMiddleware, getDonorsByID);
router.put("/:id", authMiddleware, updateDonor);
router.delete("/:id", authMiddleware, deleteDonor);


export default router;