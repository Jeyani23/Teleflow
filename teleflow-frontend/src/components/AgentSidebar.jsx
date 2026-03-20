import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

function AgentSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#D2C4B4",
        padding: "20px",
        position: "fixed",
        boxShadow: "2px 0 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>Agent Panel</h2>

        {/* Scrollable Links Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            maxHeight: "calc(100vh - 150px)", // leaves space for footer
            overflowY: "auto",
          }}
        >
          <Link
            to="/agent/dashboard"
            style={{
              ...linkStyle,
              background:
                location.pathname === "/agent/dashboard"
                  ? "#F3E3D0"
                  : "#81A6C6",
              color:
                location.pathname === "/agent/dashboard" ? "#000" : "#fff",
            }}
          >
            Dashboard
          </Link>
          <Link
            to="/agent/progress"
            style={{
              ...linkStyle,
              background:
                location.pathname === "/agent/progress"
                  ? "#F3E3D0"
                  : "#81A6C6",
              color:
                location.pathname === "/agent/progress" ? "#000" : "#fff",
            }}
          >
            Progress
          </Link>

          {/* Logout button below Progress */}
          <button
            onClick={handleLogout}
            style={{
             ...linkStyle,
              background:
                location.pathname === "/agent/progress"
                  ? "#F3E3D0"
                  : "#81A6C6",
              color:
                location.pathname === "/agent/progress" ? "#000" : "#fff",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: "20px", color: "#fff", fontSize: "12px" }}>
        &copy; 2026 TeleFlow. All rights reserved.
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "bold",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
  transition: "0.3s",
  textTransform: "uppercase",
};

export default AgentSidebar;