const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userRemindersValidation = require('../../validations/userRemindersValidation');

const deleteUserReminder = async (req, res) => {
  try {
    await userRemindersValidation.Delete.validateAsync(req.body);
    const { _id } = req.body;
    const userReminders = await UserReminders.findByIdAndDelete(_id);
    res.status(200).json({
      success: true,
      message: 'User reminders deleted successfully',
      data: userReminders,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = deleteUserReminder;
