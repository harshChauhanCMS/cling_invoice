const mongoose = require('mongoose');
const { Schema } = mongoose;

const stickersSchema = new Schema(
  {
    distributor_id: { type: String, required: true },
    status: {
      type: String,
      enum: ['created', 'active'],
      default: 'created',
    },
  },
  {
    timestamps: true,
  }
);

const Stickers = mongoose.model('stickers', stickersSchema);

module.exports = Stickers;
