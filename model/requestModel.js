const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    phone_number: { type: String },
    is_contacted: { type: Boolean, default: false },
    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('request', requestSchema);

module.exports = Request;
