import { Button, List, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";
import { parseMoney } from "../../components";

export const PRICE = 999.99;

export const CheckoutView = ({ buy }: any) => {
  const productDetails = [
    {
      primary: "Product",
      secondary: "Awesome Product",
    },
    {
      primary: "Quantity",
      secondary: "2",
    },
    {
      primary: "Unit Price",
      secondary: parseMoney(PRICE),
    },
    {
      primary: "Total Price",
      secondary: parseMoney(PRICE * 2),
    },
  ];
  return (
    <Fragment>
      <List>
        {productDetails.map((p: any) => {
          return <ListItemText {...p} key={p.primary} />;
        })}
      </List>
      <Button variant="contained" color="primary" onClick={buy}>
        Buy Now
      </Button>
    </Fragment>
  );
};
