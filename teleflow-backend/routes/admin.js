import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// CREATE AGENT
router.post("/create-agent", verifyToken, async (req, res) => {
  try {
    // Only admin can create agents
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new agent
    const agent = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({ message: "Agent created successfully", agent });

  } catch (err) {
    console.error("Agent creation failed:", err);
    res.status(500).json({ message: "Agent creation failed", error: err.message });
  }
});

export default router;