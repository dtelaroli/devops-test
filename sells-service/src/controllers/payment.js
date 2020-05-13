const { paymentService } = require("../services");

const create = async (req, res, next) => {
  const [error, result] = await paymentService.create(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const confirmation = async (req, res, next) => {
  const [error, result] = await paymentService.confirmation(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const pay = async (event) => {
  return paymentService.pay(event);
};

module.exports = {
  create,
  confirmation,
  pay,
};
