import { Step, StepLabel, Stepper } from "@material-ui/core";
import React from "react";

export const WizardView = ({ steps, activeStep }: any) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label: string) => {
        return (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
