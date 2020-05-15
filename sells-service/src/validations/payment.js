const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

const payment = {
  body: Joi.object({
    input: Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required(),
      cardHash: Joi.string(),
    }),
    taskToken: Joi.string().required(),
    url: Joi.string(),
  }),
};

module.exports = validate(payment);
