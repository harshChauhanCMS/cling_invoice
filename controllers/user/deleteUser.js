const { customErrorMessages } = require('../../utils/helpers');
const UserModel = require('../../model/user');

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDataResponse = await UserModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      userDataResponse,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = deleteUser;
