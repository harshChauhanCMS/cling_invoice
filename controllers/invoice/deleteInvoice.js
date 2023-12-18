const { customErrorMessages } = require('../../utils/helpers');
const InvoiceModel = require('../../model/invoiceModel');

const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceResponse = await InvoiceModel.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: 'Invoice generated', invoiceResponse });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = deleteInvoice;
