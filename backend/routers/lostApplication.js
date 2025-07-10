const express = require("express");
const router = express.Router();
const LostApplicationSchema = require("../models/lostApplication");
const upload = require("../config/multer"); // multer config for file upload
const loggedInUser = require("../middlewares/userAuth");
const UserSchema = require("../models/user");
const FoundApplicationSchema = require("../models/foundApplication");
const NotificationSchema = require("../models/notifications");

/**
 * @route GET /lostApplications/all
 * @desc Get all lost applications
 * @access Public
 */
router.get("/all", async (req, res) => {
  try {
    const lostApplications = await LostApplicationSchema.find();
    res.json({ success: true, data: lostApplications });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * @route GET /lostApplications/:id
 * @desc Get one lost application by ID
 * @access Public
 */
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const lostApplication = await LostApplicationSchema.findById(id);
    if (!lostApplication) {
      const foundApplication = await FoundApplicationSchema.findById(id);
      if (!foundApplication) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }
      return res.json({
        success: true,
        data: foundApplication,
      });
    }
    res.json({
      success: true,
      data: lostApplication,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

/**
 * @route POST /lostApplications/create
 * @desc Create new lost application
 * @access Private
 */
router.post(
  "/create",
  loggedInUser,
  upload.array("images"), // allow multiple images
  async (req, res) => {
    try {
      const {
        title,
        description,
        tags,
        location,
        category,
        dateLost,
        contact,
        reward,
        additionalInfo,
      } = req.body;
      const user = await UserSchema.findById(req.user._id);

      const images = [];
      if (req.files && req.files.length > 0) {
        images.push(...req.files.map((file) => file.filename)); // add all uploaded filenames
      }

      const newLostApplication = new LostApplicationSchema({
        title,
        description,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        location: JSON.parse(location), // expects location to be JSON string
        category,
        dateLost,
        user: req.user._id, // from loggedInUser middleware
        images,
        contact: contact ? JSON.parse(contact) : {},
        reward,
        additionalInfo,
      });
      await newLostApplication.save();

      user.lostApplications.push(newLostApplication._id);
      await user.save();

      /**
       * ----------------------------------------------
       * 🔔 IMPLEMENT MATCHING & NOTIFICATION LOGIC HERE
       * ----------------------------------------------
       */
      const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
      const lostDate = new Date(newLostApplication.dateLost);
      const threeDaysBefore = new Date(lostDate.getTime() - THREE_DAYS_MS);
      const threeDaysAfter = new Date(lostDate.getTime() + THREE_DAYS_MS);

      const matchingFoundApplications = await FoundApplicationSchema.find({
        "location.city": newLostApplication.location.city,
        dateFound: { $gte: threeDaysBefore, $lte: threeDaysAfter },
        $or: [
          { title: { $regex: newLostApplication.title, $options: "i" } },
          { tags: { $in: newLostApplication.tags } },
        ],
      });

      for (const foundApp of matchingFoundApplications) {
        await NotificationSchema.create({
          type: "lost",
          user: foundApp.user,
          lostApplication: newLostApplication._id,
          foundApplication: foundApp._id,
          message: `A lost item matching your found report was posted in ${newLostApplication.location.city} with a similar title or tags.`,
        });
      }
      /**
       * ----------------------------------------------
       * END OF NOTIFICATION LOGIC
       * ----------------------------------------------
       */

      res.status(201).json({
        success: true,
        data: newLostApplication,
        message: "Your report registerd...",
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

/**
 * @route PUT /lostApplications/update/:id
 * @desc Update an existing lost application by ID
 * @access Private
 */
router.put(
  "/update/:id",
  loggedInUser,
  upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;

      const updateData = {
        ...req.body,
      };

      if (req.files && req.files.length > 0) {
        updateData.images = req.files.map((file) => file.filename);
      }
      if (req.body.tags) {
        updateData.tags = req.body.tags.split(",").map((tag) => tag.trim());
      }

      if (req.body.location) {
        updateData.location = JSON.parse(req.body.location);
      }

      if (req.body.contact) {
        updateData.contact = JSON.parse(req.body.contact);
      }

      const updatedApplication = await LostApplicationSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Lost Application not found",
        });
      }

      res.json({
        success: true,
        data: updatedApplication,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

/**
 * @route DELETE /lostApplications/delete/:id
 * @desc Delete lost application by ID
 * @access Private
 */
router.delete("/delete/:id", loggedInUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findById(req.user._id);
    const deletedApplication = await LostApplicationSchema.findByIdAndDelete(
      id
    );

    const newLostApplications = user.lostApplications.filter(
      (applicationId) => {
        return applicationId.toString() !== id;
      }
    );
    user.lostApplications = newLostApplications;
    await user.save();

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Lost Application not found",
      });
    }

    res.json({
      success: true,
      message: "Lost Application deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
