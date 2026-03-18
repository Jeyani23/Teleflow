import express from "express";
import Ticket from "../models/Ticket.js";
import { verifyToken } from "../middlewares/auth.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();


// ✅ CREATE TICKET
router.post("/", verifyToken, async (req, res) => {
  try {
    const { ticketType, issue, address } = req.body;

    if (!ticketType || !issue || !address) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const ticket = await Ticket.create({
      customer: req.user.id,
      ticketType,
      issue,
      address
    });

    res.status(201).json({
      message: "Ticket raised successfully",
      ticket
    });

  } catch (err) {
    res.status(500).json({
      message: "Ticket creation failed",
      error: err.message
    });
  }
});


// ✅ CUSTOMER TICKET HISTORY
router.get("/customer", verifyToken, async (req, res) => {
  try {
    const tickets = await Ticket.find({ customer: req.user.id })
      .sort({ createdAt: -1 });

    res.json(tickets);

  } catch (err) {
    res.status(500).json({
      message: "Tickets cannot be fetched",
      error: err.message
    });
  }
});


// ✅ AGENT DASHBOARD (AUTO FILTER)
router.get("/agent", verifyToken, async (req, res) => {
  try {

    let ticketType;

    if (req.user.role === "networkAgent") ticketType = "network";
    else if (req.user.role === "billingAgent") ticketType = "billing";
    else if (req.user.role === "simAgent") ticketType = "sim";
    else return res.status(403).json({ message: "Access denied" });

    const tickets = await Ticket.find({ ticketType })
      .populate("customer", "name email phone") // ✅ FIXED
      .sort({ createdAt: -1 });

    res.json(tickets);

  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch tickets",
      error: err.message
    });
  }
});



router.put("/update/:id", verifyToken, async (req, res) => {
  try {

    console.log("🔥 UPDATE API CALLED");

    if (!["networkAgent", "billingAgent", "simAgent"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const { status } = req.body;

    const ticket = await Ticket.findById(req.params.id)
      .populate("customer", "name email");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // ✅ Update status
    ticket.status = status;
    await ticket.save();

    let subject = "";
    let message = "";

    if (status === "In Progress") {
      subject = "Ticket In Progress";
      message = `Hello ${ticket.customer.name},

Your ticket is now IN PROGRESS.

Thank you.`;
    } 
    else if (status === "Completed") {
      subject = "Ticket Completed";
      message = `Hello ${ticket.customer.name},

Your ticket has been COMPLETED.

Thank you.`;
    }

    // 📧 SEND EMAIL
    if (subject && ticket.customer?.email) {
      console.log("📧 Sending email to:", ticket.customer.email);
      await sendEmail(ticket.customer.email, subject, message);
    } else {
      console.log("❌ Email not sent");
    }

    res.json({
      message: "Status updated & email sent",
      ticket
    });

  } catch (err) {
    console.log("❌ Update error:", err);
    res.status(500).json({
      message: "Failed to update status",
      error: err.message
    });
  }
});

export default router;