const { Joi } = require('celebrate');

const authValidation = {
  changePassword: Joi.object().keys({
    old_password: Joi.string().required(),
    new_password: Joi.string().required(),
  }),
};

module.exports = authValidation;
