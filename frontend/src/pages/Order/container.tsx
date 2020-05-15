import React from "react";
import { useParams } from "react-router-dom";
import { OrderView } from "./view";

export const Order = () => {
  const { id } = useParams();

  const rows = [
    {
      status: "NEW",
      date: "2020-01-01T00:00:00Z",
    },
  ];

  return <OrderView {...{ id, rows }} />;
};
