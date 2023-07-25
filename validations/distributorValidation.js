const { Joi } = require('celebrate');

const distributorValidation = {
  Create: Joi.object().keys({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    latitude: Joi.string().required(),
    longitude: Joi.string().required(),
  }),
};

module.exports = distributorValidation;
