const { sqs, config } = require("../lib");
const { SQS_NOTIFY_URL } = config;

const create = async id => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "PAYMENT"
  });
};

const confirmation = async id => {
  return sqs(SQS_NOTIFY_URL, {
    id,
    status: "PAID"
  });
};

module.exports = {
  create,
  confirmation
};
