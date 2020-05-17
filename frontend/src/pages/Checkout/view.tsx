import { Button, List, ListItemText } from "@material-ui/core";
import React, { Fragment } from "react";
import { parseMoney, Wizard } from "../../components";

export const CheckoutView = ({ buy, price }: any) => {
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
      secondary: parseMoney(price),
    },
    {
      primary: "Total Price",
      secondary: parseMoney(price * 2),
    },
  ];
  return (
    <Fragment>
      <Wizard activeStep={0} />
      <List>
        {productDetails.map((p: any) => {
          return <ListItemText {...p} key={p.primary} />;
        })}
      </List>
      <Button variant="outlined" onClick={buy}>
        Buy Now
      </Button>
    </Fragment>
  );
};
