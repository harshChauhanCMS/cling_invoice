const Users = require('../../model/usersModel');
const { customErrorMessages } = require('../../utils/helpers');
const sendPushNotification = require('../../utils/sendPushNotification');
const userValidation = require('../../validations/userValidation');

const notifyUser = async (req, res) => {
  try {
    await userValidation.Notify.validateAsync(req.body);
    const { user_id } = req.body;
    const user = await Users.findById(user_id);
    const response = sendPushNotification(user.fcm_token);
    res.status(200).json({
      success: true,
      message: response.message,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = notifyUser;
