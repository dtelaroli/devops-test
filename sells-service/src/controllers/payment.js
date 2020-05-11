const { paymentService } = require("../services");

const create = async (req, res, next) => {
  try {
    const [error, result] = await paymentService.create(req.body.id);

    if (error) {
      throw error;
    }

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

const confirmation = async (req, res, next) => {
  try {
    const [error, result] = await paymentService.confirmation(req.body.id);

    if (error) {
      throw error;
    }

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  create,
  confirmation
};
