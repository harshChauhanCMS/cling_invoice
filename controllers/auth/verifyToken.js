const admin = require('firebase-admin');
const { customErrorMessages } = require('../../utils/helpers');
const authValidation = require('../../validations/authValidation');

const verifyToken = async (req, res) => {
  try {
    await authValidation.VerifyToken.validateAsync(req.body);
    const { token } = req.body;
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email } = decodedToken;
    res.status(200).json({ message: 'Token is valid', uid, email });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = verifyToken;
