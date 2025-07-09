const mongoose = require("mongoose");

const lostApplicationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    type: {
      type: String,
      required: true,
      default: "lost",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    tags: [
      {
        type: String,
        trim: true,
        maxlength: 20, // Maximum length for each tag
      },
    ], // Array of strings for tags
    location: {
      state: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
    },
    category: {
      type: String,
      required: true,
    },
    dateLost: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["lost", "found", "claimed"],
      default: "lost",
    },
    contact: {
      phone: {
        type: String,
        trim: true,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
      },
    },
    reward: {
      type: Number, // in your local currency
      min: 0,
    },
    additionalInfo: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  }
);

const LostApplication = mongoose.model(
  "LostApplication",
  lostApplicationSchema
);
module.exports = LostApplication;
