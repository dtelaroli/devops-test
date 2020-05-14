const Joi = require("@hapi/joi");
const { validate } = require("express-validation");

const shipment = {
  body: Joi.object({
    input: Joi.object({
      id: Joi.string().required(),
      status: Joi.string().required(),
    }),
    taskToken: Joi.string().required(),
    url: Joi.string().required(),
  }),
};

module.exports = validate(shipment);
