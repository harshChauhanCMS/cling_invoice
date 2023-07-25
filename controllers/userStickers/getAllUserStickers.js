const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userStickersValidation = require('../../validations/userStickersValidation');

const getAllUserStickers = async (req, res) => {
  try {
    await userStickersValidation.GetAll.validateAsync(req.body);
    const userStickers = await UserStickers.find({
      user_id: req.body.user_id,
      is_deleted: false,
    });
    res.status(200).json({
      success: true,
      message: 'User stickers fetched successfully',
      data: userStickers,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getAllUserStickers;
