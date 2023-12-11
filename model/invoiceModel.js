const mongoose = require('mongoose');

const invoiceModel = new mongoose.Schema(
  {
    account_holder_name: {
      type: String,
      required: true,
    },
    account_number: {
      type: String,
      required: true,
    },
    account_type: {
      type: String,
    },
    amounts: [
      {
        description: {
          type: String,
          required: true,
        },
        amount: {
          type: String,
          required: true,
        },
      },
    ],
    bank_name: {
      type: String,
      required: true,
    },
    branch_name: {
      type: String,
    },
    date: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    ifsc_code: {
      type: String,
    },
    invoice_number: {
      type: String,
      required: true,
    },
    mobile_no: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    pan_number: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const InvoiceModel = mongoose.model('invoiceModel', invoiceModel);

module.exports = InvoiceModel;
