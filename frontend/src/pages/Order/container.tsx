import React, { Fragment, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { load } from "../../components/Storage";
import { ORDER } from "../../services/models/order";
import queryGetOrder from "../../services/queries/query-get-order";
import subscriptionOnUpdateOrder from "../../services/subscriptions/subscription-on-update-order";
import { OrderView } from "./view";

const getMessage = ({ id, status }: any) => {
  return (
    <Fragment>
      Payment {status},{" "}
      <Link to={`/order/${id}`} style={{ color: "#fff" }}>
        click here
      </Link>{" "}
      to see it
    </Fragment>
  );
};

export const OnUpdateOrder = (callback: any, withLink: boolean = true) => {
  subscriptionOnUpdateOrder((order: any) => {
    const data = order.subscriptionData.data.onUpdateOrder;
    const message = withLink ? getMessage(data) : `Order status update: ${data.status}`;
    callback({ data, message });
  });
};

export const Order = () => {
  let { id } = useParams();
  let isCart = false;
  if (!id) {
    const o = load();
    id = o.id;
    isCart = true;
  }

  const [order, setOrder] = useState(ORDER);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState<string | any>("");

  queryGetOrder(id, (o: any) => {
    setOrder(o.getOrder);
    setStatus(JSON.parse(o.getOrder.updateLogs));
  });

  OnUpdateOrder(({ data, message }: any) => {
    setOrder(data);
    setStatus(JSON.parse(data.updateLogs));
    setMessage(message);
  }, false);

  return <OrderView {...{ order, status, message, setMessage, isCart }} />;
};
