import React, { useContext } from "react";
import { GlobalContext } from "../Context";
import { DialogView } from "./view";

export const DialogDisplay = () => {
  const context = useContext(GlobalContext);

  return <DialogView {...context} />;
};
