const { ValidationError } = require("express-validation");

const errorHandler = (e, req, res, next) => {
  console.log(e);

  if (e instanceof ValidationError) {
    return res.status(e.statusCode).json(e);
  }

  const err = {
    message: e.message
  };

  res.status(400).json(err);
};

module.exports = errorHandler;
