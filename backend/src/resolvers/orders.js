const { pubsub, throwIfError } = require("../lib");
const { orderService } = require("../services");

const eventNames = {
  ON_CREATE_ORDER: "ON_CREATE_ORDER",
  ON_UPDATE_ORDER: "ON_UPDATE_ORDER"
};

const getOrder = async (root, { id }) => {
  const [error, order] = await orderService.get(id);

  throwIfError(error);

  return order;
};

const listOrders = async () => {
  const [error, orderList] = await orderService.list();

  throwIfError(error);

  return orderList;
};

const createOrder = async (root, { input }) => {
  const [error, order] = await orderService.create(input);

  throwIfError(error);

  pubsub.publish(eventNames.ON_CREATE_ORDER, {
    onCreateOrder: order
  });

  return order;
};

const updateOrder = async (root, { input }) => {
  const [error, order] = await orderService.update(input);

  throwIfError(error);

  pubsub.publish(eventNames.ON_UPDATE_ORDER, {
    onUpdateOrder: order
  });

  return order;
};

const payOrder = async (root, { input }) => {
  const [error] = await orderService.pay(input);

  throwIfError(error);

  return "Pending - We will notify with subscription onUpdateOrder";
};

const subscriptions = {
  onCreateOrder: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator(eventNames.ON_CREATE_ORDER)
  },
  onUpdateOrder: {
    // Additional event labels can be passed to asyncIterator creation
    subscribe: () => pubsub.asyncIterator(eventNames.ON_UPDATE_ORDER)
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
    updateOrder,
    payOrder
  }
};
