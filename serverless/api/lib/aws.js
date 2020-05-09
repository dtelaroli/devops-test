const AWS = require("aws-sdk");
const config = require("./config");

const credentials = new AWS.Credentials(config.ACCESS_KEY, config.SECRET_KEY, config.SESSION_TOKEN);

AWS.config.update({ region: config.REGION, credentials });

module.exports = AWS;
