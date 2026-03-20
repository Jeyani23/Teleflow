import React, { useState } from "react";
import axios from "axios";

function Profile({ user, setUser }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Please login again");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/profile`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Profile updated successfully");

      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);

      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err) {
      console.error(err.response?.data || err.message);
      setMessage(err.response?.data?.message || "Failed to update profile");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        background: "#F3E3D0",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2 style={{ color: "#81A6C6", textAlign: "center" }}>Profile</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password"
          style={inputStyle}
        />
        <input
          type="password"
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          style={inputStyle}
        />

        <button type="submit" style={buttonStyle}>
          Update Profile
        </button>
      </form>

      {message && (
        <p style={{ textAlign: "center", marginTop: "10px", color: "#333" }}>
          {message}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#81A6C6",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Profile;