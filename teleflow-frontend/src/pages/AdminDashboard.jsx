import React from "react";
import AdminSidebar from "../components/AdminSidebar";

function AdminDashboard() {
  return (
    <div>
      <AdminSidebar />

      <div
        style={{
          marginLeft: "240px",
          padding: "30px",
        }}
      >
        <h1>Admin Dashboard</h1>

        <p>Welcome Admin 👋</p>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div style={cardStyle}>
            <h3>Total Tickets</h3>
            <p>24</p>
          </div>

          <div style={cardStyle}>
            <h3>Pending Tickets</h3>
            <p>12</p>
          </div>

          <div style={cardStyle}>
            <h3>Resolved Tickets</h3>
            <p>12</p>
          </div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "#F3E3D0",
  padding: "20px",
  borderRadius: "10px",
  width: "200px",
};

export default AdminDashboard;