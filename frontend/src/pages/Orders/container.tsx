import React, { useState } from "react";
import queryListOrders from "../../services/queries/query-list-orders";
import { OnUpdateOrder } from "../Order/container";
import { OrdersView } from "./view";

export const Orders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [message, setMessage] = useState("");
  const [nextToken, setNextToken] = useState("");

  const { fetchMore } = queryListOrders(null, (result: any) => {
    const data = result.listOrders;
    setNextToken(data.nextToken);
    setOrders(data.items);
  });

  const loadMore = async () => {
    fetchMore({
      variables: {
        nextToken,
      },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        setOrders([...orders, ...fetchMoreResult.listOrders.items]);
        setNextToken(fetchMoreResult.listOrders.nextToken);
      },
    });
  };

  OnUpdateOrder(({ message }: any) => {
    setMessage(message);
  });

  return <OrdersView {...{ orders, setMessage, message, nextToken, loadMore }} />;
};
