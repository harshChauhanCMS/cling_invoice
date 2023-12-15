const bcrypt = require('bcrypt');
const UserModel = require('../../model/user');
const { customErrorMessages } = require('../../utils/helpers');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const newPassword = await bcrypt.hash(
      password,
      Number(process.env.BCRYPT_SALT_ROUNDS)
    );

    const newUser = await UserModel.create({ email, password: newPassword });

    return res
      .status(200)
      .json({ success: true, message: 'Register Successful', newUser });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = register;
