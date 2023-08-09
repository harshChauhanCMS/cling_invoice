const mongoose = require('mongoose');
const { Schema } = mongoose;

const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
    required: true,
  },
});

const distributorsSchema = new Schema(
  {
    name: { type: String, required: true },
    phone_number: { type: String, required: true },
    address: { type: String, required: true },
    location: {
      type: pointSchema,
      required: true,
      index: '2dsphere',
    },
    total_quantity: { type: Number, default: 0 },
    sold_quantity: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Distributors = mongoose.model('distributors', distributorsSchema);

module.exports = Distributors;
