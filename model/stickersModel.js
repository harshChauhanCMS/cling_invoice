const mongoose = require('mongoose');
const { Schema } = mongoose;

const stickersSchema = new Schema(
  {
    sticker_id: { type: String, required: true },
    distributor_id: { type: String, required: true },
    is_active: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Stickers = mongoose.model('stickers', stickersSchema);

module.exports = Stickers;
