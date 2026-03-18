import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import Home from "./customer/Home";
import Profile from "./customer/Profile";
import RiseTickets from "./customer/RiseTickets";
import TicketHistory from "./customer/TicketHistory";

const CustomerDashboard = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(storedUser);
  const [collapsed, setCollapsed] = useState(false); // Sidebar toggle
  const location = useLocation(); // For active link

  if (!user?.role || user.role !== "customer") {
    return <Navigate to="/" />; // Redirect if not logged in
  }

  const menuItems = [
    { name: "Home", path: "home" },
    { name: "Dashboard", path: "profile" },
    { name: "Rise Tickets", path: "rise-tickets" },
    { name: "Ticket History", path: "ticket-history" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: collapsed ? "60px" : "220px",
          backgroundColor: "#AACDDC",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          transition: "width 0.3s",
        }}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            marginBottom: "1rem",
            backgroundColor: "#81A6C6",
            color: "#fff",
            border: "none",
            padding: "0.3rem",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          {collapsed ? "➡️" : "⬅️"}
        </button>

        {/* Welcome */}
        {!collapsed && <h3 style={{ color: "#81A6C6" }}>Welcome, {user.name}</h3>}

        {/* Menu Items */}
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            style={{
              textDecoration: "none",
              color: location.pathname.includes(item.path) ? "#fff" : "#000",
              backgroundColor: location.pathname.includes(item.path) ? "#81A6C6" : "transparent",
              padding: "0.5rem 1rem",
              borderRadius: "6px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {!collapsed ? item.name : item.name.charAt(0)}
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "2rem", backgroundColor: "#F3E3D0" }}>
        <Routes>
          <Route path="home" element={<Home user={user} />} />
          <Route path="profile" element={<Profile user={user} setUser={setUser} />} />
          <Route path="rise-tickets" element={<RiseTickets user={user} />} />
          <Route path="ticket-history" element={<TicketHistory user={user} />} />
          <Route path="*" element={<Home user={user} />} />
        </Routes>
      </div>
    </div>
  );
};

export default CustomerDashboard;