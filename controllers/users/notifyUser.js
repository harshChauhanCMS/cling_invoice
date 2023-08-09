const UserSticker = require('../../model/userStickersModel');
const Users = require('../../model/usersModel');
const { customErrorMessages } = require('../../utils/helpers');
const sendMail = require('../../utils/sendMail');
const { sendPushNotification } = require('../../utils/sendPushNotification');
const userValidation = require('../../validations/userValidation');

const notifyUser = async (req, res) => {
  try {
    await userValidation.Notify.validateAsync(req.body);
    const { sticker_id, reason } = req.body;
    const sticker = await UserSticker.findOne({ sticker_id });

    if (sticker?.status === 'deleted') {
      res.status(400).json({
        success: false,
        message: 'Sticker is not active',
      });
    }

    if (sticker) {
      const user = await Users.findById(sticker?.user_id);
      if (
        user?.notification_preferences &&
        user?.notification_preferences.allowed
      ) {
        const response = await sendPushNotification({
          title: reason || 'Someone is at your vehicle',
          body: 'You have a new notification',
          token: user?.fcm_token,
          sound_type: user?.notification_preferences?.sound_type || 'short',
        });
        if (user?.email) {
          await sendMail({
            to: user?.email,
            subject: reason || 'Someone is at your vehicle',
            message: 'You have a new notification',
          });
        }
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
        res.status(400).json({
          success: false,
          message: 'Cannot send nottification to this user',
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
