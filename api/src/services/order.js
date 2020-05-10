const ORDERS = [];

const findOrder = id => {
  return ORDERS.filter(m => m.id === id)[0];
};

const getOrder = id => {
  return findOrder(id);
};

const listOrders = () => {
  return ORDERS;
};

const createOrder = order => {
  ORDERS.push(order);
  return ORDERS;
};

const updateOrder = order => {
  const index = ORDERS.findIndex(obj => obj.id === order.id);

  if (index < 0) {
    throw new Error("ID not found");
  }

  const date = new Date().toISOString();
  ORDERS[index].updatedAt = date;

  for (let i in order) {
    ORDERS[index][i] = order[i];
  }

  return ORDERS[index];
};

module.exports = {
  getOrder,
  listOrders,
  createOrder,
  updateOrder
};
