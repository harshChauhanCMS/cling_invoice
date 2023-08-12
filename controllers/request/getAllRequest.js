const Request = require('../../model/requestModel');
const { customErrorMessages } = require('../../utils/helpers');

const getAllRequest = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status } = req.query;

    const totalRequests = await Request.countDocuments();
    const totalPages = Math.ceil(totalRequests / limit);

    const requests = await Request.find({ status })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      success: true,
      message: 'Request fetched successfully',
      data: requests,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
        totalRequests: totalRequests,
      },
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getAllRequest;
