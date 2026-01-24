import express from "express";

import {
  getAllRequest,
  getRequestById,
  approveRequest,
  rejectRequest,
  matchRequest,
  createRequest,
} from "../controllers/requestController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
router.post("/create", authMiddleware, createRequest);
router.get("/", authMiddleware, getAllRequest);
router.get("/:id", authMiddleware, getRequestById);
router.put("/:id/approve", authMiddleware, approveRequest);
router.put("/:id/reject", authMiddleware, rejectRequest);
router.get("/:id/match", authMiddleware, matchRequest);

export default router;
