import React from "react";
import { NotificationView } from "./view";

export const Notification = ({ setMessage, message }: any) => {
  const handleClose = () => {
    setMessage("");
  };

  return <NotificationView {...{ setMessage, message, handleClose }} />;
};
