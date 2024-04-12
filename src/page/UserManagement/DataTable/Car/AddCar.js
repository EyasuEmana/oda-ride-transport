import React, { useState } from "react";
import {
  Box,
  Button,
  Stack,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  TextField,
  Select,
} from "@mui/material";
import * as _ from "lodash";
import * as yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import CarImagePreview from "./CarImagePreview";
export default function AddCar() {
  const [createCarSuccess, setCreateCarSuccess] = useState({
    createCarLoading: false,
    isCreateCarSuccess: false,
    createCarSuccessMessage: "",
  });

  const [createCarFail, setCreateCarFail] = useState({
    createCarLoading: false,
    isCreateCarFail: false,
    createCarFailMessage: "",
  });
  const carValidationSchema = yup.object({
    carName: yup.string().required("car name is required"),
    carDescription: yup.string().required("car description is required"),
    maxPassengers: yup.number().required("max passenger required"),
    maxSuitcases: yup.number().required("max suitcase required"),
    carType: yup.string().required("car type is required"),
    pricePerMile: yup
      .number("should be number")
      .required("price per mile is required"),
    pricePerHour: yup
      .number("should be number")
      .required("price per hour is required"),
    currency: yup.string().required("currency is required"),
    engineType: yup.string().required("Engine Type is required"),
    length: yup.number().required("length required"),
    interiorColor: yup.string().required("interior color is required"),
    exteriorColor: yup.string().required("exterior color is required"),
    power: yup.string().required("power is required"),
    transmissionType: yup.string().required("transmission type is required"),
    fuelType: yup.string().required("fuel type is required"),
    extras: yup.string().required("extra is required"),
    carImage: yup.mixed().required("car image is required"),
  });
  const formikCar = useFormik({
    initialValues: {
      carName: "",
      carDescription: "",
      maxPassengers: 1,
      maxSuitcases: 0,
      carType: "",
      pricePerMile: 1,
      pricePerHour: 1,
      currency: "USD",
      engineType: "",
      length: 0,
      interiorColor: "",
      exteriorColor: "",
      power: "",
      transmissionType: "",
      fuelType: "",
      extras: "",
      carImage: null,
    },
    validationSchema: carValidationSchema,
    onSubmit: (values) => {
      handleCreateCar(values);
    },
  });
  const handleCreateCar = async (carData) => {
    const newCarData = _.omit(carData, "carImage");
    setCreateCarSuccess((prev) => ({
      ...prev,
      createCarLoading: true,
    }));
    await axios
      .post(`https://api.odatransportation.com/api/v1/cars`, newCarData)
      .then((response) => {
        const carId = response.data.carId;
        uploadCarImage(carId);
      })
      .catch((error) => {
        const errorText = error?.response
          ? error?.response.data.message
          : "Network Error";

        setCreateCarSuccess((prev) => ({
          ...prev,
          createCarLoading: false,
          isCreateCarSuccess: false,
        }));
        setCreateCarFail({
          isCreateCarFail: true,
          createCarFailMessage: errorText,
        });
      });
  };
  const uploadCarImage = async (carId) => {
    const carForm = new FormData();
    carForm.append("carImage", formikCar.values.carImage); // Assuming formikCar.values.carImage is the file object
    await axios
      .put(
        `https://api.odatransportation.com/api/v1/cars/${carId}/upload-image`,
        carForm
      )
      .then(() => {
        setCreateCarFail((prev) => ({ ...prev, isCreateCarFail: false }));
        setCreateCarSuccess({
          createCarLoading: false,
          isCreateCarSuccess: true,
          createCarSuccessMessage: "Car is successfully registered",
        });
        formikCar.resetForm();
      })
      .catch((error) => {
        setCreateCarSuccess((prev) => ({
          ...prev,
          createCarLoading: false,
          isCreateCarSuccess: false,
        }));
        setCreateCarFail({
          isCreateCarFail: true,
          createCarFailMessage: "Unable to register car!",
        });

        const errorText = error?.response
          ? error.response.data.message
          : "Network Error";
        console.log("errorText: ", errorText);
      });
  };
  return (
    <Box>
      <Box sx={{ backgroundColor: "#DDD", padding: 2, mb: 2 }}>
        <center>
          <Typography
            sx={{ fontSize: 20, color: "#03930A", fontWeight: "bold" }}
          >
            Add car
          </Typography>
        </center>
      </Box>
      <Box>
        <Grid
          container
          justifyContent={"flex-start"}
          alignItems={"center"}
          spacing={2}
        >
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"car name"}
              {...formikCar.getFieldProps("carName")}
              error={
                formikCar.touched.carName && Boolean(formikCar.errors.carName)
              }
              helperText={formikCar.touched.carName && formikCar.errors.carName}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"description"}
              {...formikCar.getFieldProps("carDescription")}
              error={
                Boolean(formikCar.errors.carDescription) &&
                formikCar.touched.carDescription
              }
              helperText={
                formikCar.touched.carDescription &&
                formikCar.errors.carDescription
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              type="number"
              fullWidth
              label={"max passengers"}
              {...formikCar.getFieldProps("maxPassengers")}
              error={
                Boolean(formikCar.errors.maxPassengers) &&
                formikCar.touched.maxPassengers
              }
              helperText={
                formikCar.touched.maxPassengers &&
                formikCar.errors.maxPassengers
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              type="number"
              fullWidth
              label={"max suitcase"}
              {...formikCar.getFieldProps("maxSuitcases")}
              error={
                Boolean(formikCar.errors.maxSuitcases) &&
                formikCar.touched.maxSuitcases
              }
              helperText={
                formikCar.touched.maxSuitcases && formikCar.errors.maxSuitcases
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"car type"}
              {...formikCar.getFieldProps("carType")}
              error={
                Boolean(formikCar.errors.carType) && formikCar.touched.carType
              }
              helperText={formikCar.touched.carType && formikCar.errors.carType}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"price per mile"}
              {...formikCar.getFieldProps("pricePerMile")}
              error={
                Boolean(formikCar.errors.pricePerMile) &&
                formikCar.touched.pricePerMile
              }
              helperText={
                formikCar.touched.pricePerMile && formikCar.errors.pricePerMile
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"price per hour"}
              {...formikCar.getFieldProps("pricePerHour")}
              error={
                Boolean(formikCar.errors.pricePerHour) &&
                formikCar.touched.pricePerHour
              }
              helperText={
                formikCar.touched.pricePerHour && formikCar.errors.pricePerHour
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"currency"}
              {...formikCar.getFieldProps("currency")}
              error={
                Boolean(formikCar.errors.currency) && formikCar.touched.currency
              }
              helperText={
                formikCar.touched.currency && formikCar.errors.currency
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"engine type"}
              {...formikCar.getFieldProps("engineType")}
              error={
                Boolean(formikCar.errors.engineType) &&
                formikCar.touched.engineType
              }
              helperText={
                formikCar.touched.engineType && formikCar.errors.engineType
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"length"}
              {...formikCar.getFieldProps("length")}
              error={
                Boolean(formikCar.errors.length) && formikCar.touched.length
              }
              helperText={formikCar.touched.length && formikCar.errors.length}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"interior color"}
              {...formikCar.getFieldProps("interiorColor")}
              error={
                Boolean(formikCar.errors.interiorColor) &&
                formikCar.touched.interiorColor
              }
              helperText={
                formikCar.touched.interiorColor &&
                formikCar.errors.interiorColor
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"exterior color"}
              {...formikCar.getFieldProps("exteriorColor")}
              error={
                Boolean(formikCar.errors.exteriorColor) &&
                formikCar.touched.exteriorColor
              }
              helperText={
                formikCar.touched.exteriorColor &&
                formikCar.errors.exteriorColor
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"power"}
              {...formikCar.getFieldProps("power")}
              error={Boolean(formikCar.errors.power) && formikCar.touched.power}
              helperText={formikCar.touched.power && formikCar.errors.power}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"transmission type"}
              {...formikCar.getFieldProps("transmissionType")}
              error={
                Boolean(formikCar.errors.transmissionType) &&
                formikCar.touched.transmissionType
              }
              helperText={
                formikCar.touched.transmissionType &&
                formikCar.errors.transmissionType
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"fuel type"}
              {...formikCar.getFieldProps("fuelType")}
              error={
                Boolean(formikCar.errors.fuelType) && formikCar.touched.fuelType
              }
              helperText={
                formikCar.touched.fuelType && formikCar.errors.fuelType
              }
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <TextField
              fullWidth
              label={"extras"}
              {...formikCar.getFieldProps("extras")}
              error={
                Boolean(formikCar.errors.extras) && formikCar.touched.extras
              }
              helperText={formikCar.touched.extras && formikCar.errors.extras}
            />
          </Grid>
          <Grid
            item
            xs={12}
            // sx={{
            //   display: "flex",
            //   flexDirection: "row",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   width: "90%",
            //  }}
          >
            <CarImagePreview formik={formikCar} />
          </Grid>
          <Grid item xs={12} px={2}>
            {createCarSuccess.isCreateCarSuccess && (
              <Alert severity={"success"}>
                {createCarSuccess.createCarSuccessMessage}
              </Alert>
            )}
            {createCarFail.isCreateCarFail && (
              <Alert severity={"error"}>
                {createCarFail.createCarFailMessage}
              </Alert>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color={"warning"}
              onClick={() => formikCar.handleSubmit()}
            >
              {createCarSuccess.createCarLoading ? (
                <CircularProgress size={20} sx={{color:"#FFF"}} />
              ) : (
                "Register Car"
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
