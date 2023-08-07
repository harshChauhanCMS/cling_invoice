const { Joi } = require('celebrate');

const userRemindersValidation = {
  Create: Joi.object().keys({
    sticker_id: Joi.string().required(),
    vehicle_number: Joi.string().required(),
    title: Joi.string().required(),
    expire_date: Joi.date().required(),
    days_before_expire: Joi.number().required(),
  }),
  Get: Joi.object().keys({
    sticker_id: Joi.string().required(),
  }),
  Update: Joi.object().keys({
    title: Joi.string(),
    expire_date: Joi.date(),
    days_before_expire: Joi.number(),
  }),
};

module.exports = userRemindersValidation;
