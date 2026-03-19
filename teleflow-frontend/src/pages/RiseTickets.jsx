import React, { useState } from "react";
import axios from "axios";

function RiseTickets() {
  const [form, setForm] = useState({ ticketType: "", issue: "", address: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login first.");
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/tickets`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage("Ticket raised successfully!");
      setForm({ ticketType: "", issue: "", address: "" });

    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Failed to raise ticket");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
      <div style={{ width: "420px", padding: "30px", background: "#F3E3D0", borderRadius: "10px" }}>
        <h2 style={{ textAlign: "center", color: "#81A6C6" }}>Raise Ticket</h2>
        <form onSubmit={handleSubmit}>
          <select name="ticketType" value={form.ticketType} onChange={handleChange} required>
            <option value="">Select Issue</option>
            <option value="network">Network Issue</option>
            <option value="billing">Billing Issue</option>
            <option value="sim">SIM Issue</option>
          </select>
          <textarea name="issue" placeholder="Describe issue" value={form.issue} onChange={handleChange} required />
          <input type="text" name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default RiseTickets;