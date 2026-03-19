import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// ✅ Create Agent (ONLY ADMIN)
router.post("/create-agent", verifyToken, async (req, res) => {
  try {

    // 🔐 Check if admin
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const { name, email, password, role } = req.body;

    // ✅ Validation
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new User({
      name,
      email,
      password: hashedPassword,
      role
    });

    await agent.save();

    res.status(201).json({
      message: "Agent created successfully",
      agent
    });

  } catch (error) {
    console.log("Create Agent Error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

export default router;