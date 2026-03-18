
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
  console.log(to, subject, html);
  const mailOptions = {
    from: process.env.email,
    to,
    subject,
    html,
  };
  await transporter.sendMail(mailOptions);
};
