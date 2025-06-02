/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-lines */
const moment = require('moment');
const { customErrorMessages } = require('../../utils/helpers');
const sendMail = require('../../utils/sendMail');
const InvoiceModel = require('../../model/invoiceModel');
const UserModel = require('../../model/user');

const invoice = async (req, res) => {
  console.log('invoice');
  try {
    const { id } = req.params;
    const { pdfData } = req.body;

    if (
      !pdfData ||
      !pdfData.startsWith('data:application/pdf;filename=generated.pdf;base64,')
    ) {
      throw new Error('Invalid PDF data format');
    }

    const invoiceDetails = await InvoiceModel.findById(id);
    const { manager_name } = await UserModel.findById(invoiceDetails.userId);

    if (!invoiceDetails) {
      throw new Error('Invoice not found');
    }

    if (!manager_name) {
      throw new Error('Add manager name to your profile');
    }

    const { name, email } = invoiceDetails;

    // Extract base64 data and convert to Buffer
    const base64Data = pdfData.split('base64,')[1];
    const pdfBuffer = Buffer.from(base64Data, 'base64');

    const attachments = [
      {
        filename: 'invoice.pdf',
        content: pdfBuffer,
        encoding: 'binary',
      },
    ];

    const today = new Date();
    today.setMonth(today.getMonth() - 1);

    const previousMonthName = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(today);
    const previousMonthYear = today.getFullYear();
    await sendMail({
      to: ['accounts@clinginfotech.com'],
      cc: [manager_name, email],
      subject: `#CLING-INVOICING-${previousMonthName}-${previousMonthYear}-${name}`,
      message: '',
      attachments: attachments,
    });

    await InvoiceModel.findByIdAndUpdate(id, { status: 'sent' });

    res.status(200).json({ success: true, message: 'Invoice generated' });
  } catch (error) {
    console.log(error);
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = invoice;
