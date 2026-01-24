import express from "express";
import {
  getAllInventory,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllInventory);
router.get("/:id", authMiddleware, getInventoryById);
router.put("/:id", authMiddleware, updateInventory);
router.delete("/:id", authMiddleware, deleteInventory);
export default router;
