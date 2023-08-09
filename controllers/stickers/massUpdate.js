const reader = require('xlsx');
const Stickers = require('../../model/stickersModel');
const {
  customErrorMessages,
  validateStickerArray,
  sanitizedStickerArray,
} = require('../../utils/helpers');

const massUpdate = async (req, res) => {
  try {
    const file = reader.read(req.files.stickers.data);
    const sheetName = file.SheetNames[0];
    const stickerArray = reader.utils.sheet_to_json(file.Sheets[sheetName]);
    validateStickerArray(stickerArray);
    const arrayToUpdate = sanitizedStickerArray(stickerArray);

    arrayToUpdate.forEach(async (stickerData) => {
      const { distributor_id } = stickerData;
      await Stickers.updateMany({ distributor_id }, { $set: stickerData });
    });
    res.status(200).json({ message: 'Stickers updated successfully.' });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = massUpdate;
