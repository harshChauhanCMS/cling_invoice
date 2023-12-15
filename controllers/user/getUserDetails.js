const { customErrorMessages } = require('../../utils/helpers');
const UserModel = require('../../model/user');

const getUserData = async (req, res) => {
  try {
    const { id } = req;

    const userDataResponse = await UserModel.findById(id, {
      password: 0,
      __v: 0,
    });

    return res.status(200).json({
      success: true,
      message: 'User data retrieved successfully',
      userDataResponse,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getUserData;
