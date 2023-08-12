const { Joi } = require('celebrate');

const userStickersValidation = {
  GetAll: Joi.object().keys({
    // user_id: Joi.string().required(),
    status: Joi.string().valid('active', 'inactive'),
  }),
  Create: Joi.object().keys({
    user_id: Joi.string().required(),
    sticker_id: Joi.number().required(),
    vehicle_number: Joi.string(),
    vehicle_make: Joi.string(),
    vehicle_name: Joi.string(),
    vehicle_type: Joi.string(),
  }),
  Update: Joi.object().keys({
    _id: Joi.string().required(),
    vehicle_make: Joi.string(),
    vehicle_name: Joi.string(),
    vehicle_number: Joi.string(),
    vehicle_type: Joi.string(),
  }),
  Delete: Joi.object().keys({
    _id: Joi.string().required(),
  }),
};

module.exports = userStickersValidation;
