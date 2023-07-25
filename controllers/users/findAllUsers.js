const Users = require('../../model/usersModel');
const { customErrorMessages } = require('../../utils/helpers');

const findAllUsers = async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully',
      data: user,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = findAllUsers;
