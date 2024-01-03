const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../../model/user');
const { customErrorMessages } = require('../../utils/helpers');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }

    // If user found, check if password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
    }
    const { _id: userId, role } = user;

    const accessToken = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res
      .status(200)
      .json({ success: true, message: 'Login Successful', accessToken });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = login;
