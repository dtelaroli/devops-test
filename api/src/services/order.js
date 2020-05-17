const { dynamoDB, config, dateUtil, sqs, throwIfError } = require("../lib");
const uuid = require("uuid/v4");

const get = id => {
  return dynamoDB.get(config.DYNAMO_ORDER_TABLE_NAME, id);
};

const list = params => {
  return dynamoDB.list(config.DYNAMO_ORDER_TABLE_NAME, { ...params, index: config.DYNAMO_ORDER_TABLE_NAME_INDEX });
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
        updatedAt: date
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

    throwIfError(error);

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

const pay = async input => {
  return sqs(config.SQS_CREATE_ORDER_URL, { input });
};

module.exports = {
  get,
  list,
  create,
  update,
  pay
};
