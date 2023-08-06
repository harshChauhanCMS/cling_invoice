const { Joi } = require('celebrate');

const authValidation = {
  Login: Joi.object().keys({
    phone_number: Joi.string().required(),
    country_code: Joi.string(),
    // token: Joi.string().required(),
  }),
  VerifyToken: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = authValidation;
