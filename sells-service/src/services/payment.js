const { stepFunctionsSuccess, config, post, parse, toMap, stringify } = require("../lib");
const { GATEWAY_URL } = config;

const pay = async (records) => {
  return toMap(records, async ({ body }) => {
    const url = `${config.API_URL}/payment/confirmation`;
    const { input, taskToken } = parse(body);
    const [error, result] = await post(GATEWAY_URL, { input: { ...input, status: "PAID" }, taskToken, url });
    return [error, result.data];
  });
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
  pay,
};
