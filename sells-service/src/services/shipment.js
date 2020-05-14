const { stepFunctionsSuccess, config, post, toMap, parse, stringify } = require("../lib");
const { COURIER_URL } = config;

const send = async (records) => {
  return toMap(records, async ({ body }) => {
    const url = `${config.API_URL}/shipment/confirmation`;
    const { input, taskToken } = parse(body);
    const [error, result] = await post(COURIER_URL, { input, taskToken, url });
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
  send,
};
