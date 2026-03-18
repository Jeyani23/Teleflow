import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./TicketDashboard.css";
import { getTickets, updateTicketStatus } from "../api/ticketApi";

function TicketDashboard() {

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await getTickets();
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets", error);
    }
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(t => t.status === "Open").length;
  const progressTickets = tickets.filter(t => t.status === "In Progress").length;
  const resolvedTickets = tickets.filter(t => t.status === "Resolved").length;
  const handleStatusChange = async (id, newStatus) => {
  try {
    await updateTicketStatus(id, newStatus);
    fetchTickets();
  } catch (error) {
    console.error("Status update failed", error);
  }
};

  return (
    <>
      <Sidebar />

      <div className="dashboard-content">

        <h1>TeleFlow Support Dashboard</h1>

        {/* Statistics Cards */}
        <div className="stats-container">

          <div className="stat-card total">
            <h2>{totalTickets}</h2>
            <p>Total Tickets</p>
          </div>

          <div className="stat-card open">
            <h2>{openTickets}</h2>
            <p>Open Tickets</p>
          </div>

          <div className="stat-card progress">
            <h2>{progressTickets}</h2>
            <p>In Progress</p>
          </div>

          <div className="stat-card resolved">
            <h2>{resolvedTickets}</h2>
            <p>Resolved</p>
          </div>

        </div>

        {/* Ticket List */}
        <div className="ticket-grid">

          {tickets.map((ticket) => (
            <div className="ticket-card" key={ticket._id}>

              <h3>{ticket.title}</h3>

              <p>{ticket.description}</p>

              <span className={`status ${ticket.status.toLowerCase()}`}>
                {ticket.status}
              </span>

            </div>
          ))}

        </div>

      </div>
    </>
  );
}

export default TicketDashboard;