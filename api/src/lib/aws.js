const AWS = require("aws-sdk");
const config = require("./config");

const credentials = new AWS.Credentials(config.AWS_ACCESS_KEY_ID, config.AWS_SECRET_ACCESS_KEY, config.AWS_SESSION_TOKEN);

AWS.config.update({ region: config.REGION, credentials });

module.exports = AWS;
