import { createOrder } from "../graphql";
import mutation from "../lib/mutation";

export default () => {
  return mutation({ literals: createOrder });
};
