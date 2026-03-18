// controllers/userController.js
import User from "../models/User.js";

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-password");

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update user" });
  }
};