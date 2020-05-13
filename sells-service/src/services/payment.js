const { stepFunctionSuccess, config, post, throwIfError } = require("../lib");
const { GATEWAY_URL } = config;

const confirmation = async (body) => {
  return stepFunctionSuccess(body);
};

const pay = async (body) => {
  const [error, result] = await post(GATEWAY_URL, body);

  throwIfError(error);

  return result.data;
};

module.exports = {
  confirmation,
  pay,
};
