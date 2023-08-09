const { Joi } = require('celebrate');

const userValidation = {
  Update: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().email(),
    country_code: Joi.string(),
    blood_group: Joi.string(),
    emergency_contacts: Joi.array().items(
      Joi.object().keys({
        relation: Joi.string(),
        phone_number: Joi.string(),
      })
    ),

    fcm_token: Joi.string(),
    gender: Joi.string(),
    notification_preferences: Joi.object().keys({
      sound_type: Joi.string().valid('long', 'short'),
      allowed: Joi.boolean(),
    }),
  }),
  Notify: Joi.object().keys({
    sticker_id: Joi.number().required(),
    reason: Joi.string(),
  }),
};

module.exports = userValidation;
