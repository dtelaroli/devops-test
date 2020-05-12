const { stepFunctions, config } = require("../lib")

exports.handler = async (event, context) => {
  console.log(JSON.stringify(event, null, 2));

  event.Records.forEach(record => {
    // start step function
    const params = {
      name: payload.proposal.id,
      stateMachineArn: config.STATE_MACHINE_ARN,
      input: JSON.stringify(payload)
    };

    const result = await stepFunctions.startExecution(params).promise();
    
  });
};
