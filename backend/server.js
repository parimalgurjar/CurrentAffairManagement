const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const affairRoutes = require("./routes/affairRoutes");
const authRoutes = require("./routes/auth");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Change this for production
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



// Health check route
app.get("/", (req, res) => {
  res.send("🎯 API is running...");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/affairs", affairRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      // Optional: uncomment this if you want a log during local development
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  });
