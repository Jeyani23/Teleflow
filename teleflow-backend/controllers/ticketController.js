import Ticket from "../models/Ticket.js";

// --- CREATE TICKET ---
export const createTicket = async (req, res) => {
  try {
    // req.body now contains { ticketType, issue, address, customer }
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    
    res.status(201).json({
      success: true,
      message: "Ticket raised successfully!",
      ticket: savedTicket
    });
  } catch (error) {
    console.error("Create Ticket Error:", error.message);
    res.status(400).json({ message: error.message });
  }
};

// --- UPDATE TICKET STATUS ---
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    // .populate("customer") pulls the User's name and email from the Users collection
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("customer", "name email"); 

    if (!updatedTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};