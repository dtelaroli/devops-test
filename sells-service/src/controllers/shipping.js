const { shippingService } = require("../services");

const create = async (req, res, next) => {
  const [error, result] = await shippingService.create(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const confirmation = async (req, res, next) => {
  const [error, result] = await shippingService.confirmation(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

module.exports = {
  create,
  confirmation,
};
