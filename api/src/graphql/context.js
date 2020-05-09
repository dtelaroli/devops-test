const { config } = require("../lib");

const context = params => {
  const { headers, body } = params.req;
  console.log(JSON.stringify({ headers, body }, null, 2));
  if (headers["x-amz-sns-topic-arn"] === config.NOTIFICATION_ARN) {
    params.res.redirect(body.SubscribeURL);
    return params;
  }
};

module.exports = context;
