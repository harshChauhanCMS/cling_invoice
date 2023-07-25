const { Joi } = require('celebrate');

const stickerValidation = {
  Create: Joi.object().keys({
    sticker_id: Joi.string().required(),
    distributor_id: Joi.string().required(),
    is_active: Joi.boolean(),
  }),
};

module.exports = stickerValidation;
