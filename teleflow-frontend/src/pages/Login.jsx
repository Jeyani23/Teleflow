import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, { email, password });
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);

      if(user.role === "customer") navigate("/customer");
      else if(["networkAgent","billingAgent","simAgent"].includes(user.role)) navigate("/agent/dashboard");
      else if(user.role === "admin") navigate("/admin-dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight:"100vh", display:"flex", justifyContent:"center", alignItems:"center", background:"#F3E3D0" }}>
      <div style={{ background:"#AACDDC", padding:"40px", borderRadius:"15px", boxShadow:"0 10px 30px rgba(0,0,0,0.2)", width:"350px" }}>
        <h2 style={{ textAlign:"center", color:"#81A6C6", marginBottom:"30px" }}>Agent Login</h2>
        {error && <p style={{ color:"red", textAlign:"center" }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"15px" }}>
          <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} required style={inputStyle} />
          <button type="submit" disabled={loading} style={buttonStyle}>{loading ? "Logging in..." : "Login"}</button>
        </form>

        {/* Customer Register Link */}
        <p style={{ textAlign:"center", marginTop:"15px", color:"#fff" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color:"#81A6C6", fontWeight:"bold", textDecoration:"underline" }}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

const inputStyle = { padding:"10px", borderRadius:"8px", border:"1px solid #81A6C6" };
const buttonStyle = { padding:"10px", borderRadius:"8px", border:"none", background:"#81A6C6", color:"#fff", fontWeight:"bold", cursor:"pointer" };

export default Login;