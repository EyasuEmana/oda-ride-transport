import React, { useState, useEffect } from "react";
import { Box, Grid, Stack, Button } from "@mui/material";
import Stepper from "./components/stepper/index";
import RideDetailForm from "./components/rideDetailForm";
import ChooseVehicleForm from "./components/chooseVehicleForm";
import ContactDetailForm from "./components/contactDetailForm";
import TripDetail from "./components/tripDetail";
import { useDispatch } from "react-redux";
import Summary from "./components/summary";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { book } from "../../store/actions/bookActions";

function Index() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedTripType, setSelectedTripType] = React.useState();
  const dispatch = useDispatch();
  const phoneRegex = /^(09|07|2519|2517|\+2519|\+2517)\d{8}$/;
  const location = useLocation();
  const navigate = useNavigate();

  const [rideInfoValidationSchemaObj, setrideInfoValidationSchemaObj] =
    useState({
      tripType: yup.string("Trip Type").required("Trip type is required!"),
      pickupPhysicalAddress: yup
        .string("Pick up address")
        .required("Pick up address is required!"),
      dropoffPhysicalAddress: yup
        .string("Dropoff address")
        .required("Dropoff address is required!"),
    });

  const rideInfoValidationSchema = yup
    .object()
    .shape(rideInfoValidationSchemaObj);
  const rideValidationSchema = yup.object({
    vehicle: yup
      .string("vehicle is string")
      .required("Select at least one vehicle to proceed"),

    numberOfSuitcases: yup
      .string("suitcase is string")
      .required("Select at least one suitcases"),

    numberOfPassengers: yup
      .string("passengers is string")
      .required("Select at least one passengers"),
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
    instruction: yup
      .string("special instruction shoud be string")
      .required("special instruction is required"),
  });

  const formikRideInfo = useFormik({
    initialValues: {
      tripType: null,
      pickupPhysicalAddress: null,
      pickupLongitude: null,
      pickupLatitude: null,
      dropoffPhysicalAddress: null,
      dropoffLongitude: null,
      dropoffLatitude: null,
      distanceInMiles: 0,
      hour: 0,
      airPort: "Bole Airport",
      hotel: null,
    },
    validationSchema: rideInfoValidationSchema,
    onSubmit: (values) => {
      handleNext();
    },
  });

  const formikChooseVehicle = useFormik({
    initialValues: {
      vehicle: null,
      numberOfSuitcases: 0,
      numberOfPassengers: 0,
      extraOptions: [],
    },
    validationSchema: rideValidationSchema,
    onSubmit: (values) => {
      console.log("values: ", values);
      // handleNext();
    },
  });

  const formikTripDetail = useFormik({
    initialValues: {
      pickupDate: null,
      pickupTime: null,
      returnPickupDate: null,
      returnPickupTime: null,
      additionalStopOnTheWayPrice: 0,
      instruction: null,
    },
    validationSchema: tripDetailValidationSchema,
    onSubmit: (value) => {
      handleNext();
    },
  });
  const contactValidationSchema = yup.object().shape({
    firstName: yup.string("should be string").required(),
    lastName: yup.string("should be string").required(),
    email: yup
      .string("should be string")
      .email("should be valid email")
      .required("Email required"),
    confirmEmail: yup
      .string()
      .oneOf([yup.ref("email"), null], "Emails must match")
      .required("Confirm email is required"),
    cellPhone: yup.string().matches(phoneRegex, "Invalid phone number format"),
    passengerFirstName: yup.string(),
    passengerLastName: yup.string(),
    passengerCellPhone: yup
      .string()
      .matches(phoneRegex, "Invalid phone number format"),
  });
  const formikContact = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      cellPhone: "",
      passengerFirstName: "",
      passengerLastName: "",
      passengerCellPhone: "",
    },
    validationSchema: contactValidationSchema,
    onSubmit: () => {
      handleNext();
    },
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChangeTripType = (event) => {
    // formikTripDetail.resetForm();
    const selectedType = event.target.value;
    navigate(`/home/${selectedType}`);
    setSelectedTripType(selectedType);
  };

  function setRideDetailFormikData() {
    var ttype = location.pathname.split("/").pop();

    if (ttype === 1) {
      setrideInfoValidationSchemaObj({
        tripType: yup.string("Trip Type").required("Trip type is required!"),
        pickupPhysicalAddress: yup
          .string("Pick up address")
          .required("Pick up address is required!"),
        dropoffPhysicalAddress: yup
          .string("Dropoff address")
          .required("Dropoff address is required!"),
      });
    } else if (ttype === 2) {
      setrideInfoValidationSchemaObj({
        tripType: yup.string("Trip Type").required("Trip type is required!"),
        airPort: yup.string("airport").required("Airport required!"),
        hotel: yup.string("Hotel is string").required("Hotel is required!"),
      });
    } else if (ttype === 3) {
      setrideInfoValidationSchemaObj({
        pickupPhysicalAddress: yup
          .string("Pick up address")
          .required("Pick up address is required!"),
        dropoffPhysicalAddress: yup
          .string("Dropoff address")
          .required("Dropoff address is required!"),
        hour: yup.string("Hour to travel").required("Hour is required!"),
      });
    }
  }

  const handleFinish = () => {
    const values = {
      rideInfo: formikRideInfo.values,
      vehicle: formikChooseVehicle.values,
      tripDetail: formikTripDetail.values,
      contact: formikContact.values,
    };
    dispatch(book(values));
  };

  useEffect(() => {
    setRideDetailFormikData();
  }, [location]);

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
        formikContact.handleSubmit();
      // case 4:
      //   formikSummary.handleSubmit();
      //   break;
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
            {activeStep === 0 && (
              <RideDetailForm
                formik={formikRideInfo}
                handleChangeTripType={handleChangeTripType}
                selectedTripType={selectedTripType}
              />
            )}
            {activeStep === 1 && (
              <ChooseVehicleForm formik={formikChooseVehicle} />
            )}
            {activeStep === 2 && <TripDetail formik={formikTripDetail} />}
            {activeStep === 3 && <ContactDetailForm formik={formikContact} />}
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
            {activeStep === 4 ? (
              <Button variant="contained" onClick={handleFinish}>
                Finish
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                {getNextButtonLabel()}
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
