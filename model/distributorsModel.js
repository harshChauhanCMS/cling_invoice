const mongoose = require('mongoose');
const { Schema } = mongoose;

const distributorsSchema = new Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Distributors = mongoose.model('distributors', distributorsSchema);

module.exports = Distributors;
