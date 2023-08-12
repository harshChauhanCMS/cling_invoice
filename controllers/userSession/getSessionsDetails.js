const userSessions = require('../../model/userSessions');
const user = require('../../model/usersModel');
const sessionValidations = require('../../validations/sessionValidations');
const { customErrorMessages } = require('../../utils/helpers');

const getSessionsDetails = async (req, res) => {
  try {
    await sessionValidations.getSessionsDetails.validateAsync(req.body);
    const { _id } = req.body;
    const session = await userSessions.findById(_id);
    if (session.is_active) {
      const userDetails = await user.findById(session.user_id);
      return res.status(200).json({
        success: true,
        message: 'Sessions fetched successfully',
        data: {
          session,
          user: userDetails,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Session is not active',
      });
    }
  } catch (error) {
    const status = error.isJoi ? 422 : 400;
    const message = customErrorMessages(error);
    res.status(status).json({
      success: false,
      message,
    });
  }
};

module.exports = getSessionsDetails;
