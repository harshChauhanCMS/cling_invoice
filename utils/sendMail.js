const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, message }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: message,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const res = await transporter.sendMail(mailOptions);

    return res;
  } catch (error) {
    return false;
  }
};

module.exports = sendMail;
