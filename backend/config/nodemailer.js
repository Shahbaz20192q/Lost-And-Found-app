const nodemailer = require("nodemailer");

// Create a transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST, // e.g., "smtp.gmail.com" or your SMTP host
  port: Number(process.env.EMAIL_PORT) || 587, // 587 (TLS) or 465 (SSL)
  secure: false, // true for port 465, false for 587
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
});

module.exports = transporter;
