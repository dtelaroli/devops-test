import { to } from "await-to-js";
import React from "react";
import { useHistory } from "react-router-dom";
import mutationCreateOrder from "../../services/mutations/mutation-create-order";
import { CheckoutView } from "./view";
import { save, clean } from "../../components/Storage";

export const Checkout = () => {
  const history = useHistory();
  const [createOrder] = mutationCreateOrder();

  const price = Math.random() * 1000;
  clean();
  
  const buy = async () => {
    // eslint-disable-next-line
    const [error, result]: any = await to(
      createOrder({
        input: {
          value: price * 2,
        },
      })
    );

    if (result) {
      const order = result.data.createOrder;
      save(order);
      history.push(`/checkout/payment`);
    }
  };

  return <CheckoutView {...{ buy, price }} />;
};
