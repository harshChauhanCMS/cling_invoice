const { customErrorMessages } = require('../../utils/helpers');
const userDetailsValidation = require('../../validations/userDetailsValidation');
const UserModel = require('../../model/user');

const addUserData = async (req, res) => {
  try {
    await userDetailsValidation.UserData.validateAsync(req.body);
    const { id } = req;

    const userDataResponse = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res
      .status(200)
      .json({ success: true, message: 'User data added', userDataResponse });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addUserData;
