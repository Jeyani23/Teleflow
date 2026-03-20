import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Import images
import i1 from "../assets/i1.jpg";
import i2 from "../assets/i2.jpg";
import i3 from "../assets/i3.jpg";

// Carousel slides
const slides = [
  {
    title: "Fast Ticket Management",
    description: "Raise and track your tickets in real-time.",
    image: i1,
  },
  {
    title: "Efficient Agent Management",
    description: "Agents can resolve issues quickly and efficiently.",
    image: i2,
  },
  {
    title: "Real-time Updates",
    description: "Stay updated instantly on your ticket progress.",
    image: i3,
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Header */}
      <header style={headerStyle}>
        <h1 style={{ margin: 0 }}>TeleFlow</h1>
        <div>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/register" style={linkStyle}>Register</Link>
          <Link
            to="/login"
            style={{ ...linkStyle, border: "1px solid #fff", backgroundColor: "#AACDDC", padding: "5px 12px", borderRadius: "4px" }}
          >
            Login
          </Link>
        </div>
      </header>

      {/* Carousel */}
      <section style={{ position: "relative", height: "450px", overflow: "hidden" }}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              position: index === currentSlide ? "relative" : "absolute",
              top: 0,
              left: index === currentSlide ? 0 : "-100%",
              width: "100%",
              height: "450px",
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              color: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              transition: "all 0.8s ease-in-out",
            }}
          >
            <h2 style={{ fontSize: "2.5rem", marginBottom: "15px", textShadow: "2px 2px 6px rgba(0,0,0,0.7)" }}>
              {slide.title}
            </h2>
            <p style={{ fontSize: "1.2rem", maxWidth: "700px", textShadow: "1px 1px 5px rgba(0,0,0,0.7)" }}>
              {slide.description}
            </p>
          </div>
        ))}
      </section>

      {/* Features / Cards */}
      <section style={featuresSectionStyle}>
        {slides.map((feature, idx) => (
          <div
            key={idx}
            style={cardStyle}
            className="feature-card"
          >
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={footerStyle}>
        &copy; 2026 TeleFlow. All rights reserved.
      </footer>

      {/* Card hover CSS */}
      <style>
        {`
          .feature-card {
            transition: all 0.3s ease;
            cursor: pointer;
          }
          .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(0,0,0,0.3);
          }
        `}
      </style>
    </div>
  );
}

// Styles
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "20px 50px",
  backgroundColor: "#81A6C6",
  color: "#fff",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold",
  marginRight: "15px",
};

const featuresSectionStyle = {
  display: "flex",
  justifyContent: "space-around",
  padding: "50px",
  flexWrap: "wrap",
  gap: "30px",
  backgroundColor: "#fff",
};

const cardStyle = {
  backgroundColor: "#F3E3D0",
  padding: "25px",
  borderRadius: "12px",
  width: "250px",
  textAlign: "center",
  boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
};

const footerStyle = {
  backgroundColor: "#D2C4B4",
  color: "#fff",
  textAlign: "center",
  padding: "20px",
  marginTop: "20px",
};

export default Home;