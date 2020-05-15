export const parseDate = (date: string) => {
  return new Date(date).toLocaleString("pt-BR");
};

export const parseMoney = (value: number) => {
  return `R$ ${Number(value.toFixed(2)).toLocaleString("pt-BR")}`;
};
