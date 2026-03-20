import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import { createTicket, updateTicketStatus } from "../controllers/ticketController.js";

const router = express.Router();

// This makes the URL: /api/tickets/create
router.post("/create", verifyToken, createTicket);

// This makes the URL: /api/tickets/update/:id
router.put("/update/:id", verifyToken, updateTicketStatus);

export default router;