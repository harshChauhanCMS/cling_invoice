const Users = require('../../model/usersModel');
const { customErrorMessages } = require('../../utils/helpers');
const userValidation = require('../../validations/userValidation');

const updateUser = async (req, res) => {
  try {
    await userValidation.Update.validateAsync(req.body);
    const { id, ...rest } = req.body;
    const user = await Users.findByIdAndUpdate({ _id: id }, rest, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = updateUser;
