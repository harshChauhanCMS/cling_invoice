const { Joi } = require('celebrate');

const userValidation = {
  Update: Joi.object().keys({
    id: Joi.string().required(),
    name: Joi.string(),
    email: Joi.string().email(),
    country_code: Joi.string(),
    blood_group: Joi.string(),
    emergency_contacts: Joi.array().items(Joi.string()),
    fcm_token: Joi.string(),
  }),
  Notify: Joi.object().keys({
    user_id: Joi.string().required(),
    sticker_id: Joi.string().required(),
  }),
};

module.exports = userValidation;
