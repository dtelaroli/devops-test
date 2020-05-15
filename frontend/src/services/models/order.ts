export type Order = {
  id: String;
  value: number;
  status: String;
  statusLogs: any;
};

export const ORDER: Order = {
  id: "",
  value: 0,
  status: "NEW",
  statusLogs: "[]",
};
