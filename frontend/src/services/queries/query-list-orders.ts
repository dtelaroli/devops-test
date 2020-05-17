import { listOrders } from "../graphql";
import query from "../lib/query";

export default (nextToken: string | null, onCompleted: any) => {
  return query(listOrders, { nextToken }, onCompleted);
};
