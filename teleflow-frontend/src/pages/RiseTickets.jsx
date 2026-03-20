import React, { useState, useEffect } from "react";
import axios from "axios";

function RiseTickets() {
  const [form, setForm] = useState({ ticketType: "", issue: "", address: "" });
  const [message, setMessage] = useState("");
  const [ticketHistory, setTicketHistory] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch ticket history
  const fetchTicketHistory = async () => {
    if (!token) return;
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/customer`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTicketHistory(res.data);
    } catch (err) {
      console.error("Failed to fetch ticket history:", err);
      setMessage("Failed to fetch ticket history");
    }
  };

  useEffect(() => { fetchTicketHistory(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return setMessage("Please login first");
    if (!form.ticketType || !form.issue || !form.address) return setMessage("All fields are required");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/tickets/create`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(res.data.message);
      setForm({ ticketType: "", issue: "", address: "" });
      fetchTicketHistory();
    } catch (err) {
      console.error("Ticket creation failed:", err);
      setMessage(err.response?.data?.message || "Failed to raise ticket");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
      <div style={{ width: "500px", padding: "30px", background: "#F3E3D0", borderRadius: "10px" }}>
        <h2 style={{ textAlign: "center", color: "#81A6C6" }}>Raise Ticket</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <select name="ticketType" value={form.ticketType} onChange={handleChange} required style={{ padding: "10px" }}>
            <option value="">Select Issue</option>
            <option value="network">Network Issue</option>
            <option value="billing">Billing Issue</option>
            <option value="sim">SIM Issue</option>
          </select>

          <textarea name="issue" placeholder="Describe issue" value={form.issue} onChange={handleChange} required style={{ padding: "10px", height: "100px" }} />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required style={{ padding: "10px" }} />
          <button type="submit" style={{ background: "#81A6C6", color: "white", border: "none", padding: "10px", cursor: "pointer" }}>Submit</button>
        </form>

        {message && <p style={{ textAlign: "center", marginTop: "10px", color: "red" }}>{message}</p>}

        {ticketHistory.length > 0 && (
          <div style={{ marginTop: "30px" }}>
            <h3 style={{ color: "#81A6C6", textAlign: "center" }}>My Tickets</h3>
            <table border="1" width="100%" cellPadding="10">
              <thead>
                <tr>
                  <th>Issue</th>
                  <th>Address</th>
                  <th>Status</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {ticketHistory.map(ticket => (
                  <tr key={ticket._id}>
                    <td>{ticket.issue}</td>
                    <td>{ticket.address}</td>
                    <td>{ticket.status}</td>
                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiseTickets;