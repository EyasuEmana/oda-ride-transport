import React, { useMemo, useEffect, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Stack,
  Alert,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  CircularProgress,
  FormControl,
} from "@mui/material";
import CarComponent from "./CarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../../../store/actions/bookActions";
import RSTypography from "../../../../components/RSTypography";
import ExtraOptionComponent from "./ExtraOptionComponent";
import { getExtraOptions } from "../../../../store/actions/extraOptions";
import { getAllCars } from "../../../../store/actions/carAction";
import { updateCars } from "../../../../store/reducers/carReducer";
import Summary from "./SummaryTillVehicle";
import StepSummary from "../StepSummary";
import { addCost } from "../../../../store/reducers/bookReducers";

function Index({ formik, rideSummaryData }) {
  const dispatch = useDispatch();
  const [carType, setCarType] = useState("All Vehicles");
  const { cars, loading } = useSelector((state) => state.carReducer);
  const { extraOptions, loading_extra_option } = useSelector(
    (state) => state.extraOptionReducer
  );
  const carTypes = useMemo(() => [
    "All Vehicles",
    "Limousis",
    "Sedan",
    "Stretch Limousis",
    "SUV",
    "Van",
  ]);

  const handleCarSelect = (selectedCarId) => {
    const updatedCars = cars.map((car) => {
      console.log("price: ",car.pricePerHour)
      if (car.carId == selectedCarId)
        dispatch(addCost(parseInt(car.pricePerHour)));
      return {
        ...car,
        isSelected: car.carId == selectedCarId,
      };
    });
    dispatch(updateCars(updatedCars));
  };

  const handleChangeCarType = (e) => {
    setCarType(e.target.value);
  };
  const filterCars = () => {
    var filteredCars = [];
    filteredCars = cars?.filter(
      (car) =>
        car?.maxSuitcases >= formik.values.numberOfSuitcases &&
        car?.maxPassengers >= formik.values.numberOfPassengers &&
        (carType === "All Vehicles" ? true : car?.carType === carType)
    );

    return filteredCars;
  };

  useEffect(() => {
    const filteredCars = filterCars();
    const selectedCarIndex = filteredCars.findIndex(
      (car) => car.carId == formik.values.vehicle
    );

    if (selectedCarIndex < 0) {
      formik.setFieldValue("vehicle", null);
      handleCarSelect(-1);
    }
  }, [formik.values.numberOfSuitcases, formik.values.numberOfPassengers]);

  useEffect(() => {
    dispatch(getCars());
    dispatch(getAllCars());
    dispatch(getExtraOptions());
  }, []);

  return (
    <Grid container direction={{ xs: "column-reverse", lg: "row" }} spacing={1}>
      <Grid item xs={3}>
        <StepSummary
          rideSummaryData={rideSummaryData}
          vehicleSummaryData={[]}
          tripSummaryData={[]}
          contactSummaryData={[]}
        />
      </Grid>
      <Grid item container xs={8} spacing={2} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box
            sx={{ width: "100%", backgroundColor: "#DDD", padding: 2, mb: 1 }}
          >
            <RSTypography>Filter vehicles</RSTypography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            justifyContent={"space-between"}
            spacing={2}
          >
            <FormControl sx={{ width: "100%" }} color="info">
              <InputLabel>TYPE</InputLabel>

              <Select
                label="TYPE"
                value={carType}
                onChange={handleChangeCarType}
              >
                {carTypes.map((carType, index) => (
                  <MenuItem value={carType}>{carType}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ width: "100%" }} color="info">
              <InputLabel>SUITCASES</InputLabel>
              <Select
                label="SUITCASES"
                name="numberOfSuitcases"
                value={formik.values.numberOfSuitcases}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.numberOfSuitcases &&
                  Boolean(formik.errors.numberOfSuitcases)
                }
                helperText={
                  formik.touched.numberOfSuitcases &&
                  formik.errors.numberOfSuitcases
                }
              >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.numberOfSuitcases && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.numberOfSuitcases}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ width: "100%" }} color="info">
              <InputLabel>PASSENGERS</InputLabel>
              <Select
                label="PASSENGERS"
                name="numberOfPassengers"
                value={formik.values.numberOfPassengers}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.numberOfPassengers &&
                  Boolean(formik.errors.numberOfPassengers)
                }
                helperText={
                  formik.touched.numberOfPassengers &&
                  formik.errors.numberOfPassengers
                }
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.numberOfPassengers && (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.numberOfPassengers}
                </FormHelperText>
              )}
            </FormControl>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="column" spacing={2}>
            {formik.touched.vehicle && Boolean(formik.errors.vehicle) && (
              <Alert severity="error">{formik.errors.vehicle}</Alert>
            )}
            {loading && (
              <center>
                <CircularProgress color="info" />
              </center>
            )}
            {filterCars()?.map((car) => (
              <Box key={car.carId}>
                <CarComponent
                  carDetail={car}
                  formik={formik}
                  handleCarSelect={handleCarSelect}
                />
              </Box>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"column"} spacing={2}>
            <RSTypography fontsize={20}>Extra Options</RSTypography>
            {loading_extra_option && (
              <center>
                <CircularProgress color="info" />
              </center>
            )}
            {extraOptions &&
              extraOptions.map((option) => (
                <ExtraOptionComponent option={option} formik={formik} />
              ))}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
