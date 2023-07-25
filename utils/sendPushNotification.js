const sendPushNotification = (fcm_token) => {
  const token = fcm_token;
  const message = 'Push Notification Sent Successfully';
  return { token, message };
};

module.exports = sendPushNotification;
