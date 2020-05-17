import { to } from "await-to-js";
import React from "react";
import { useHistory } from "react-router-dom";
import { load } from "../../components/Storage";
import mutationPayOrder from "../../services/mutations/mutation-pay-order";
import { PaymentView } from "./view";

export const Payment = () => {
  const history = useHistory();
  const [payOrder] = mutationPayOrder();
  const order = load();

  const pay = async () => {
    // eslint-disable-next-line
    const [error, result] = await to(
      payOrder({
        input: {
          id: order.id,
          cardHash: "03042CF8100DB386818CEE4FF0F2972431A62ED78EDBD09AC08ACCFABBEFD818",
        },
      })
    );

    if (result) {
      history.push(`/checkout/order`);
    }
  };

  return <PaymentView pay={pay} order={order} />;
};
