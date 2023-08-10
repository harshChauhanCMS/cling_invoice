const Request = require('../../model/requestModel');
const { customErrorMessages } = require('../../utils/helpers');
const requestValidation = require('../../validations/requestValidation');

const addRequest = async (req, res) => {
  try {
    await requestValidation.Create.validateAsync(req.body);
    const { phone_number } = req.body;
    const sticker = await Request.updateOne(
      { phone_number },
      { $set: req.body },
      { upsert: true }
    );
    res.status(200).json({
      success: true,
      message: 'Request added successfully',
      data: sticker,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addRequest;
