const { shipmentService } = require("../services");

const confirmation = async (req, res, next) => {
  const [error, result] = await shipmentService.confirmation(req.body);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const send = async (event) => {
  return shipmentService.send(event);
};

module.exports = {
  confirmation,
  send,
};
