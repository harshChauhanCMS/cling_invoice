const jwt = require('jsonwebtoken');
const moment = require('moment');
const { customErrorMessages } = require('../../utils/helpers');
const authValidation = require('../../validations/authValidation');
const Users = require('../../model/usersModel');
const sendMail = require('../../utils/sendMail');
const UserSessions = require('../../model/userSessions');
// const { verfiyToken } = require('../../utils/sendPushNotification');

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
      const session = await UserSessions.create({
        user_id: newUser?._id,
        is_active: true,
      });
      const jwtToken = jwt.sign(
        {
          _id: newUser?._id,
          phone_number: newUser?.phone_number,
          expiry: expiryTime,
          session_id: session?._id,
        },
        process.env.JWT_SECRET
      );
      const refreshToken = jwt.sign(
        {
          _id: user?._id,
          phone_number: user?.phone_number,
          session_id: session?._id,
        },
        process.env.JWT_SECRET
      );
      return res.status(200).json({
        message: 'Login Successful',
        success: true,
        token: jwtToken,
        refreshToken,
        user: newUser,
      });
    }
    const previousSession = await UserSessions.findOne({
      user_id: user?._id,
      is_active: true,
    });
    if (previousSession) {
      await UserSessions.findByIdAndUpdate(previousSession?._id, {
        is_active: false,
      });
    }
    const session = await UserSessions.create({
      user_id: user?._id,
      is_active: true,
    });

    const jwtToken = jwt.sign(
      {
        _id: user?._id,
        phone_number: user?.phone_number,
        expiry: expiryTime,
        session_id: session?._id,
      },
      process.env.JWT_SECRET
    );
    const refreshToken = jwt.sign(
      { _id: user?._id, phone_number: user?.phone_number },
      process.env.JWT_SECRET
    );
    if (user?.email) {
      sendMail({
        to: user?.email,
        subject: 'Login Successful',
        message: 'You have successfully logged in to your account',
      });
    }

    return res.status(200).json({
      message: 'Login Successful',
      success: true,
      token: jwtToken,
      refreshToken,
      user,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = login;
