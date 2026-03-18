// src/customer/Profile.jsx
import React, { useState } from "react";
import axios from "axios";

const Profile = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: user.phone || "",
    address: user.address || "",
  });
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token"); // make sure token is stored
      const res = await axios.put(
        "http://localhost:5000/api/users/profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(res.data.user); // update user state
      setMessage("Profile updated successfully!");
      setEditing(false);
    } catch (err) {
      console.error(err);
      setMessage("Failed to update profile");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
      <div
        style={{
          width: "400px",
          padding: "2rem",
          backgroundColor: "#F3E3D0",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#81A6C6" }}>My Profile</h2>

        <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={!editing}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editing}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Phone No:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editing}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>

          <label>
            Address:
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              disabled={!editing}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" }}
            />
          </label>
        </div>

        <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
          {editing ? (
            <>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#81A6C6",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  marginRight: "1rem",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                style={{
                  padding: "0.5rem 1.5rem",
                  backgroundColor: "#D2C4B4",
                  color: "#000",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              style={{
                padding: "0.5rem 1.5rem",
                backgroundColor: "#AACDDC",
                color: "#000",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <p style={{ marginTop: "1rem", color: message.includes("success") ? "green" : "red", textAlign: "center" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;