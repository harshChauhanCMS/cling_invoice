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
    bank_name: {
      type: String,
    },
    branch_name: {
      type: String,
    },
    ifsc_code: {
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
    nid_number: {
      type: String,
    },
    manager_name: {
      type: String,
    },
    is_password_reset: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('userModel', userModel);

module.exports = UserModel;
