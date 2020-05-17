const NAME = "order";

export const save = (order: any) => {
  localStorage.setItem(NAME, JSON.stringify(order));
};

export const load = () => {
  const order = localStorage.getItem(NAME);
  if (!order) {
    return;
  }

  return JSON.parse(order);
};

export const clean = () => {
  localStorage.clear();
};
