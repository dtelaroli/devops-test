const { shipmentService } = require("../services");

const create = async (req, res, next) => {
  const [error, result] = await shipmentService.create(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const confirmation = async (req, res, next) => {
  const [error, result] = await shipmentService.confirmation(req.body.id);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const send = async (event) => {
  return shipmentService.send(event);
};

module.exports = {
  create,
  confirmation,
  send,
};
