import Ticket from "../models/Ticket.js";

// Update ticket status
export const updateTicketStatus = async (req, res) => {
  try {
    const { status } = req.body;
    // .populate("customer") is the key to getting the email!
    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("customer", "name email"); 

    if (!updatedTicket) return res.status(404).json({ message: "Ticket not found" });

    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new ticket
export const createTicket = async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    const savedTicket = await newTicket.save();
    res.status(201).json(savedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};