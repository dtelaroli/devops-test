import React from "react";
import { WizardView } from "./view";

export const Wizard = ({ activeStep }: any) => {
  const steps = ["Product detail", "Payment", "Progress"];

  return (
    <WizardView
      {...{
        steps,
        activeStep,
      }}
    />
  );
};
