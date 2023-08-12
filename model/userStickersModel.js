const mongoose = require('mongoose');
const { Schema } = mongoose;

const userStickersSchema = new Schema(
  {
    sticker_id: { type: Number, required: true },
    user_id: { type: String, required: true },
    vehicle_number: { type: String },
    vehicle_make: { type: String },
    vehicle_name: { type: String },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    vehicle_type: { type: String },
  },
  {
    timestamps: true,
  }
);

const UserStickers = mongoose.model('userStickers', userStickersSchema);

module.exports = UserStickers;
