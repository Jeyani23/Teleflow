import React from "react";

const TicketCard = ({ ticket, onUpdateStatus }) => {
  const colorMap = { waiting: "#F3E3D0", in_progress: "#AACDDC", closed: "#81A6C6" };
  return (
    <div style={{ backgroundColor: colorMap[ticket.status], padding: "1rem", margin: "0.5rem", borderRadius: "8px" }}>
      <h3>{ticket.title}</h3>
      <p>{ticket.description}</p>
      <p>Status: <b>{ticket.status}</b></p>
      {ticket.status !== "closed" && (
        <button onClick={() => onUpdateStatus(ticket._id)}>
          {ticket.status === "waiting" ? "Start Progress" : "Mark Accomplished"}
        </button>
      )}
    </div>
  );
};

export default TicketCard;