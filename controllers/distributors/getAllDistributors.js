const Distributors = require('../../model/distributorsModel');
const { customErrorMessages } = require('../../utils/helpers');

const getAllDistributors = async (req, res) => {
  try {
    const distributor = await Distributors.find();
    res.status(200).json({
      success: true,
      message: 'Distributor fetched successfully',
      data: distributor,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getAllDistributors;
