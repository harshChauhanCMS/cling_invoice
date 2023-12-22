const { customErrorMessages } = require('../../utils/helpers');
const UserModel = require('../../model/user');

const getEmployees = async (req, res) => {
  try {
    const userDataResponse = await UserModel.find({ role: 'user' })
      .select('-password')
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      userDataResponse,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getEmployees;
