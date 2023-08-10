const { Joi } = require('celebrate');

const requestValidation = {
  Create: Joi.object().keys({
    phone_number: Joi.string().required(),
    is_contacted: Joi.boolean(),
    remarks: Joi.string().required(),
  }),
};

module.exports = requestValidation;
