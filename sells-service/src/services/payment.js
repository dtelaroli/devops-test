const { stepFunctionsSuccess, config, post, throwIfError, stringify } = require("../lib");
const { GATEWAY_URL } = config;

const confirmation = async (body) => {
  const input = {
    output: stringify(body),
    taskToken: body.taskToken,
  };
  return stepFunctionsSuccess(input);
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
