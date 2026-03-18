import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Registration";

import CustomerDashboard from "./pages/CustomerDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";
import NetworkAgentDashboard from "./pages/agent/NetworkAgentDashboard";
import BillingAgentDashboard from "./pages/agent/BillingAgentDashboard";
import SimAgentDashboard from "./pages/agent/SimAgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAgent from "./pages/CreateAgent";
import AgentProgress from "./pages/agent/AgentProgress";

const App = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const handleLogin = (newUser) => {
    setUser(newUser);
  };

  return (
    <Router>

      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />

        {/* CUSTOMER */}
        <Route
          path="/customer/*"
          element={
            user?.role === "customer"
              ? <CustomerDashboard />
              : <Navigate to="/" />
          }
        />

        {/* AGENT MAIN */}
        <Route
          path="/agent-dashboard"
          element={
            ["networkAgent", "billingAgent", "simAgent"].includes(user?.role)
              ? <AgentDashboard />
              : <Navigate to="/" />
          }
        />

        {/* NETWORK AGENT */}
        <Route
          path="/agent/network"
          element={
            user?.role === "networkAgent"
              ? <NetworkAgentDashboard />
              : <Navigate to="/" />
          }
        />

        {/* BILLING AGENT */}
        <Route
          path="/agent/billing"
          element={
            user?.role === "billingAgent"
              ? <BillingAgentDashboard />
              : <Navigate to="/" />
          }
        />

        {/* SIM AGENT */}
        <Route
          path="/agent/sim"
          element={
            user?.role === "simAgent"
              ? <SimAgentDashboard />
              : <Navigate to="/" />
          }
        />


<Route path="/agent/progress" element={<AgentProgress />} />

        {/* ADMIN */}
        <Route
          path="/admin-dashboard"
          element={
            user?.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

        <Route
          path="/create-agent"
          element={
            user?.role === "admin"
              ? <CreateAgent />
              : <Navigate to="/" />
          }
        />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>

    </Router>
  );
};

export default App;