// lambda.js
"use strict";
const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(event, null, 2);
  awsServerlessExpress.proxy(server, event, context);
};
