import express from "express";
import { verifyToken } from "../middlewares/auth.js";
import Ticket from "../models/Ticket.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

// --- CREATE TICKET ---
router.post("/create", verifyToken, async (req, res) => {
  try {
    const { ticketType, issue, address } = req.body;
    if (!ticketType || !issue || !address)
      return res.status(400).json({ message: "All fields are required" });

    const ticket = await Ticket.create({
      customer: req.user.id,
      ticketType,
      issue,
      address,
    });

    // Send email confirmation
    try {
      await sendEmail(
        req.user.email,
        `Ticket Raised: ${ticketType}`,
        `Hello ${req.user.name},\n\nYour ticket has been raised successfully.\n\nTicket Details:\nIssue: ${issue}\nAddress: ${address}\nStatus: ${ticket.status}\n\nThank you,\nTeleflow Support Team`
      );
    } catch (emailErr) {
      console.error("Email sending failed:", emailErr.message);
    }

    res.status(201).json({ message: "Ticket raised successfully", ticket });
  } catch (err) {
    console.error("Ticket creation failed:", err);
    res.status(500).json({ message: "Ticket creation failed", error: err.message });
  }
});

// --- CUSTOMER TICKET HISTORY ---
router.get("/customer", verifyToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ customer: req.user.id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    console.error("Failed to fetch tickets:", err);
    res.status(500).json({ message: "Failed to fetch ticket history", error: err.message });
  }
});

// --- AGENT DASHBOARD ---
router.get("/agent", verifyToken, async (req, res) => {
  try {
    let ticketType;
    if (req.user.role === "networkAgent") ticketType = "network";
    else if (req.user.role === "billingAgent") ticketType = "billing";
    else if (req.user.role === "simAgent") ticketType = "sim";
    else return res.status(403).json({ message: "Access denied" });

    const tickets = await Ticket.find({ ticketType })
      .populate("customer", "name email")
      .sort({ createdAt: -1 });

    res.json(tickets);
  } catch (err) {
    console.error("Failed to fetch tickets:", err);
    res.status(500).json({ message: "Failed to fetch tickets", error: err.message });
  }
});

// --- UPDATE STATUS ---
router.put("/update/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();
    res.json({ message: "Ticket status updated", ticket });
  } catch (err) {
    console.error("Failed to update status:", err);
    res.status(500).json({ message: "Failed to update ticket", error: err.message });
  }
});

export default router;