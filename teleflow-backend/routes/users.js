import express from "express";
import User from "../models/User.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.put("/profile", verifyToken, async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.user.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Profile updated",
      user: updated
    });

  } catch (err) {
    res.status(500).json({
      message: "Failed to edit profile",
      error: err.message
    });
  }
});

export default router;