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
    emergency_contacts: [{ type: String }],
    fcm_token: { type: String },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model('users', usersSchema);
// usersSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = Users;
