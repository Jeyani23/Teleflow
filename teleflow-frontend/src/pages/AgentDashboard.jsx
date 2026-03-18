import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Helper function to calculate ticket stats
const calculateTicketStats = (tickets) => {
  const total = tickets.length;
  const pending = tickets.filter(t => t.status === "Waiting" || t.status === "In Progress").length;
  const accomplished = tickets.filter(t => t.status === "Closed").length;
  return { total, pending, accomplished };
};

const AgentDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch tickets assigned to this agent type
  const fetchTickets = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tickets/agent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTickets(res.data);
    } catch (err) {
      console.error("Error fetching tickets:", err.response?.data || err.message);
    }
  };

  // Update ticket status (Waiting → In Progress → Closed)
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tickets/${id}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTickets(); // Refresh after update
    } catch (err) {
      console.error("Error updating ticket:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTickets();
    const interval = setInterval(fetchTickets, 5000); // live updates
    return () => clearInterval(interval);
  }, []);

  const { total, pending, accomplished } = calculateTicketStats(tickets);

  const chartData = {
    labels: ["Pending", "Accomplished"],
    datasets: [
      {
        data: [pending, accomplished],
        backgroundColor: ["#AACDDC", "#81A6C6"],
        hoverBackgroundColor: ["#AACDDC", "#81A6C6"],
      },
    ],
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#F3E3D0", minHeight: "100vh" }}>
      <h2 style={{ color: "#81A6C6" }}>Agent Dashboard</h2>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
        <div style={{ backgroundColor: "#AACDDC", padding: "1rem", borderRadius: "8px", flex: 1 }}>
          <h3>Total Tickets</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{total}</p>
        </div>
        <div style={{ backgroundColor: "#D2C4B4", padding: "1rem", borderRadius: "8px", flex: 1 }}>
          <h3>Pending Tickets</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{pending}</p>
        </div>
        <div style={{ backgroundColor: "#81A6C6", padding: "1rem", borderRadius: "8px", flex: 1, color: "#fff" }}>
          <h3>Accomplished</h3>
          <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{accomplished}</p>
        </div>
      </div>

      {/* Pie Chart */}
      <div style={{ maxWidth: "400px", margin: "0 auto", marginBottom: "2rem" }}>
        <Pie data={chartData} />
      </div>

      {/* Ticket Table */}
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#AACDDC" }}>
            <th style={{ padding: "0.5rem" }}>Title</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((t) => (
            <tr key={t._id} style={{ borderBottom: "1px solid #D2C4B4" }}>
              <td style={{ padding: "0.5rem" }}>{t.title}</td>
              <td>{t.type}</td>
              <td>{t.status}</td>
              <td>
                {t.status === "Waiting" && (
                  <button
                    style={{ marginRight: "0.5rem" }}
                    onClick={() => updateStatus(t._id, "In Progress")}
                  >
                    Start Progress
                  </button>
                )}
                {t.status === "In Progress" && (
                  <button onClick={() => updateStatus(t._id, "Closed")}>Mark Accomplished</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentDashboard;