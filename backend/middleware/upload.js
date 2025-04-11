const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure 'uploads' folder exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir); // Create the folder if it doesn't exist
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir); // Store files in the 'uploads/' folder
  },
  filename: function (req, file, cb) {
    // Use timestamp to generate a unique file name
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File type validation (only allow images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"]; // Allowed file types
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed"), false);
  }
};

// Configure multer with storage and file filter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,  // Filter file types
  limits: { fileSize: 5 * 1024 * 1024 }  // Max file size 5MB
});

module.exports = upload;
