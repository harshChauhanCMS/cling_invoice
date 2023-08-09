const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userRemindersValidation = require('../../validations/userRemindersValidation');

const addUserReminders = async (req, res) => {
  try {
    await userRemindersValidation.Create.validateAsync(req.body);
    const data = req.body;
    const userReminders = await UserReminders.create(data);
    res.status(200).json({
      success: true,
      message: 'User reminders added successfully',
      data: userReminders,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addUserReminders;
