const { customErrorMessages } = require('../../utils/helpers');
const InvoiceModel = require('../../model/invoiceModel');

const getSingleInvoice = async (req, res) => {
  const { id } = req.params;
  const invoice = await InvoiceModel.findById(id);

  try {
    res
      .status(200)
      .json({ success: true, message: 'Invoice fetched successful', invoice });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = getSingleInvoice;
