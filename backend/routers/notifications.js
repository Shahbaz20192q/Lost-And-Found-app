const express = require("express");
const router = express.Router();
const NotificationSchema = require("../models/notifications");
const loggedInUser = require("../middlewares/userAuth");

/**
 * @route   GET /notifications/all
 * @desc    Get all notifications (for admin or debugging)
 * @access  Public
 */
router.get("/all", async (req, res) => {
  try {
    const notifications = await NotificationSchema.find()
      .sort({ createdAt: -1 })
      .populate("foundApplication lostApplication user");
    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /notifications
 * @desc    Get notifications for the logged-in user
 * @access  Private
 */
router.get("/", loggedInUser, async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await NotificationSchema.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("foundApplication lostApplication user");

    if (notifications.length === 0) {
      return res.json({
        success: true,
        message: "No notifications found for this user.",
      });
    }

    res.json({ success: true, data: notifications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /notifications/read/id
 * @desc    Read notification
 * @access  Private
 */
router.get("/read/:id", async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await NotificationSchema.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    notification.read = true;
    await notification.save();
    res.json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /notifications/:id
 * @desc    Get a single notification by ID
 * @access  Private
 * @param   {String} id - Notification ID
 */
router.get("/:id", loggedInUser, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await NotificationSchema.findById(
      notificationId
    ).populate("foundApplication lostApplication user");

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.json({ success: true, data: notification });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route   DELETE /notifications/:id
 * @desc    Delete a notification by ID
 * @access  Private
 * @param   {String} id - Notification ID
 */
router.delete("/:id", loggedInUser, async (req, res) => {
  try {
    const notificationId = req.params.id;
    const notification = await NotificationSchema.findByIdAndDelete(
      notificationId
    );

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    res.json({ success: true, message: "Notification deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
