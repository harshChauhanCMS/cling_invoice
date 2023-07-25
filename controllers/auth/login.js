const jwt = require('jsonwebtoken');
const moment = require('moment');
const { customErrorMessages } = require('../../utils/helpers');
const authValidation = require('../../validations/authValidation');
const Users = require('../../model/usersModel');

const login = async (req, res) => {
  try {
    await authValidation.Login.validateAsync(req.body);
    const { phone_number, country_code = '+91' } = req.body;

    const currentTime = new Date().getTime();
    const expiryTime = new Date(
      moment(currentTime).add(1, 'days').toISOString()
    ).getTime();

    const user = await Users.findOne({
      phone_number: phone_number,
      country_code: country_code,
    });

    if (!user) {
      const newUser = await Users.create({
        phone_number: phone_number,
        country_code: country_code,
      });
      const token = jwt.sign(
        {
          _id: newUser?._id,
          phone_number: newUser?.phone_number,
          expiry: expiryTime,
        },
        process.env.JWT_SECRET
      );
      const refreshToken = jwt.sign(
        { _id: user?._id, phone_number: user?.phone_number },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        message: 'Login Successful',
        success: true,
        token,
        refreshToken,
      });
    }

    const token = jwt.sign(
      { _id: user?._id, phone_number: user?.phone_number, expiry: expiryTime },
      process.env.JWT_SECRET
    );
    const refreshToken = jwt.sign(
      { _id: user?._id, phone_number: user?.phone_number },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      message: 'Login Successful',
      success: true,
      token,
      refreshToken,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = login;
