import React, { useState } from "react";
import { Box, Grid, Stack, Button } from "@mui/material";
import Stepper from "./components/stepper/index";
import RideDetailForm from "./components/rideDetailForm";
import ChooseVehicleForm from "./components/chooseVehicleForm";
import ContactDetailForm from "./components/contactDetailForm";
import TripDetail from "./components/tripDetail";

import Summary from "./components/summary";
import { useFormik } from "formik";
import * as yup from "yup";

function Index() {
  const [activeStep, setActiveStep] = useState(2);

  const rideInfoValidationSchema = yup.object({
    tripType: yup.string("Trip Type").required("Trip type is required!"),
    pickUpAddress: yup
      .string("Pick up address")
      .required("Pick up address is required!"),
    dropOffAddress: yup
      .string("Dropoff address")
      .required("Dropoff address is required!"),
    hour: yup.string("Hour to travel").required("Hour is required!"),
    airPort: yup.string("airport").required("Airport required!"),
    hotel: yup.string("Hotel is string").required("Hotel is required!"),
  });
  const rideValidationSchema = yup.object({
    vehicle: yup
      .string("vehicle is string")
      .required("Select at least one vehicle to proceed"),
  });
  const tripDetailValidationSchema = yup.object({
    pickupDate: yup
      .string("should be string value")
      .required("Pickup date is required"),
    pickupTime: yup
      .string("should be string value")
      .required("Pickup time is required"),
    returnPickupDate: yup
      .string("should be string value")
      .required("Return pickup date is required"),
    returnPickupTime: yup
      .string("should be string value")
      .required("Return pickup time is required"),
  });
  const formikRideInfo = useFormik({
    initialValues: {
      tripType: null,
      pickUpAddress: null,
      dropOffAddress: null,
      hour: null,
      airPort: null,
      hotel: null,
    },
    validationSchema: rideInfoValidationSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });
  const formikChooseVehicle = useFormik({
    initialValues: { vehicle: null },
    validationSchema: rideValidationSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });
  const formikTripDetail = useFormik({
    initialValues: {
      pickupDate: null,
      pickupTime: null,
      returnPickupDate: null,
      returnPickupTime: null,
    },
    validationSchema: tripDetailValidationSchema,
    onSubmit: (value) => {
      handleNext();
    },
  });
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    switch (activeStep) {
      case 0:
        formikRideInfo.handleSubmit();
        break;
      case 1:
        formikChooseVehicle.handleSubmit();
        break;
      case 2:
        formikTripDetail.handleSubmit();
        break;
      case 3:
        // formikSummary.handleSubmit();
        break;
      default:
        break;
    }
  };
  const getNextButtonLabel = () => {
    switch (activeStep) {
      case 0:
        return "CHOOSE VEHICLE";
      case 1:
        return "TRIP DETAIL";
      case 2:
        return "CONTACT DETAIL";
      case 3:
        return "SUMMARY";
      default:
        break;
    }
  };
  return (
    <Box mt={5}>
      <Stepper step={activeStep} />
      <Grid container justifyContent={"center"} mt={5}>
        <Grid item xs={10}>
          <Box>
            {activeStep === 0 && <RideDetailForm formik={formikRideInfo} />}
            {activeStep === 1 && (
              <ChooseVehicleForm formik={formikChooseVehicle} />
            )}
            {activeStep === 2 && <TripDetail formik={formikTripDetail} />}
            {activeStep === 3 && <ContactDetailForm />}
            {activeStep === 4 && <Summary />}
          </Box>
        </Grid>

        <Grid item xs={10} mt={3}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
              color="secondary"
            >
              BACK
            </Button>

            <Button variant="contained" onClick={handleSubmit}>
              {getNextButtonLabel()}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
