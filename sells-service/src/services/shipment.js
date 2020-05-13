const { sqs, config, post, throwIfError } = require("../lib");
const { COURIER_URL } = config;

const create = async id => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "SHIPPING"
  });
};

const confirmation = async id => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "FINISHED"
  });
};

const send = async (body) => {
  const [error, result] = await post(COURIER_URL, body);

  throwIfError(error);

  return result.data;
};

module.exports = {
  create,
  confirmation,
  send
};
