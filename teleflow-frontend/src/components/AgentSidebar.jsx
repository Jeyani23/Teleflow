import React from "react";
import { Link } from "react-router-dom";

function AgentSidebar() {
  return (
    <div style={{
      width: "220px",
      height: "100vh",
      background: "#AACDDC",
      padding: "20px",
      position: "fixed"
    }}>
      <h2 style={{ color: "#fff", marginBottom: "30px" }}>
        Agent Panel
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <Link to="/agent/dashboard" style={linkStyle}>Dashboard</Link>
        <Link to="/agent/progress" style={linkStyle}>Progress</Link>
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "bold",
  background: "#81A6C6",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center"
};

export default AgentSidebar;