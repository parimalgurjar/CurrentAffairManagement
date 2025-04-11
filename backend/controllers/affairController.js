// controllers/affairController.js
const Affair = require("../models/affairModel");

// 📌 Create a new current affair
const createAffair = async (req, res) => {
  try {
    const {
      date,
      source,
      pageNumber,
      title,
      subject,
      topic,
      description,
    } = req.body;

    const affairDate = new Date(date);
    const photo = req.file ? req.file.filename : null;

    const newAffair = new Affair({
      date: affairDate,
      source,
      pageNumber,
      title,
      subject,
      topic,
      description,
      photo,
      user: req.user.userId, // user from auth middleware
    });

    const savedAffair = await newAffair.save();
    res.status(201).json({ message: "Affair created successfully", affair: savedAffair });
  } catch (error) {
    console.error("❌ Error creating affair:", error.message);
    res.status(500).json({ error: "Failed to create affair. Please try again later." });
  }
};

// 📌 Get affairs (with optional filters + search by topic)
const getAffairs = async (req, res) => {
  try {
    const { subject, topic, from, to, search } = req.query;
    const query = {};

    if (subject) query.subject = subject;

    if (topic) {
      query.topic = { $regex: topic, $options: "i" };
    }

    // 🔍 Search by topic (or you can extend to title/description too)
    if (search) {
      query.$or = [
        { topic: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (from || to) {
      query.date = {};
      if (from) query.date.$gte = new Date(from);
      if (to) {
        const toDate = new Date(to);
        toDate.setHours(23, 59, 59, 999); // include full day
        query.date.$lte = toDate;
      }
    }

    const affairs = await Affair.find(query).sort({ date: -1 });
    res.status(200).json(affairs);
  } catch (error) {
    console.error("❌ Error fetching affairs:", error.message);
    res.status(500).json({ error: "Failed to fetch affairs. Please try again later." });
  }
};


module.exports = { createAffair, getAffairs };
