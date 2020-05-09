const { config } = require("../lib");

const context = params => {
  const { body } = params.req;
  console.log(body);
  if (body.TopicArn === config.NOTIFICATION_ARN) {
    params.res.redirect(body.SubscribeURL);
    return params;
  }
};

module.exports = context;
