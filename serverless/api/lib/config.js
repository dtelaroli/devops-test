const config = {
  REGION: process.env.REGION,
  ACCESS_KEY: process.env.AWS_ACCESS_KEY_ID,
  SECRET_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  SESSION_TOKEN: process.env.AWS_SESSION_TOKEN,
  NOTIFICATION_ARN: process.env.NOTIFICATION_ARN
};

module.exports = config;
