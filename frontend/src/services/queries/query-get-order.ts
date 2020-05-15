import { getOrder } from "../graphql";
import query from "../lib/query";

export default (id: string, onCompleted: any) => {
  return query(getOrder, { id }, onCompleted);
};
