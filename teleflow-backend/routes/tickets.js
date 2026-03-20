import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { updateTicketStatus } from "../controllers/ticketController.js";

const router = express.Router();

// Agent updates ticket status and triggers email
router.put("/update/:id", verifyToken, updateTicketStatus);

export default router;