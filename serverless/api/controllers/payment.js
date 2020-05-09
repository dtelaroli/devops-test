const { notify } = require("../services");

const paid = async (req, res, next) => {
  try {
    const [error, result] = await notify.start(req.body);

    if (error) {
      throw error;
    }

    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  paid
};
