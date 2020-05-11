const { dynamoDB, config, dateUtil } = require("../lib");
const uuid = require("uuid/v4");

const get = id => {
  return dynamoDB.get(config.DYNAMO_ORDER_TABLE_NAME, id);
};

const list = params => {
  return dynamoDB.list(config.DYNAMO_ORDER_TABLE_NAME, params);
};

const create = async input => {
  const date = dateUtil();
  const order = {
    id: uuid(),
    status: "NEW",
    createdAt: date,
    updatedAt: date,
    updateLogs: JSON.stringify([
      {
        status: "NEW",
        date
      }
    ]),
    ...input
  };

  return dynamoDB.create(config.DYNAMO_ORDER_TABLE_NAME, order);
};

const update = async input => {
  const updatedAt = dateUtil();
  let updateLogs = input.updateLogs;

  if (!updateLogs) {
    const [error, res] = await get(input.id);

    if (error) {
      throw error;
    }

    updateLogs = JSON.parse(res.updateLogs);
  }

  updateLogs.push({ status: input.status, updatedAt });
  const order = {
    updatedAt,
    updateLogs: JSON.stringify(updateLogs),
    ...input
  };

  return dynamoDB.update(config.DYNAMO_ORDER_TABLE_NAME, order);
};

module.exports = {
  get,
  list,
  create,
  update
};
