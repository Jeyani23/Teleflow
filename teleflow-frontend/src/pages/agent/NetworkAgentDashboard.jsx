import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentSidebar from "../../components/AgentSidebar";
import Footer from "../../components/Footer";
import emailjs from '@emailjs/browser';

function NetworkAgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which ticket is updating

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/tickets/agent`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTickets(res.data);
    } catch (err) {
      console.log("Error fetching tickets:", err);
    }
  };

  const updateStatus = async (id, status) => {
    setLoadingId(id); // Start loading state for this specific ticket
    try {
      const token = localStorage.getItem("token");

      // 1. Update the Database on Render
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tickets/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2. Extract updated ticket data (ensure your backend sends 'res.data.ticket')
      const updatedTicket = res.data.ticket; 

      if (updatedTicket && updatedTicket.customer?.email) {
        // 3. Prepare data for your EmailJS Template {{variables}}
        const templateParams = {
          customer_name: updatedTicket.customer?.name || "Valued Customer",
          customer_email: updatedTicket.customer?.email,
          status: status,
          issue: updatedTicket.issue,
          address: updatedTicket.address,
        };

        // 4. Send the email via EmailJS
        await emailjs.send(
          'service_zz0lqos',   // Replace with your Service ID
          'template_mmh4c6d',  // Replace with your Template ID
          templateParams,
          '2etDxzLMj08wLtkuU'    // Replace with your Public Key
        );

        alert(`✅ Status updated to ${status} and email sent!`);
      } else {
        alert(`✅ Status updated to ${status}, but no customer email found.`);
      }

      fetchTickets(); // Refresh your table data

    } catch (err) {
      console.error("Update Error:", err);
      alert("❌ Failed to update ticket status or send email.");
    } finally {
      setLoadingId(null); // Stop loading state
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AgentSidebar />

      <div style={{ marginLeft: "240px", padding: "30px", width: "100%", display: "flex", flexDirection: "column" }}>
        <h2 style={{ color: "#81A6C6" }}>Network Agent Dashboard</h2>

        {tickets.length === 0 ? (
          <p>No tickets found</p>
        ) : (
          <table border="1" width="100%" cellPadding="10" style={{ borderCollapse: "collapse", borderColor: "#ddd" }}>
            <thead>
              <tr style={{ background: "#AACDDC" }}>
                <th>Customer</th>
                <th>Issue</th>
                <th>Address</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket._id}>
                  <td>{ticket.customer?.name || "N/A"}</td>
                  <td>{ticket.issue}</td>
                  <td>{ticket.address}</td>
                  <td style={{ 
                    fontWeight: "bold", 
                    color: ticket.status === "Completed" ? "green" : ticket.status === "In Progress" ? "orange" : "red" 
                  }}>
                    {ticket.status}
                  </td>
                  <td>
                    <select
                      value={ticket.status}
                      disabled={loadingId === ticket._id} // Disable while processing
                      onChange={(e) => updateStatus(ticket._id, e.target.value)}
                      style={{ 
                        padding: "5px", 
                        borderRadius: "5px", 
                        cursor: loadingId === ticket._id ? "not-allowed" : "pointer",
                        backgroundColor: loadingId === ticket._id ? "#f0f0f0" : "white"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                    {loadingId === ticket._id && (
                      <span style={{ fontSize: "11px", display: "block", color: "#81A6C6", marginTop: "4px" }}>
                        Processing...
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div style={{ marginTop: "auto" }}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default NetworkAgentDashboard;