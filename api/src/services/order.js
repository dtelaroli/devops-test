const { dynamoDB, config } = require("../lib");
const uuid = require("uuid/v4");

const date = new Date().toISOString();

const getOrder = id => {
  return dynamoDB.get(config.ORDER_TABLE_NAME, id);
};

const listOrders = params => {
  return dynamoDB.list(config.ORDER_TABLE_NAME, params);
};

const createOrder = async input => {
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

  return dynamoDB.create(config.ORDER_TABLE_NAME, order);
};

const updateOrder = async input => {
  const order = {
    updatedAt: date,
    ...input
  };
  
  return dynamoDB.update(config.ORDER_TABLE_NAME, order);
};

module.exports = {
  getOrder,
  listOrders,
  createOrder,
  updateOrder
};
