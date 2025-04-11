// middleware/verifyToken.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // decoded should contain user id or email
    

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
