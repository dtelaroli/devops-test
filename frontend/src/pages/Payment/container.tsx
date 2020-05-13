import { to } from "await-to-js";
import React from "react";
import { useHistory, useParams } from "react-router-dom";
import mutationPayOrder from "../../services/mutations/mutation-pay-order";
import { PaymentView } from "./view";

export const Payment = () => {
  const history = useHistory();
  const { id } = useParams();
  const [payOrder] = mutationPayOrder();

  const pay = async () => {
    const [error, result] = await to(
      payOrder({
        input: {
          id,
          cardHash: "a-sd8faisnraw309raeiafsdkf",
        },
      })
    );

    if (result) {
      history.push("/order");
    }
  };

  return <PaymentView pay={pay} id={id} />;
};
