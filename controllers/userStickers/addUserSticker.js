const Stickers = require('../../model/stickersModel');
const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userStickersValidation = require('../../validations/userStickersValidation');

const addUserSticker = async (req, res) => {
  try {
    const data = req.body;
    await userStickersValidation.Create.validateAsync(data);

    // Check if sticker is active
    const stickerActive = await Stickers.findOne({
      _id: data.sticker_id,
      is_active: true,
    });

    if (stickerActive) {
      return res.status(400).json({
        success: false,
        message: 'Sticker is already active',
      });
    }

    // Check if sticker already exists with the same user id
    const userStickerExists = await UserStickers.findOne({
      user_id: data.user_id,
      sticker_id: data.sticker_id,
    });

    if (userStickerExists) {
      return res.status(400).json({
        success: false,
        message: 'User sticker already exists',
      });
    }

    const userStickers = await UserStickers.create(req.body);
    res.status(200).json({
      success: true,
      message: 'User sticker created successfully',
      data: userStickers,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addUserSticker;
