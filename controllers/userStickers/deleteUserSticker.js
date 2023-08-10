const Stickers = require('../../model/stickersModel');
const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userStickersValidation = require('../../validations/userStickersValidation');

const deleteUserSticker = async (req, res) => {
  try {
    await userStickersValidation.Delete.validateAsync(req.body);
    const { _id } = req.body;

    const userStickerInactive = await UserStickers.findOneAndUpdate(
      { _id },
      { status: 'inactive' },
      { new: true }
    );

    if (!userStickerInactive) {
      res.status(404).json({
        success: false,
        message: 'User sticker not found',
      });
    }

    const stickerInactive = await Stickers.findOneAndUpdate(
      { _id: userStickerInactive.sticker_id },
      { status: 'inactive' },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'User sticker deleted successfully',
      data: { userStickerInactive, stickerInactive },
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = deleteUserSticker;
