import express from "express";
import {
  createLead,
  getLeads,
  updateLead,
  deleteLead,
} from "../controllers/leadController.js";
import { protect } from "../middleware/authMiddleware.js"; // Aapka JWT check middleware

const router = express.Router();

// Routes definition
router.route("/").get(protect, getLeads).post(protect, createLead);

router.route("/:id").put(protect, updateLead).delete(protect, deleteLead);

export default router;
