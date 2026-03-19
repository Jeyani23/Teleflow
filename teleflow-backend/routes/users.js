import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// UPDATE PROFILE
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.user.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });

    const { password, ...userData } = updated._doc; // remove password
    res.json({ message: "Profile updated", user: userData });

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to edit profile", error: err.message });
  }
});

export default router;