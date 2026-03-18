import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentSidebar from "../../components/AgentSidebar";

function SimAgentDashboard() {

  const [tickets, setTickets] = useState([]);

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

      console.log("Fetched tickets:", res.data);

      setTickets(res.data);

    } catch (err) {
      console.log("Error fetching tickets:", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/tickets/update/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTickets();

    } catch (err) {
      console.log("Error updating status:", err);
    }
  };

  return (
    <div style={{ display: "flex" }}>
    
    <AgentSidebar />

    <div style={{ marginLeft: "240px", padding: "30px", width: "100%" }}>

      <h2 style={{ color: "#81A6C6" }}>Agent Dashboard</h2>

     
   
    <div style={{ padding: "30px" }}>
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
            {tickets.map(ticket => (
              <tr key={ticket._id}>

                <td>
                  {ticket.customer?.name || ticket.customer?.email || "N/A"}
                </td>

                <td>{ticket.issue || "No issue provided"}</td>

                <td>{ticket.address || "N/A"}</td>

                <td>{ticket.status}</td>

                <td>
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateStatus(ticket._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
       
    </div>
  </div>
  );
}

export default SimAgentDashboard;