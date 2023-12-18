const { customErrorMessages } = require('../../utils/helpers');
const InvoiceModel = require('../../model/invoiceModel');

const getInvoice = async (req, res) => {
  const { id } = req;
  const invoices = await InvoiceModel.find({ userId: id });
  try {
    res
      .status(200)
      .json({ success: true, message: 'Invoice fetched successful', invoices });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getInvoice;
