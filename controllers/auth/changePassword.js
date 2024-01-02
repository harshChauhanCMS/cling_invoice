const bcrypt = require('bcrypt');
const UserModel = require('../../model/user');
const { customErrorMessages } = require('../../utils/helpers');
const authValidation = require('../../validations/authValidation');

const changePassword = async (req, res) => {
  try {
    await authValidation.changePassword.validateAsync(req.body);
    const { old_password, new_password } = req.body;
    const { id } = req;

    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(400).json({ success: false, message: 'No user found' });
    }

    const passwordMatch = await bcrypt.compare(old_password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    const newHashedPassword = await bcrypt.hash(
      new_password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        password: newHashedPassword,
        is_password_reset: true,
      },
      {
        new: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Password updated Successful',
      updatedUser,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = changePassword;
