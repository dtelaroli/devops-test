const { sns, config } = require("../lib");
const { NOTIFICATION_ARN } = config;

const paid = async postData => {
  return await sns(NOTIFICATION_ARN, {
    event: "ORDER_PAID",
    ...postData
  });
};

const start = async postData => {
  return await sns(NOTIFICATION_ARN, {
    event: "ON_CREATE_MESSAGE",
    ...postData
  });
};

const end = async postData => {
  return await sns(NOTIFICATION_ARN, {
    event: "ON_UPDATE_MESSAGE",
    ...postData
  });
};

module.exports = {
  paid,
  start,
  end
};
