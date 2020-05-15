import React from "react";
import { WizardView } from "./view";

export const Wizard = ({ steps, activeStep }: any) => {
  return (
    <WizardView
      {...{
        steps,
        activeStep,
      }}
    />
  );
};
