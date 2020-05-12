import { to } from "await-to-js";
import React from "react";
import { useHistory } from "react-router-dom";
import mutationCreateOrder from "../../services/mutations/mutation-create-order";
import { CheckoutView } from "./view";

export const Checkout = () => {
  const history = useHistory();
  const [createOrder] = mutationCreateOrder();

  const buy = async () => {
    const [error, result] = await to(
      createOrder({
        input: {
          value: 99.9
        }
      })
    );

    if (result) {
      history.push("/payment");
    }
  };

  return <CheckoutView buy={buy} />;
};
