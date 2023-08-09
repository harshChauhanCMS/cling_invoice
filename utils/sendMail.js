/* eslint-disable import/no-unresolved */
const AWS = require('aws-sdk');

const ses = new AWS.SES({
  region: 'ap-south-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

const sendMail = async ({ to, subject, message }) => {
  try {
    const res = await ses
      .sendEmail({
        Source: process.env.EMAIL,
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Text: {
              Data: message,
            },
          },
          Subject: {
            Data: subject,
          },
        },
      })
      .promise();
    return res;
  } catch (error) {
    return false;
  }
};

module.exports = sendMail;
