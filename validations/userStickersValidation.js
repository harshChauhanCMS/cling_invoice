const { Joi } = require('celebrate');

const userStickersValidation = {
  GetAll: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
};

module.exports = userStickersValidation;
