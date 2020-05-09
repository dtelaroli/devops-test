const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

const shipping = {
  body: Joi.object({
    customerId: Joi.string().required(),
    trackingCode: Joi.string().required()
  })
};

module.exports = validate(shipping);
