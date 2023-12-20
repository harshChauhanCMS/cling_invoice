const { customErrorMessages } = require('../../utils/helpers');
const invoiceValidation = require('../../validations/invoiceValidation');
const InvoiceModel = require('../../model/invoiceModel');

const addInvoice = async (req, res) => {
  try {
    await invoiceValidation.invoice.validateAsync(req.body);
    const { id } = req;
    req.body.userId = id;
    const invoiceResponse = await InvoiceModel.create(req.body);
    res
      .status(200)
      .json({ success: true, message: 'Invoice generated', invoiceResponse });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = addInvoice;
