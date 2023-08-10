const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userValidation = require('../../validations/userValidation');

const searchUser = async (req, res) => {
  try {
    await userValidation.Search.validateAsync(req.body);
    const { vehicle_number } = req.query;

    const userAndStickerData = await UserStickers.aggregate([
      {
        $match: {
          vehicle_number: vehicle_number,
        },
      },
      {
        $addFields: {
          user_id_objectId: { $toObjectId: '$user_id' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id_objectId',
          foreignField: '_id',
          as: 'user_data',
        },
      },
      {
        $unwind: '$user_data',
      },
      {
        $project: {
          user_id_objectId: 0,
          user_data: {
            fcm_token: 0,
          },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      message: 'User and sticker details fetched successfully',
      data: userAndStickerData,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = searchUser;
