const { Joi } = require('celebrate');

const stickerValidation = {
  Create: Joi.object().keys({
    distributor_id: Joi.string(),
    status: Joi.string().valid('created', 'active').default('created'),
  }),
  Get: Joi.object().keys({
    sticker_id: Joi.number().required(),
  }),
};

module.exports = stickerValidation;
