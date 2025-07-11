const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["lost", "found"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lostApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "LostApplication",
      default: null,
    },
    foundApplication: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FoundApplication",
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notifications", notificationSchema);
