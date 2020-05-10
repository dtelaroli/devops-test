const uuid = require("uuid/v4");
const pubsub = require("../graphql/pubsub");
const { orderService } = require("../services");

const eventNames = {
  ON_CREATE_ORDER: "ON_CREATE_ORDER",
  ON_UPDATE_ORDER: "ON_UPDATE_ORDER"
};

const getOrder = (root, { id }, context) => {
  return orderService.getOrder(id);
};

const listOrders = () => {
  return orderService.listOrders();
};

const createOrder = (root, { input }, context) => {
  const date = new Date().toISOString();

  const order = {
    id: uuid(),
    status: "NEW",
    createdAt: date,
    updatedAt: date,
    ...input
  };

  orderService.createOrder(order);
  
  pubsub.publish(eventNames.ON_CREATE_ORDER, {
    onCreateOrder: order
  });

  return order;
};

const updateOrder = (root, { input }, context) => {
  const order = orderService.updateOrder(input);
  
  pubsub.publish(eventNames.ON_UPDATE_ORDER, {
    onUpdateOrder: order
  });

  return order;
};

const subscriptions = {
  onCreateOrder: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator([eventNames.ON_CREATE_ORDER])
  },
  onUpdateOrder: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator([eventNames.ON_UPDATE_ORDER])
  }
};

module.exports = {
  subscriptions,
  queries: {
    getOrder,
    listOrders
  },
  mutations: {
    createOrder,
    updateOrder
  }
};
