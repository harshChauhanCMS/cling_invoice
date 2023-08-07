const mongoose = require('mongoose');
const { Schema } = mongoose;

const userRemindersSchema = new Schema(
  {
    sticker_id: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    title: { type: String, required: true },
    expire_date: { type: Date, required: true },
    days_before_expire: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const UserReminders = mongoose.model('userReminders', userRemindersSchema);

module.exports = UserReminders;
