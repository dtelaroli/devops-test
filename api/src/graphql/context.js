const { config } = require("../lib");

const context = params => {
  console.log(JSON.stringify(params, null, 2));
  const { headers, body } = params.req;
  if (headers["x-amz-sns-topic-arn"] === config.NOTIFICATION_ARN) {
    params.res.redirect(body.SubscribeURL);
    return params;
  }
};

module.exports = context;
