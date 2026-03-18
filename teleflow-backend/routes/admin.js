import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// Create Agent
router.post("/create-agent", verifyToken, async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

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

    res.json({ message: "Agent created successfully" });

  } catch (error) {

    console.log(error);
    res.status(500).json({ message: "Server error" });

  }

});

export default router;