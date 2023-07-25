const Distributors = require('../../model/distributorsModel');
const { customErrorMessages } = require('../../utils/helpers');
const distributorValidation = require('../../validations/distributorValidation');

const addDistributor = async (req, res) => {
  try {
    await distributorValidation.Create.validateAsync(req.body);
    const data = req.body;
    const distributor = await Distributors.create(data);
    res.status(200).json({
      success: true,
      message: 'Distributor added successfully',
      data: distributor,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addDistributor;
