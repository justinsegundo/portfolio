// netlify/functions/send_mail.js
const nodemailer = require("nodemailer");

exports.handler = async function(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { name, email, subject, message } = JSON.parse(event.body);

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "justinian.segundo1@gmail.com",
      pass: "ilep drts ldqd zjll", // use Gmail App Password
    },
  });
  
  try {
    await transporter.sendMail({
      from: "justinian.segundo1@gmail.com",
      to: "justinian.segundo1@gmail.com",
      replyTo: email,
      subject: subject || "New message from portfolio",
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return { statusCode: 200, body: "success" };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};
