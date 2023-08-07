const UserReminders = require('../../model/userRemindersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userRemindersValidation = require('../../validations/userRemindersValidation');

const getUserReminders = async (req, res) => {
  try {
    await userRemindersValidation.Get.validateAsync(req.body);
    const { sticker_id } = req.body;
    const userReminders = await UserReminders.find({ sticker_id });
    res.status(200).json({
      success: true,
      message: 'User reminders fetched successfully',
      data: userReminders,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getUserReminders;
