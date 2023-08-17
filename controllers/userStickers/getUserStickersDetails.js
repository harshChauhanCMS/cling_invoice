const UserStickers = require('../../model/userStickersModel');
const { customErrorMessages } = require('../../utils/helpers');

const getUserStickersDetails = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      sortField = 'createdAt',
      sortOrder = 'desc',
    } = req.query;

    const pageNumber = parseInt(page);
    const pageSize = parseInt(limit);

    const skip = (pageNumber - 1) * pageSize;

    const sort = {};
    sort[sortField] = sortOrder === 'desc' ? -1 : 1;

    const pipeline = [
      {
        $addFields: {
          user_id: { $toObjectId: '$user_id' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },

      {
        $sort: sort,
      },
      {
        $skip: skip,
      },
      {
        $limit: pageSize,
      },
    ];

    const result = await UserStickers.aggregate(pipeline);

    res.status(200).json({
      success: true,
      message: 'User stickers fetched successfully',
      data: result,
    });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getUserStickersDetails;
