import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentSidebar from "../../components/AgentSidebar";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function AgentProgress() {

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    progress: 0,
    completed: 0
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/tickets/agent",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const tickets = res.data;

      const total = tickets.length;
      const pending = tickets.filter(t => t.status === "Pending").length;
      const progress = tickets.filter(t => t.status === "In Progress").length;
      const completed = tickets.filter(t => t.status === "Completed").length;

      setStats({ total, pending, progress, completed });

    } catch (err) {
      console.log(err);
    }
  };

  const data = {
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        data: [stats.pending, stats.progress, stats.completed],
        backgroundColor: ["#D2C4B4", "#81A6C6", "#AACDDC"]
      }
    ]
  };

  return (
    <div style={{ display: "flex" }}>
      
      <AgentSidebar />

      <div style={{ marginLeft: "240px", padding: "30px", width: "100%" }}>

        <h2 style={{ color: "#81A6C6" }}>Ticket Progress</h2>

        <div style={{
          background: "#F3E3D0",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px"
        }}>
          <h3>Total Tickets: {stats.total}</h3>
          <p>Pending: {stats.pending}</p>
          <p>In Progress: {stats.progress}</p>
          <p>Completed: {stats.completed}</p>
        </div>

        <div style={{
          width: "400px",
          margin: "auto"
        }}>
          <Pie data={data} />
        </div>

      </div>
    </div>
  );
}

export default AgentProgress;