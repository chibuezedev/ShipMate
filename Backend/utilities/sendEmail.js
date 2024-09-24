const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async (to, subject, body) => {
  const transporterConfig = {
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_USER_EMAIL,
      pass: process.env.GOOGLE_USER_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(transporterConfig);

  let info = await transporter.sendMail({
    from: `"DelFe" <${process.env.GOOGLE_USER_EMAIL}>`,
    to: to,
    subject: subject,
    text: body,
  });

  console.log("Email sent: %s", info.messageId);
};

module.exports = sendEmail;
