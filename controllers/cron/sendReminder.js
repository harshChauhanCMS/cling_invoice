// /* eslint-disable no-console */
// const UserReminders = require('../../model/userRemindersModel');
// const { customErrorMessages } = require('../../utils/helpers');
// const { sendPushNotification } = require('../../utils/sendPushNotification');

// const sendReminder = async () => {
//   try {
//     const currentDate = new Date();
//     const upcomingReminders = await UserReminders.find({
//       expire_date: { $gt: currentDate },
//     });

//     const response = await sendPushNotification({
//       title: 'Test title',
//       body: 'You have a new notification',
//       token: user?.fcm_token,
//     });
//     if (response) {
//       console.log(response.message);
//     } else {
//       console.log('Unable to send notification');
//     }
//   } catch (error) {
//     const message = customErrorMessages(error);
//     console.log(message);
//   }
// };

// module.exports = sendReminder;
