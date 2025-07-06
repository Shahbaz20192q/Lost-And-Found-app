const express = require("express");
const router = express.Router();
const UserSchema = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const upload = require("../config/multer");
const nodemailer = require("../config/nodemailer");
const loggedInUser = require("../middlewares/userAuth");

// Helper: generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.jwtSecret, {
    expiresIn: "30d",
  });
};

/**
 * @route   GET /user/allUsers
 * @desc    Get all users (excludes password, otp, etc.)
 * @access  Public
 */
router.get("/allUsers", async (req, res) => {
  try {
    const users = await UserSchema.find().select(
      "-password -username -otp -__v"
    );
    res.json({ success: true, data: users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /user/:id
 * @desc    Get one user by ID
 * @access  Public
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findOne({ _id: id }).select(
      "-password -otp -__v"
    );
    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /user/register
 * @desc    Register a new user (supports profile picture upload)
 * @access  Public
 * @body    fullName, email, username, password, bio (optional)
 */
router.post("/register", upload.single("profilePicture"), async (req, res) => {
  try {
    const { fullName, email, username, password, bio } = req.body;
    const profilePicture = req.file?.filename;
    const existingUser = await UserSchema.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res.json({
        success: false,
        message: "User with this email or username already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserSchema({
      fullName,
      email,
      username,
      password: hashedPassword,
      bio: bio || "",
    });
    if (profilePicture) {
      newUser.profilePicture = profilePicture;
    }
    await newUser.save();
    const token = generateToken(newUser._id);
    res.json({
      success: true,
      message: "User registered successfully",
      token,
      loggedInUser: newUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /user/login
 * @desc    Login with email or username + password
 * @access  Public
 * @body    email or username, password
 */
router.post("/login", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const existingUser = await UserSchema.findOne({
      $or: [{ email: email }, { username: username }],
    }).select("-__v -otp");
    if (!existingUser) {
      return res.json({ success: false, message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid password" });
    }
    const token = generateToken(existingUser._id);
    res.json({
      success: true,
      token,
      loggedInUser: existingUser,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /user/updateProfile
 * @desc    Update profile details (supports profile picture upload)
 * @access  Private
 * @body    fullName, email, username, bio (optional)
 */
router.put(
  "/updateProfile",
  loggedInUser,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      const { fullName, email, username, bio } = req.body;
      const profilePicture = req.file?.filename;
      const userId = req.user._id;

      const user = await UserSchema.findById(userId);
      if (!user) {
        return res.json({ success: false, message: "User not found" });
      }

      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.username = username || user.username;
      user.profilePicture = profilePicture || user.profilePicture;
      user.bio = bio || user.bio;

      await user.save();
      res.json({
        success: true,
        message: "Profile updated successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.json({ success: false, message: error.message });
    }
  }
);

/**
 * @route   POST /user/generateOtp
 * @desc    Generate and email OTP for password reset
 * @access  Public
 * @body    email
 */
router.post("/generateOtp", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpGeneratedAt = new Date();
    await user.save();

    nodemailer.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Password Reset OTP",
        text: `Your OTP for password reset is ${otp}. It is valid for 30 minutes.`,
      },
      (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          return res.json({ success: false, message: "Failed to send OTP" });
        }
        console.log("Email sent:", info.response);
      }
    );

    res.json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /user/changePasswordOtp
 * @desc    Change password using OTP
 * @access  Public
 * @body    email, otp, newPassword
 */
router.post("/changePasswordOtp", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await UserSchema.findOne({ email: email, otp: otp });
    if (!user) {
      return res.json({
        success: false,
        message: "Invalid OTP or user not found",
      });
    }
    const otpGeneratedAt = user.otpGeneratedAt;
    if (otpGeneratedAt && Date.now() - otpGeneratedAt > 30 * 60 * 1000) {
      return res.json({ success: false, message: "OTP expired" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.otp = null;
    user.otpGeneratedAt = null;
    await user.save();
    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   PUT /user/changePassword
 * @desc    Change password using current password
 * @access  Private
 * @body    currentPassword, newPassword
 */
router.put("/changePassword", loggedInUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return res.json({ success: false, message: "Invalid current password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;

    await user.save();
    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /user/deleteUser/:id
 * @desc    Delete a user by ID
 * @access  Public (should ideally be protected!)
 */
router.delete("/deleteUser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserSchema.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    await UserSchema.findByIdAndDelete(userId);
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

module.exports = router;
