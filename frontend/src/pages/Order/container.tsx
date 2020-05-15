import React, { useState, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import { ORDER } from "../../services/models/order";
import queryGetOrder from "../../services/queries/query-get-order";
import subscriptionOnUpdateOrder from "../../services/subscriptions/subscription-on-update-order";
import { OrderView } from "./view";

const rejectMessage = (
  <Fragment>
    Payment Rejected, <Link to="/" style={{ color: "#fff" }}>click here</Link> to try again
  </Fragment>
);

export const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(ORDER);
  const [status, setStatus] = useState([]);
  const [message, setMessage] = useState<string | any>("");

  queryGetOrder(id, (o: any) => {
    setOrder(o.getOrder);
    setStatus(JSON.parse(o.getOrder.updateLogs));
  });

  subscriptionOnUpdateOrder((o: any) => {
    const data = o.subscriptionData.data.onUpdateOrder;
    setOrder(data);
    setStatus(JSON.parse(data.updateLogs));

    setMessage(data.status === "REJECTED" ? rejectMessage : `Order Update: ${data.status}`);

    if (Notification.permission === "granted") {
      window.navigator.serviceWorker
        .getRegistration()
        .then(function (reg) {
          // @ts-ignore
          reg.showNotification(`Order Update: ${data.status}`);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  });

  return <OrderView {...{ order, status, message, setMessage }} />;
};
