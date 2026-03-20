import React, { useEffect, useState } from "react";
import axios from "axios";

function TicketHistory() {
  const [tickets, setTickets] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { setMessage("You must be logged in to view tickets"); setLoading(false); return; }

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/customer`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTickets(res.data);
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to fetch tickets");
      } finally { setLoading(false); }
    };

    fetchTickets();
  }, []);

  return (
    <div style={{ padding: "20px", minHeight: "80vh" }}>
      <h2 style={{ color: "#81A6C6", marginBottom: "20px" }}>Ticket History</h2>

      {loading ? (
        <p>Loading tickets...</p>
      ) : message ? (
        <p style={{ color: "red" }}>{message}</p>
      ) : tickets.length === 0 ? (
        <p>No tickets found.</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse", background: "#F3E3D0" }} border="1" cellPadding="10">
          <thead style={{ background: "#AACDDC" }}>
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