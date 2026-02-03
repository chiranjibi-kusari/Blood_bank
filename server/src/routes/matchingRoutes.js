import express from "express";
import { matchRequest } from "../controllers/requestController.js";

const router = express.Router();

router.get("/match/:id", matchRequest);

export default router;
