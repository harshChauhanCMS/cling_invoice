const { Joi } = require('celebrate');

const userDetailsValidation = {
  UserData: Joi.object().keys({
    account_holder_name: Joi.string().required(),
    account_number: Joi.string().required(),
    account_type: Joi.string(),
    bank_name: Joi.string().required(),
    branch_name: Joi.string(),
    ifsc_code: Joi.string().allow(''),
    mobile_no: Joi.string().required(),
    name: Joi.string().required(),
    pan_number: Joi.string().allow(''),
    nid_number: Joi.string().allow(''),
    manager_name: Joi.string(),
  }),
};

module.exports = userDetailsValidation;
