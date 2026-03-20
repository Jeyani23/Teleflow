import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Teleflow Support" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });

    console.log(`📧 Email sent to ${to} successfully!`);
  } catch (err) {
    console.error("❌ Failed to send email:", err.message);
    throw err;
  }
};