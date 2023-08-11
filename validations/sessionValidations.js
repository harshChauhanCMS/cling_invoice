const { Joi } = require('celebrate');

const sessionValidations = {
  getSessionsDetails: Joi.object().keys({
    _id: Joi.string().required(),
  }),
};

module.exports = sessionValidations;
