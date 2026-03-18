import nodemailer from "nodemailer";
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

export const sendOrderConfirmationEmail = async (to, subject, html) => {
  if (!to || !subject || !html) throw { statusCode: 400, message: "Email parameters missing" };

  const mailOptions = {
    from: process.env.email,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Failed to send email:", error.message);
    throw { statusCode: 500, message: "Failed to send email" };
  }
};