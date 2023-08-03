const admin = require('firebase-admin');
const serviceAccount = require('../vahansetu-firebase-adminsdk.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const sendPushNotification = async ({ title, body, token }) => {
  try {
    const res = admin
      .messaging()
      .send({
        notification: {
          title,
          body,
        },
        token,
      })
      .then((response) => response)
      .catch((error) => error);
    return res;
  } catch (error) {
    return false;
  }
};

module.exports = sendPushNotification;
