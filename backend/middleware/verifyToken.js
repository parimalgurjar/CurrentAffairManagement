const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET;


const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
 

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ No token or bad format");
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];
  console.log("🔍 Extracted Token:");

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    

    next();
  } catch (error) {
    console.log("❌ Token verification failed:");
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = verifyToken;
