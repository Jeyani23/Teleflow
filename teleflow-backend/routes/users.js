import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";
import bcrypt from "bcryptjs"; // For hashing passwords

const router = express.Router();

// --- UPDATE PROFILE ---
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const updateData = { ...req.body };

    // If password is provided, hash it
    if (updateData.password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(updateData.password, salt);
    }

    const updated = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });
    if (!updated) return res.status(404).json({ message: "User not found" });

    const { password, ...userData } = updated._doc; // remove password from response
    res.json({ message: "Profile updated successfully", user: userData });

  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ message: "Failed to update profile", error: err.message });
  }
});

export default router;