const { StepFunctions } = require("./aws");
const config = require("./config");
const { to } = require("await-to-js");

const stepFunctions = new StepFunctions();

const stepFunctionsStart = (body) => {
  const params = {
    stateMachineArn: config.STATE_MACHINE_ARN,
    ...body,
  };

  return to(stepFunctions.startExecution(params).promise());
};

const stepFunctionsSuccess = (body) => {
  return to(stepFunctions.sendTaskSuccess(body).promise());
};

module.exports = {
  stepFunctionsStart,
  stepFunctionsSuccess,
};
