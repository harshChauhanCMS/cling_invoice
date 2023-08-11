const mongoose = require('mongoose');

const userSessionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    fcm_token: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const UserSessions = mongoose.model('user_sessions', userSessionsSchema);

module.exports = UserSessions;
