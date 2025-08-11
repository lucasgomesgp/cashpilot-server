import SMTPTransport from "nodemailer/lib/smtp-transport";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: process.env.PORT,
  secure: false,
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);
