const mongoose = require("mongoose");

const counterSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    presentCounter: {
      type: Number,
      default: 0,
    },
    cancelCounter: {
      type: Number,
      default: 0,
    },
  },
  { timestamp: true }
);

module.exports = mongoose.model("Counter", counterSchema);
