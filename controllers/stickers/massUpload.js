const reader = require('xlsx');
const Stickers = require('../../model/stickersModel');
const {
  customErrorMessages,
  sanitizedStickerArray,
  validateStickerArray,
} = require('../../utils/helpers');

const massUpload = async (req, res) => {
  try {
    const file = reader.read(req.files.stickers.data);
    const sheetName = file.SheetNames[0];
    const stickerArray = reader.utils.sheet_to_json(file.Sheets[sheetName]);
    validateStickerArray(stickerArray);
    const arrayToUpload = sanitizedStickerArray(stickerArray);
    await Stickers.insertMany(arrayToUpload);
    res.status(200).json({ arrayToUpload });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = massUpload;
