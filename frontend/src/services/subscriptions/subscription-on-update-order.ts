import { onUpdateOrder } from "../graphql";
import subscription from "../lib/subscription";

export default (onCompleted: any) => {
  return subscription(onUpdateOrder, {}, onCompleted);
};
