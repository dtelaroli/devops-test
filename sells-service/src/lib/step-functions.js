const { StepFunctions } = require("./aws");
const config = require("./config");
const { stringify } = require("./parse");
const { to } = require("await-to-js");

const stepFunctions = new StepFunctions();

const stepFunctionsStart = (body) => {
  const params = {
    stateMachineArn: config.STATE_MACHINE_ARN,
    name: body.id,
    input: stringify(body),
  };

  return to(stepFunctions.startExecution(params).promise());
};

const stepFunctionsSuccess = (body) => {
  return to(
    stepFunctions
      .sendTaskSuccess({
        output: stringify(body),
        taskToken: body.taskToken,
      })
      .promise()
  );
};

module.exports = {
  stepFunctionsStart,
  stepFunctionsSuccess,
};
