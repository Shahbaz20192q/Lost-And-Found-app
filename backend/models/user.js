const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true, // Trim whitespace from full name
      minlength: 3, // Minimum length for full name
      maxlength: 30, // Maximum length for full name
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "/images/default.png", // Default profile picture path
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    lostApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "LostApplication",
      },
    ],
    foundApplications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoundApplication",
      },
    ],
    notifications: {
      type: [
        {
          type: String,
          enum: [
            "application_created",
            "application_updated",
            "application_deleted",
          ],
        },
      ],
      default: [],
    },
    otp: {
      type: String,
      default: null, // Default value for OTP
      expires: "30m", // OTP expires in 30 minutes
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
