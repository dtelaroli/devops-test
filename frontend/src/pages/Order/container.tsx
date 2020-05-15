import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ORDER } from "../../services/models/order";
import queryGetOrder from "../../services/queries/query-get-order";
import subscriptionOnUpdateOrder from "../../services/subscriptions/subscription-on-update-order";
import { OrderView } from "./view";

export const Order = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(ORDER);
  const [status, setStatus] = useState([]);
  
  queryGetOrder(id, (o: any) => {
    setOrder(o.getOrder);
    setStatus(JSON.parse(o.getOrder.updateLogs));
  });
  
  subscriptionOnUpdateOrder((o: any) => {
    const data = o.subscriptionData.data.onUpdateOrder;
    setOrder(data);
    setStatus(JSON.parse(data.updateLogs));
    
    if (Notification.permission == 'granted') {
      window.navigator.serviceWorker.getRegistration().then(function(reg) {
        // @ts-ignore
        reg.showNotification('Hello world!');
      }).catch((e) => {console.log(e)});
    }
  });

  return <OrderView {...{ order, status }} />;
};
