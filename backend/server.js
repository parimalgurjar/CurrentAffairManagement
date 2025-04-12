const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const path = require("path");

dotenv.config(); // Load environment variables from .env file

const app = express();

// CORS setup
const clientURL ="https://cam-frontend.onrender.com"; // Your frontend URL
console.log(`CORS allowed for: ${clientURL}`);

app.use(cors({
  origin: clientURL, // Allow only the frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your routes (add any other routes you have)
const affairRoutes = require("./routes/affairRoutes");
app.use("/api/affairs", affairRoutes);

// Error handling
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

// Ensure static files like images are served properly (if any)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
