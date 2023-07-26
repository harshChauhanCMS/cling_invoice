const { Joi } = require('celebrate');

const stickerValidation = {
  Create: Joi.object().keys({
    distributor_id: Joi.string().required(),
    status: Joi.string().valid('created', 'active').default('created'),
  }),
};

module.exports = stickerValidation;
