import React, { useEffect, useState } from "react";
import axios from "axios";

function TicketHistory() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/tickets/customer", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTickets(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch tickets");
      }
    };
    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Ticket History</h2>
      {tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Issue</th>
              <th>Type</th>
              <th>Address</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket._id}>
                <td>{ticket.issue}</td>
                <td>{ticket.ticketType}</td>
                <td>{ticket.address}</td>
                <td>{ticket.status}</td>
                <td>{new Date(ticket.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TicketHistory;