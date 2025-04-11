const mongoose = require("mongoose");

const affairSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    source: String,
    pageNumber: Number,
    title: {
      type: String,
      required: true,
    },
    subject: String,
    topic: String,
    description: String,
    photo: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Affair", affairSchema);
