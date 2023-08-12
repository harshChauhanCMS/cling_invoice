const mongoose = require('mongoose');
const { Schema } = mongoose;

const requestSchema = new Schema(
  {
    phone_number: { type: String },
    status: {
      type: String,
      enum: ['requested', 'contacted', 'converted'],
      default: 'requested',
    },
    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model('request', requestSchema);

module.exports = Request;
