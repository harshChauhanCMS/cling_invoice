const mongoose = require('mongoose');
const { Schema } = mongoose;

const userStickersSchema = new Schema(
  {
    sticker_id: { type: String, required: true },
    user_id: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    vehicle_make: { type: String, required: true },
    vehicle_name: { type: String, required: true },
    is_deleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const UserStickers = mongoose.model('userStickers', userStickersSchema);

module.exports = UserStickers;
