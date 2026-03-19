import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Registration";
import CustomerDashboard from "./pages/CustomerDashboard";
import RiseTickets from "./pages/RiseTickets";
import TicketHistory from "./pages/TicketHistory";
import AdminDashboard from "./pages/AdminDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";
import NetworkAgentDashboard from "./pages/agent/NetworkAgentDashboard";
import BillingAgentDashboard from "./pages/agent/BillingAgentDashboard";
import SimAgentDashboard from "./pages/agent/SimAgentDashboard";
import CreateAgent from "./pages/CreateAgent";
import AgentProgress from "./pages/agent/AgentProgress";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (err) {
      console.log("User parse error:", err);
      setUser(null);
    }
  }
}, []);

  const handleLogin = (newUser) => setUser(newUser);

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* Customer */}
        <Route path="/customer/*" element={user?.role === "customer" ? <CustomerDashboard /> : <Navigate to="/" />} />
        <Route path="/customer/raise-ticket" element={user?.role === "customer" ? <RiseTickets /> : <Navigate to="/" />} />
        <Route path="/customer/tickets" element={user?.role === "customer" ? <TicketHistory /> : <Navigate to="/" />} />

        {/* Agents */}
        <Route path="/agent-dashboard" element={["networkAgent","billingAgent","simAgent"].includes(user?.role) ? <AgentDashboard /> : <Navigate to="/" />} />
        <Route path="/agent/network" element={user?.role === "networkAgent" ? <NetworkAgentDashboard /> : <Navigate to="/" />} />
        <Route path="/agent/billing" element={user?.role === "billingAgent" ? <BillingAgentDashboard /> : <Navigate to="/" />} />
        <Route path="/agent/sim" element={user?.role === "simAgent" ? <SimAgentDashboard /> : <Navigate to="/" />} />
        <Route path="/agent/progress" element={<AgentProgress />} />

        {/* Admin */}
        <Route path="/admin-dashboard" element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/create-agent" element={user?.role === "admin" ? <CreateAgent /> : <Navigate to="/" />} />

        {/* Default */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;