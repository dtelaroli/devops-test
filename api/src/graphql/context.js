const { config } = require("../lib");

const context = params => {
  console.log(params);
  const { body } = params.req;
  if (body.TopicArn === config.NOTIFICATION_ARN) {
    params.res.redirect(body.SubscribeURL);
    return params;
  }
};

module.exports = context;
