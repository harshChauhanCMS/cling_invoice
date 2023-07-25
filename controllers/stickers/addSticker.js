const Stickers = require('../../model/stickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const stickerValidation = require('../../validations/stickerValidation');

const addSticker = async (req, res) => {
  try {
    await stickerValidation.Create.validateAsync(req.body);
    const data = req.body;
    const sticker = await Stickers.create(data);
    res.status(200).json({
      success: true,
      message: 'Sticker added successfully',
      data: sticker,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addSticker;
