import React, { useState } from "react";
import axios from "axios";

function CreateAgent() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "networkAgent"
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login again");
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/admin/create-agent`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Agent created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        role: "networkAgent"
      });

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Agent creation failed");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "60px" }}>
      <div style={{
        width: "420px",
        padding: "30px",
        background: "#F3E3D0",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
      }}>
        <h2 style={{ textAlign: "center", color: "#81A6C6" }}>Create Agent</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Agent Name" value={form.name} onChange={handleChange} required style={inputStyle} />
          <input type="email" name="email" placeholder="Agent Email" value={form.email} onChange={handleChange} required style={inputStyle} />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required style={inputStyle} />
          <select name="role" value={form.role} onChange={handleChange} style={inputStyle}>
            <option value="networkAgent">Network Agent</option>
            <option value="billingAgent">Billing Agent</option>
            <option value="simAgent">SIM Agent</option>
          </select>
          <button type="submit" style={buttonStyle}>Create Agent</button>
        </form>

        {message && <p style={{ textAlign: "center", marginTop: "15px", color: "#333" }}>{message}</p>}
      </div>
    </div>
  );
}

const inputStyle = { width: "100%", padding: "10px", marginTop: "12px", borderRadius: "5px", border: "1px solid #ccc" };
const buttonStyle = { width: "100%", padding: "12px", marginTop: "20px", background: "#81A6C6", border: "none", color: "white", fontWeight: "bold", borderRadius: "5px", cursor: "pointer" };

export default CreateAgent;