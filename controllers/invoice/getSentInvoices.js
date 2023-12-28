const { customErrorMessages } = require('../../utils/helpers');
const InvoiceModel = require('../../model/invoiceModel');

const getSentInvoices = async (req, res) => {
  const { id } = req.params;
  const { monthYear } = req.query;
  const { role } = req;

  if (role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  const [year, month] = monthYear.split('-');

  try {
    if (!year || !month) {
      const invoices = await InvoiceModel.find({
        userId: id,
        status: 'sent',
      }).sort({
        date: -1,
      });
      res.status(200).json({
        success: true,
        message: 'Sent Invoice fetched successfully',
        invoices,
      });
    } else {
      const invoices = await InvoiceModel.aggregate([
        {
          $match: {
            userId: id,
            status: 'sent',
            $expr: {
              $and: [
                { $eq: [{ $year: '$date' }, parseInt(year)] },
                { $eq: [{ $month: '$date' }, parseInt(month)] },
              ],
            },
          },
        },
        {
          $sort: {
            date: -1,
          },
        },
      ]);
      res.status(200).json({
        success: true,
        message: 'Sent Invoice fetched successfully',
        invoices,
      });
    }
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getSentInvoices;
