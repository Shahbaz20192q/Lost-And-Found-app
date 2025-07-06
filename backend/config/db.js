// Mongo DB connection configuration
// This file is responsible for connecting to the MongoDB database using Mongoose.
// It uses environment variables for the connection string to keep sensitive information secure.

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Use the MONGO_URL from the environment variables
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process with failure
  }
};
module.exports = connectDB;
