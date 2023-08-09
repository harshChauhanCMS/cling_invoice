/* eslint-disable no-console */
const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const { sendPushNotification } = require('../../utils/sendPushNotification');

const sendReminder = async () => {
  try {
    const currentDate = new Date();
    const userReminders = await UserReminders.aggregate([
      {
        $addFields: {
          year: { $year: '$reminder_date' },
          month: { $month: '$reminder_date' },
          day: { $dayOfMonth: '$reminder_date' },
          user_id: { $toObjectId: '$user_id' },
        },
      },
      {
        $match: {
          year: currentDate.getFullYear(),
          month: currentDate.getMonth() + 1,
          day: currentDate.getDate(),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $addFields: {
          fcm_token: '$user.fcm_token',
          sound_type: '$user.notification_preferences.sound_type',
        },
      },
    ]);

    const notificationPromises = userReminders.map(async (reminder) => {
      try {
        const response = await sendPushNotification({
          title: 'Your test reminder',
          body: 'You have a new notification',
          token: reminder?.user?.fcm_token,
          sound_type: reminder?.user?.sound_type || 'short',
        });
        if (response) {
          return `Notification sent ${response}!`;
        } else {
          return 'Unable to send notification';
        }
      } catch (error) {
        return `Notification sending failed: ${error.message}`;
      }
    });

    const notificationResults = await Promise.all(notificationPromises);
    console.log(notificationResults);
  } catch (error) {
    const message = customErrorMessages(error);
    console.log(message);
  }
};

module.exports = sendReminder;
