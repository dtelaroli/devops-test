const { stepFunctionSuccess, config, post, throwIfError } = require("../lib");
const { COURIER_URL } = config;

const confirmation = async (body) => {
  return stepFunctionSuccess(body);
};

const send = async (body) => {
  const [error, result] = await post(COURIER_URL, body);

  throwIfError(error);

  return result.data;
};

module.exports = {
  confirmation,
  send,
};
