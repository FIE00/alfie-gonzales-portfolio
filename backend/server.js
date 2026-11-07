
/* ==========================================
   PERSONAL PORTFOLIO
   Express Backend - Contact Form
========================================== */

// Load environment variables
require("dotenv").config();

// Import packages
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");

// Initialize Express
const app = express();
app.use(helmet());
const PORT = process.env.PORT || 3000;

// Check Gmail credentials
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error("ERROR: Gmail credentials are missing from your .env file.");
  process.exit(1);
}

// Middleware
app.use(express.json({ limit: "10kb" }));

// Allow local VS Code Live Server
const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://localhost:5500",
  "http://127.0.0.1:5501",
  "http://localhost:5501"
];

app.use(cors({
  origin: allowedOrigins
}));
// Contact form rate limiter
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 5, // Maximum 5 submissions per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,

  message: {
    success: false,
    message: "Too many messages submitted. Please try again later."
  }
});
// Gmail transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Basic server route
app.get("/", (req, res) => {
  res.send("Alfie Gonzales Portfolio Backend is running!");
});

// Contact form route
app.post("/api/contact", contactLimiter, async (req, res) => {

  try {

    const { name, email, subject, message, website } = req.body || {};

    // Honeypot spam detection

    // Honeypot spam detection
    if (typeof website === "string" && website.trim() !== "") {
      return res.status(200).json({
        success: true,
        message: "Your message has been sent successfully!"
      });
    }

    // Check that all fields are strings
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {

      return res.status(400).json({
        success: false,
        message: "Please complete all required fields."
      });

    }

    // Remove unnecessary whitespace
    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanSubject = subject.trim().replace(/[\r\n]+/g, " ");
    const cleanMessage = message.trim();

    // Validate required fields
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage
    ) {

      return res.status(400).json({
        success: false,
        message: "Please complete all required fields."
      });

    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(cleanEmail) ||
      cleanName.length > 100 ||
      cleanEmail.length > 254 ||
      cleanSubject.length > 150 ||
      cleanMessage.length > 5000
    ) {

      return res.status(400).json({
        success: false,
        message: "Please provide valid contact information."
      });

    }

    // Send email to your Gmail inbox
    await transporter.sendMail({

      from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,

      replyTo: cleanEmail,

      to: process.env.EMAIL_USER,

      subject: `Portfolio Inquiry: ${cleanSubject}`,

      text: `
Name: ${cleanName}
Email: ${cleanEmail}
Subject: ${cleanSubject}

Message:
${cleanMessage}
      `

    });

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully!"
    });

  } catch (error) {

    // Keep technical details in the backend terminal
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,

      message: "Unable to send your message. Please try again later."
    });

  }

});

// Start server
app.listen(PORT, () => {
  console.log(`Portfolio backend running at http://localhost:${PORT}`);
});
