const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, sparse: true },
    phone_number: { type: String, required: true },
    country_code: { type: String, default: '+91' },
    blood_group: { type: String },
    emergency_contacts: [{ type: String }],
    fcm_token: { type: String },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('users', usersSchema);

module.exports = Users;
