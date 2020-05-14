const { paymentService } = require("../services");

const confirmation = async (req, res, next) => {
  const [error, result] = await paymentService.confirmation(req.body);

  if (error) {
    return next(error);
  }

  res.status(200).json(result);
};

const pay = async (event) => {
  return paymentService.pay(event.Records);
};

module.exports = {
  confirmation,
  pay,
};
