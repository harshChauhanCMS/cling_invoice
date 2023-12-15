const mongoose = require('mongoose');

const userModel = new mongoose.Schema(
  {
    account_holder_name: {
      type: String,
    },
    account_number: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    account_type: {
      type: String,
    },
    amounts: [
      {
        description: {
          type: String,
        },
        amount: {
          type: String,
        },
      },
    ],
    bank_name: {
      type: String,
    },
    branch_name: {
      type: String,
    },
    date: {
      type: String,
    },
    ifsc_code: {
      type: String,
    },
    invoice_number: {
      type: String,
    },
    mobile_no: {
      type: String,
    },
    name: {
      type: String,
    },
    pan_number: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('userModel', userModel);

module.exports = UserModel;
