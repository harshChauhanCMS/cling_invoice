const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userStickersValidation = require('../../validations/userStickersValidation');

const updateUserSticker = async (req, res) => {
  try {
    const data = req.body;
    await userStickersValidation.Update.validateAsync(data);
    const userSticker = await UserStickers.findOneAndUpdate(
      { _id: data._id },
      data
    );

    res.status(200).json({
      success: true,
      message: 'User sticker updated successfully',
      data: userSticker,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = updateUserSticker;
