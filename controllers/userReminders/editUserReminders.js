const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userRemindersValidation = require('../../validations/userRemindersValidation');

const editUserReminders = async (req, res) => {
  try {
    await userRemindersValidation.Update.validateAsync(req.body);
    const { id, ...rest } = req.body;
    const userReminders = await UserReminders.findByIdAndUpdate(id, rest, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'User reminders updated successfully',
      data: userReminders,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = editUserReminders;
