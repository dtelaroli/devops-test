const { config } = require("../lib");

const context = params => {
  const { body } = params.req;

  if (typeof body === "string") {
    const json = JSON.parse(body);
    if (json.TopicArn === config.NOTIFICATION_ARN) {
      params.res.redirect(json.SubscribeURL);
    }
  }
};

module.exports = context;
