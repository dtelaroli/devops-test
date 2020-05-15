import { to } from "await-to-js";
import React from "react";
import { useHistory } from "react-router-dom";
import mutationCreateOrder from "../../services/mutations/mutation-create-order";
import { CheckoutView, PRICE } from "./view";

export const Checkout = () => {
  const history = useHistory();
  const [createOrder] = mutationCreateOrder();

  const buy = async () => {
    // eslint-disable-next-line
    const [error, result]: any = await to(
      createOrder({
        input: {
          value: PRICE * 2,
        },
      })
    );

    if (result) {
      history.push(`/payment/${result.data.createOrder.id}`);
    }
  };

  return <CheckoutView buy={buy} />;
};
