const { Joi } = require('celebrate');

const authValidation = {
  Login: Joi.object().keys({
    phone_number: Joi.string().required(),
    country_code: Joi.string(),
  }),
};

module.exports = authValidation;
