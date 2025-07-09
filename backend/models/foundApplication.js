const mongoose = require("mongoose");

const foundApplicationSchema = new mongoose.Schema(
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
      default: "found",
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
    dateFound: {
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
      enum: ["found", "claimed", "returned"],
      default: "found",
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

const FoundApplication = mongoose.model(
  "FoundApplication",
  foundApplicationSchema
);
module.exports = FoundApplication;
