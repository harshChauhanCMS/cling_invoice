const mongoose = require('mongoose');
// const AutoIncrement = require('../config/connection');
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    // id: { type: Number, unique: true, default: 1 },
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    phone_number: { type: String, required: true },
    country_code: { type: String, default: '+91' },
    blood_group: { type: String },
    emergency_contacts: [
      {
        relation: { type: String },
        phone_number: { type: String },
      },
    ],
    fcm_token: { type: String },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    notification_references: {
      sound_type: { type: String, enum: ['long', 'short'] },
      allowed: { type: Boolean, default: true },
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('users', usersSchema);
// usersSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Users;
