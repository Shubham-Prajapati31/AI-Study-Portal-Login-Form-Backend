// services/emailService.js
import { configDotenv } from "dotenv";
import nodemailer from "nodemailer";
configDotenv();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send OTP email
 * @param {string} to - recipient email
 * @param {string} otp - one time password
 */
export const sendEmail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"Your App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <b>${otp}</b>. It will expire in 5 minutes.</p>`,
    });
    console.log("OTP Email sent to:", to);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send OTP email");
  }
};
