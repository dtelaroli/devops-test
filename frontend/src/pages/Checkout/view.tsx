import { Button } from "@material-ui/core";
import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
import mutationCreateOrder from "../../services/mutations/mutation-create-order";
import { to } from "await-to-js";

export const CheckoutView = () => {
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
  return (
    <Fragment>
      <Button variant="contained" color="primary" onClick={buy}>
        Buy Awesome Product
      </Button>
    </Fragment>
  );
};
