import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        backgroundColor: "#81A6C6",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <h2>TeleFlow</h2>

      <div style={{ marginTop: "40px" }}>
        <Link to="/admin-dashboard" style={linkStyle}>
          Dashboard
        </Link>

        <Link to="/create-agent" style={linkStyle}>
          Create Agents
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  display: "block",
  margin: "15px 0",
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};

export default AdminSidebar;