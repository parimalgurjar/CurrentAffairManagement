const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { createAffair, getAffairs } = require("../controllers/affairController");
const verifyToken = require("../middleware/verifyToken");
const Affair = require("../models/affairModel");

// ✅ Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

// ✅ File filter - allow only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only images are allowed"), false);
  }
};

// ✅ Multer middleware setup
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// ✅ Protected route to create affair
router.post(
  "/",
  (req, res, next) => {
    
    next();
  },
  verifyToken,
  upload.single("photo"),
  (req, res) => {
   

    if (req.file) {
    
    } else {
      console.log("🚫 No file uploaded.");
    }

    createAffair(req, res);
  }
);



// DELETE /api/affairs/:id
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Affair.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Affair deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});





// ✅ Public route to get all affairs
router.get("/", getAffairs);

// ✅ Error handling for Multer and others
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: `Multer error: ${err.message}` });
  } else if (err) {
    res.status(400).json({ error: err.message });
  } else {
    next();
  }
});

module.exports = router;
