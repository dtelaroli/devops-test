const { dynamoDB, config, dateUtil } = require("../lib");
const uuid = require("uuid/v4");

const getOrder = id => {
  return dynamoDB.get(config.DYNAMO_ORDER_TABLE_NAME, id);
};

const listOrders = params => {
  return dynamoDB.list(config.DYNAMO_ORDER_TABLE_NAME, params);
};

const createOrder = async input => {
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

const updateOrder = async input => {
  const updatedAt = dateUtil();
  let updateLogs = input.updateLogs;

  if (!updateLogs) {
    const [error, res] = await getOrder(input.id);

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
  getOrder,
  listOrders,
  createOrder,
  updateOrder
};
