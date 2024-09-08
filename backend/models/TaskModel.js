const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 5
    },
    description: {
      type: String,
      required: true,
      minLength: 15
    },
    status: {
      type: String,
      enum: ["Pending", "InProgress", "Done"],
      default: "Pending"
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
