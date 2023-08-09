const { Joi } = require('celebrate');

const userRemindersValidation = {
  Create: Joi.object().keys({
    user_id: Joi.string().required(),
    sticker_id: Joi.string().required(),
    vehicle_number: Joi.string().required(),
    title: Joi.string().required(),
    expire_date: Joi.date().required(),
    reminder_date: Joi.date().required(),
  }),
  Get: Joi.object().keys({
    sticker_id: Joi.string().required(),
  }),
  Update: Joi.object().keys({
    title: Joi.string(),
    expire_date: Joi.date(),
    reminder_date: Joi.date(),
  }),
};

module.exports = userRemindersValidation;
