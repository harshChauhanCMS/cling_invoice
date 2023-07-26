const { Joi } = require('celebrate');

const distributorValidation = {
  Create: Joi.object().keys({
    name: Joi.string().required(),
    phone_number: Joi.string().required(),
    address: Joi.string().required(),
    location: Joi.object().keys({
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
    }),
  }),
};

module.exports = distributorValidation;
