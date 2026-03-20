import Ticket from "../models/Ticket.js";
import { sendEmail } from "../utils/sendEmail.js";

export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["networkAgent", "billingAgent", "simAgent"].includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const ticket = await Ticket.findById(req.params.id).populate("customer", "name email");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    ticket.status = status;
    await ticket.save();

    let subject = "";
    let message = "";

    if (status === "In Progress") {
      subject = "Ticket In Progress";
      message = `Hello ${ticket.customer.name},\n\nYour ticket is now IN PROGRESS.\n\nThank you.`;
    } else if (status === "Completed") {
      subject = "Ticket Completed";
      message = `Hello ${ticket.customer.name},\n\nYour ticket has been COMPLETED.\n\nThank you.`;
    }

    let emailSent = false;
    if (subject && ticket.customer?.email) {
      try {
        await sendEmail(ticket.customer.email, subject, message);
        emailSent = true;
      } catch (err) {
        console.log("❌ Email send failed:", err);
      }
    }

    res.json({ message: "Status updated", emailSent, ticket });

  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ message: "Failed to update status", error: err.message });
  }
};