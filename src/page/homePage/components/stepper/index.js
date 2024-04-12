import * as React from "react";
import { Box, useTheme } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import styled from "@emotion/styled";

const steps = [
  "Ride Info",
  "Choose a Vehicle",
  "Trip Detail",
  "Enter Contact Details",
  "Booking Summary",
];

export default function CustomStepper({ step }) {
  const theme = useTheme();
  const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#CCC",
      borderTopWidth: 1,
      borderRadius: 0,
    },
  }));
  const CustomStep = styled(Step)({
    ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-active": {
      color: "#000",
      fill: "#FF7001",
    },
    "& .MuiStepContent-root": {
      borderLeftColor: "#00adef",
    },
    ".css-117w1su-MuiStepIcon-text": {
      height: 40,
      fill: "#fff",
      fontSize: "0.75rem",
      fontFamily: "Roboto Helvetica Arial sans-serif",
    },
    ".css-1u4zpwo-MuiSvgIcon-root-MuiStepIcon-root.Mui-completed": {
      color: theme.palette.info.main,
    },
  });
  const CustomStepLabel = styled(StepLabel)({
    ".Mui-active": {
      color: "#000",
    },
    ".MuiStepLabel-root": {
      color: "#000",
    },
  });
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={step}
        alternativeLabel
        connector={<QontoConnector />}
      >
        {steps.map((label) => (
          <CustomStep key={label}>
            <CustomStepLabel>{label}</CustomStepLabel>
          </CustomStep>
        ))}
      </Stepper>
    </Box>
  );
}
