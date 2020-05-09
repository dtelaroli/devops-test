const { notify } = require("../services");

const start = async (req, res, next) => {
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

const end = async (req, res, next) => {
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
  start,
  end
};
