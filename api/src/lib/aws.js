const AWS = require("aws-sdk");
const config = require("./config");

AWS.config.update({ region: config.REGION });

module.exports = AWS;
