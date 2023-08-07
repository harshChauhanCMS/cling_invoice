const UserSticker = require('../../model/userStickersModel');
const Users = require('../../model/usersModel');
const { customErrorMessages } = require('../../utils/helpers');
const { sendPushNotification } = require('../../utils/sendPushNotification');
const userValidation = require('../../validations/userValidation');

const notifyUser = async (req, res) => {
  try {
    await userValidation.Notify.validateAsync(req.body);
    const { stiker_id, reason } = req.body;
    const stiker = await UserSticker.findOne({ stiker_id });

    if (stiker?.status === 'deleted') {
      res.status(400).json({
        success: false,
        message: 'Sticker is not active',
      });
    }

    if (stiker) {
      const user = await Users.findById(stiker?.user_id);
      const response = await sendPushNotification({
        title: reason || 'Someone is at your vehicle',
        body: 'You have a new notification',
        token: user?.fcm_token,
      });
      if (response) {
        res.status(200).json({
          success: true,
          message: response.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Unable to send notification',
        });
      }
    } else {
      res.status(404).json({
        success: false,
        message: 'Sticker not found',
      });
    }
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = notifyUser;
