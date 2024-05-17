import { useState } from "react";

export function useMultiStepForm(steps: string[]) {
  const [activeStep, setActiveStep] = useState(0);

  const nextStep = () => {
    setActiveStep((i) => {
      if (i >= steps.length - 1) return i;
      return i + 1;
    });
  };

  const backStep = () => {
    setActiveStep((i) => {
      if (i <= 0) return i;
      return i - 1;
    });
  };

  return {
    activeStep: activeStep,
    isFirstStep: activeStep === 0,
    isSecondStep: activeStep === 1,
    isLastStep: activeStep === steps.length - 1,
    nextStep,
    backStep,
  };
}
