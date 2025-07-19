const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables from .env file
const connectDB = require("./config/db"); // Import the database connection function
const cors = require("cors"); // Import CORS middleware
const path = require("path"); // Import path module for serving static files

connectDB(); // Connect to MongoDB

// Routes Paths
const userRouter = require("./routers/user");
const foundApplicationRouter = require("./routers/foundApplication"); // Import found application router
const lostApplicationRouter = require("./routers/lostApplication"); // Import lost application router
const notificationRouter = require("./routers/notifications"); // Import notification router

// middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, "public"))); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// routes
app.get("/", (req, res) => {
  res.send("Welcome to the backend server!"); // Simple route to test server
});

app.use("/user", userRouter);
app.use("/foundApplications", foundApplicationRouter); // Use found application router
app.use("/lostApplications", lostApplicationRouter); // Use lost application router
app.use("/notifications", notificationRouter); // Use notification router

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
// start the server
const PORT = process.env.PORT || 3000; // Use PORT from environment variables or default to 3000
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
