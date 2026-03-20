import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentSidebar from "../../components/AgentSidebar";
import Footer from "../../components/Footer";
import Profile from "./Profile";

function SimAgentDashboard() {
  const [tickets, setTickets] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user") || "{}"));

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/tickets/agent`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.log("Error fetching tickets:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${process.env.REACT_APP_API_URL}/api/tickets/update/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets();
      alert(`Ticket status updated to ${status}`);
    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <AgentSidebar showProfile={showProfile} setShowProfile={setShowProfile} />

      <div style={{ marginLeft: "240px", padding: "30px", width: "100%", display: "flex", flexDirection: "column" }}>
        {showProfile ? (
          <Profile user={user} setUser={setUser} />
        ) : (
          <>
            <h2 style={{ color: "#81A6C6" }}>SIM Agent Dashboard</h2>

            {tickets.length === 0 ? (
              <p>No tickets found</p>
            ) : (
              <table border="1" width="100%" cellPadding="10">
                <thead>
                  <tr>
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
                      <td>{ticket.customer?.name || ticket.customer?.email || "N/A"}</td>
                      <td>{ticket.issue}</td>
                      <td>{ticket.address}</td>
                      <td>{ticket.status}</td>
                      <td>
                        <select value={ticket.status} onChange={(e) => updateStatus(ticket._id, e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div style={{ marginTop: "auto" }}>
              <Footer />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SimAgentDashboard;