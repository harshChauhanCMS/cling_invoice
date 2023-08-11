const Stickers = require('../../model/stickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const stickerValidation = require('../../validations/stickerValidation');

const getSticker = async (req, res) => {
  try {
    await stickerValidation.Get.validateAsync(req.body);
    const { sticker_id } = req.body;

    const stickerDetails = await Stickers.aggregate([
      { $match: { _id: sticker_id } },
      {
        $lookup: {
          from: 'userstickers',
          localField: '_id',
          foreignField: 'sticker_id',
          as: 'user_stickers',
        },
      },
      {
        $unwind: '$user_stickers',
      },
      {
        $project: {
          vehicle_number: 1,
          vehicle_make: 1,
          vehicle_name: 1,
          sticker_id: 1,
          user_stickers: 1,
        },
      },
    ]);

    if (stickerDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Sticker not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sticker fetched successfully',
      data: stickerDetails[0],
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getSticker;
