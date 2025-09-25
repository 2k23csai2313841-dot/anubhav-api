// backend/server.js
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/debug-env", (req, res) => {
  res.json({
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  });
});

// API endpoint
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res.json({ success: false, error: "Missing required fields" });
  }

  try {
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Use true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});



    await transporter.sendMail({
      from: `"Anubhav API" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text: message.replace(/<[^>]+>/g, ""),
      html:  message,
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (err) {
    console.error(err);
    res.json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ ${process.env.EMAIL_PASS} Anubhav Mail API running on port ${PORT}`)
);











