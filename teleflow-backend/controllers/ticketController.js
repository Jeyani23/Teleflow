const updateTicketStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.json(updatedTicket);

  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Server Error" });
  }
};