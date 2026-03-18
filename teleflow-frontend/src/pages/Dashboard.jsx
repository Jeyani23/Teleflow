import React, { useEffect, useState } from "react";
import { getTickets } from "../api/ticketApi";

function Dashboard() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    const data = await getTickets();
    setTickets(data);
  };

  return (
    <div>
      <h2>All Tickets</h2>

      {tickets.map((ticket) => (
        <div key={ticket._id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
          <span>Status: {ticket.status}</span>
        </div>
      ))}

    </div>
  );
}

export default Dashboard;