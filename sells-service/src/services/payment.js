const { sqs, config, post, throwIfError } = require("../lib");
const { SQS_NOTIFY_URL, GATEWAY_URL } = config;

const create = async (id) => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "PAYMENT",
  });
};

const confirmation = async (id) => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "PAID",
  });
};

const pay = async (body) => {
  const [error, result] = await post(GATEWAY_URL, body);

  throwIfError(error);

  return result.data;
};

module.exports = {
  create,
  confirmation,
  pay,
};
