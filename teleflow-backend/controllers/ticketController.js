import Ticket from "../models/Ticket.js";

export const updateTicketStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // 1. Update ticket and populate customer details
    // We NEED 'customer' populated so the frontend gets the email address
    const ticket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate("customer");

    if (!ticket) {
      return res.status(404).json({ 
        success: false, 
        message: "Ticket not found" 
      });
    }

    // 2. Return the updated ticket to the frontend
    // The frontend will take ticket.customer.email and send the EmailJS mail
    res.status(200).json({
      success: true,
      message: "Status updated in database",
      ticket: ticket // Sending the whole object back is key!
    });

  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};