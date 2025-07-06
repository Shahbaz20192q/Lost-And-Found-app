const User = require("../models/user");
const jwt = require("jsonwebtoken");
// logged In User

const loggedUser = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(401).json({ message: "You are not logged in" });
  }
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    const user = await User.findById(decoded.userId);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = loggedUser;
