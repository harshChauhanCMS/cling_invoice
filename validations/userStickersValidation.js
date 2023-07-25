const { Joi } = require('celebrate');

const userStickersValidation = {
  GetAll: Joi.object().keys({
    user_id: Joi.string().required(),
  }),
  Create: Joi.object().keys({
    user_id: Joi.string().required(),
    sticker_id: Joi.string().required(),
    vehicle_number: Joi.string(),
    vehicle_make: Joi.string(),
    vehicle_name: Joi.string(),
  }),
  Update: Joi.object().keys({
    _id: Joi.string().required(),
    vehicle_make: Joi.string(),
    vehicle_name: Joi.string(),
    vehicle_number: Joi.string(),
    is_deleted: Joi.boolean(),
  }),
};

module.exports = userStickersValidation;
