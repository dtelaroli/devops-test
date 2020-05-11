const { shippingService } = require("../services");

const create = async (req, res, next) => {
  try {
    const [error, result] = await shippingService.create(req.body.id);

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
    const [error, result] = await shippingService.confirmation(req.body.id);

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
