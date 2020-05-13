const { sellService } = require("../services");

const start = async (event) => {
  return sellService.sell(event.Records);
};

module.exports = start;
