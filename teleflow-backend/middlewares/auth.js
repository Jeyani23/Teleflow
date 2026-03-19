import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : authHeader;
    if (!token) return res.status(401).json({ message: "Invalid token format" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.id || !decoded.role) return res.status(401).json({ message: "Invalid token payload" });

    req.user = decoded;
    next();

  } catch (err) {
    console.error("Auth Error:", err.message);
    res.status(401).json({ message: "Unauthorized", error: err.message });
  }
};  