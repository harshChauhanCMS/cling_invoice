const nodemailer = require('nodemailer');

const sendMail = async ({ to, subject, message, attachments }) => {
  try {
    const mailOptions = {
      from: 'invoices.clingmultisolutions@gmail.com',
      to: to,
      subject: subject,
      text: message,
      attachments: attachments,
    };

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      service: 'gmail',
      secure: true,
      auth: {
        user: 'invoices.clingmultisolutions@gmail.com',
        pass: 'kantpdawenemolim',
      },
    });

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    return false;
  }
};

module.exports = sendMail;
