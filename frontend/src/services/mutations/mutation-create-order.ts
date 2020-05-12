import { createOrder } from "../graphql";
import {} from "../../components";
import mutation from "../lib/mutation";

export default () => {
  return mutation({ literals: createOrder });
};
