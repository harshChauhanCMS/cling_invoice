const { Joi } = require('celebrate');

const invoiceValidation = {
  invoice: Joi.object().keys({
    account_holder_name: Joi.string().required(),
    account_number: Joi.string().required(),
    account_type: Joi.string(),
    amounts: Joi.array()
      .items(
        Joi.object().keys({
          description: Joi.string().required(),
          amount: Joi.string().required(),
        })
      )
      .min(1)
      .required(),
    bank_name: Joi.string().required(),
    branch_name: Joi.string(),
    date: Joi.string().required(),
    email: Joi.string().required(),
    ifsc_code: Joi.string(),
    invoice_number: Joi.string().required(),
    mobile_no: Joi.string().required(),
    name: Joi.string().required(),
    pan_number: Joi.string().required(),
    nid_number: Joi.string(),
  }),
};

module.exports = invoiceValidation;
