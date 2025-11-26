// netlify/functions/send_mail.js
import nodemailer from "nodemailer";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  // Use Gmail SMTP (App Password recommended)
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "justinian.segundo1@gmail.com",
      pass: "xnzb loac utur nlnh", // generate an App Password for Gmail
    },
  });

  try {
    await transporter.sendMail({
      from: "your-email@gmail.com",
      to: "your-email@gmail.com",
      replyTo: email,
      subject: subject || "New message from portfolio",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return {
      statusCode: 200,
      body: "success",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
}
