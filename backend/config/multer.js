const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;

    // Determine folder based on request URL at runtime
    if (req.baseUrl.includes("/user")) {
      dest = "public/images/profile";
    } else if (req.baseUrl.includes("/lostApplications")) {
      dest = "public/images/lost";
    } else {
      dest = "public/images/found";
    }

    // Create the directory if it doesn't exist
    fs.mkdirSync(dest, { recursive: true });

    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const unique = uuidv4();
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
module.exports = upload;
