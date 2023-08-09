const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userRemindersValidation = require('../../validations/userRemindersValidation');

const getUpcomingReminder = async (req, res) => {
  try {
    await userRemindersValidation.getUpcomingReminder.validateAsync(req.body);
    const { user_id } = req.body;
    const currentDate = new Date();
    const upcomingReminders = await UserReminders.find({
      user_id: user_id,
      reminder_date: { $gt: currentDate },
    });

    res.status(200).json({
      success: true,
      message: 'Upcoming reminders fetched successfully',
      data: upcomingReminders,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getUpcomingReminder;
