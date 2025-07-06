const express = require("express");
const router = express.Router();
const FoundApplicationSchema = require("../models/foundApplication"); // foundApplication Schema
const UserSchema = require("../models/user"); // user Schema
const upload = require("../config/multer"); // multer config for file upload
const loggedInUser = require("../middlewares/userAuth");
const NotificationSchema = require("../models/notifications"); // Notification Schema
const LostApplicationSchema = require("../models/lostApplication"); // Lost Application Schema

/**
 * @route   GET /foundApplications/all
 * @desc    Get all found applications from the database
 * @access  Public
 */

router.get("/all", async (req, res) => {
  try {
    const foundApplications = await FoundApplicationSchema.find();
    res.json({ success: true, data: foundApplications });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   GET /foundApplications/:id
 * @desc    Get a single found application by ID
 * @access  Public
 */

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const foundApplication = await FoundApplicationSchema.findById(id);
    if (!foundApplication) {
      return res.json({
        success: false,
        message: "Found Application not found",
      });
    }
    res.json({
      success: false,
      data: foundApplication,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

/**
 * @route   POST /foundApplications/create
 * @desc    Create a new found application (with optional image upload)
 * @access  Private (requires authentication)
 */

router.post(
  "/create",
  loggedInUser,
  upload.array("images"),
  async (req, res) => {
    try {
      const {
        title,
        description,
        tags,
        location,
        category,
        dateFound,
        contact,
        reward,
        additionalInfo,
      } = req.body;
      const user = await UserSchema.findById(req.user._id);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const images = [];
      if (req.files && req.files.length > 0) {
        images.push(...req.files.map((file) => file.filename)); // add all uploaded filenames
      }
      const newFoundApplication = new FoundApplicationSchema({
        title,
        description,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        location: JSON.parse(location), // expects location to be JSON string
        category,
        dateFound,
        user: req.user._id, // from loggedInUser middleware
        images,
        contact: contact ? JSON.parse(contact) : {},
        reward,
        additionalInfo,
      });
      await newFoundApplication.save();

      user.foundApplications.push(newFoundApplication._id);
      await user.save();

      /**
       * ----------------------------------------------
       * 🔔 IMPLEMENT MATCHING & NOTIFICATION LOGIC HERE
       * ----------------------------------------------
       */
      const THREE_DAYS_MS = 3 * 24 * 60 * 60 * 1000;
      const foundDate = new Date(newFoundApplication.dateFound);
      const threeDaysBefore = new Date(foundDate.getTime() - THREE_DAYS_MS);
      const threeDaysAfter = new Date(foundDate.getTime() + THREE_DAYS_MS);

      const matchingLostApplications = await LostApplicationSchema.find({
        "location.city": newFoundApplication.location.city,
        dateLost: { $gte: threeDaysBefore, $lte: threeDaysAfter },
        $or: [
          { title: { $regex: newFoundApplication.title, $options: "i" } },
          { tags: { $in: newFoundApplication.tags } },
        ],
      });

      for (const lostApp of matchingLostApplications) {
        await NotificationSchema.create({
          type: "found",
          user: lostApp.user,
          lostApplication: lostApp._id,
          foundApplication: newFoundApplication._id,
          message: `A found item matching your lost report was posted in ${newFoundApplication.location.city} with a similar title or tags.`,
        });
      }
      /**
       * ----------------------------------------------
       * END OF NOTIFICATION LOGIC
       * ----------------------------------------------
       */

      res.status(201).json({
        success: true,
        data: newFoundApplication,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ success: false, message: error.message });
    }
  }
);

// router.post(
//   "/create",
//   loggedInUser,
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       const {
//         title,
//         description,
//         tags,
//         location,
//         category,
//         dateFound,
//         contact,
//         reward,
//         additionalInfo,
//       } = req.body;
//       const user = await UserSchema.findById(req.user._id);

//       if (!user) {
//         return res.status(404).json({
//           success: false,
//           message: "User not found",
//         });
//       }

//       const images = [];
//       if (req.file) {
//         images.push(req.file.filename); // only store filename
//       }

//       const newFoundApplication = new FoundApplicationSchema({
//         title,
//         description,
//         tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], // handle tags comma separated
//         location: JSON.parse(location), // expects location as JSON string
//         category,
//         dateFound,
//         user: req.user._id, // from loggedInUser middleware
//         images,
//         contact: contact ? JSON.parse(contact) : {},
//         reward,
//         additionalInfo,
//       });
//       await newFoundApplication.save();
//       user.foundApplications.push(newFoundApplication._id);
//       await user.save();

//       res.status(201).json({
//         success: true,
//         data: newFoundApplication,
//       });
//     } catch (error) {
//       console.log(error);
//       res.status(400).json({ success: false, message: error.message });
//     }
//   }
// );

/**
 * @route   PUT /foundApplications/update/:id
 * @desc    Update an existing found application by ID (with optional new image)
 * @access  Private (requires authentication)
 */

router.put(
  "/update/:id",
  loggedInUser,
  upload.array("images"),
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

      const updatedApplication = await FoundApplicationSchema.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!updatedApplication) {
        return res.status(404).json({
          success: false,
          message: "Found Application not found",
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
 * @route   DELETE /foundApplications/delete/:id
 * @desc    Delete a found application by ID
 * @access  Private (requires authentication)
 */

router.delete("/delete/:id", loggedInUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserSchema.findById(req.user._id);
    const deletedApplication = await FoundApplicationSchema.findByIdAndDelete(
      id
    );
    // delete application from user schema also
    const updatedFoundApplications = user.foundApplications.filter(
      (applicationId) => {
        return applicationId.toString() !== id;
      }
    );
    user.foundApplications = updatedFoundApplications;
    await user.save();

    if (!deletedApplication) {
      return res.status(404).json({
        success: false,
        message: "Found Application not found",
      });
    }

    res.json({
      success: true,
      message: "Found Application deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
