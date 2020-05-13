const { stepFunctionsSuccess, config, post, throwIfError, stringify } = require("../lib");
const { COURIER_URL } = config;

const send = async (body) => {
  const [error, result] = await post(COURIER_URL, body);

  throwIfError(error);

  return result.data;
};

const confirmation = async (body) => {
  const input = {
    output: stringify(body),
    taskToken: body.taskToken,
  };
  return stepFunctionsSuccess(input);
};

module.exports = {
  confirmation,
  send,
};
