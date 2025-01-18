import React, { useMemo, useEffect, useState } from "react";
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
import RSTypography from "../../../../components/RSTypography";
import ExtraOptionComponent from "./ExtraOptionComponent";
import { updateCars } from "../../../../store/reducers/carReducer";
import StepSummary from "../StepSummary";
import {
  adCarFee,
  addExtraOptionFee,
  reduceExtraOptionFee,
} from "../../../../store/reducers/bookReducers";
import { updateExtraOption } from "../../../../store/reducers/extraOptionReducer";
import { useLocation } from "react-router-dom";

function Index({ formik, rideSummaryData, hour, distanceInMiles }) {
  const dispatch = useDispatch();
  const location = useLocation();
  var travelType = location.pathname.split("/").pop();
  const [carType, setCarType] = useState("All Vehicles");
  const { cars, loading } = useSelector((state) => state.carReducer);
  const { fee } = useSelector((state) => state.bookReducer);
  const { extraOptions, loading_extra_option } = useSelector(
    (state) => state.extraOptionReducer
  );
  const carTypes = useMemo(() => ["All Vehicles", "Sedan", "SUV", "Van"]);

  const isRoundTrip = () => {
    var tripType = rideSummaryData.tripType;
    return (
      tripType == "Round-Trip" ||
      tripType == "Ride to the airport(round trip)" ||
      tripType == "Ride from the airport(round trip)"
    );
  };
  const handleCarSelect = (selectedCarId) => {
    const updatedCars = cars.map((car) => {
      if (car.carId == selectedCarId && formik?.vehicle != car.carId) {
        const prevSelectedCarFee = formik.values.vehicleFee;
        const prevCarMinimumStartFee = parseFloat(
          formik.values.prevCarMinimumStartFee
        );
        const minimumCarFee = parseFloat(car.minimumStartFee);
        var carPricePerMile = parseFloat(car.pricePerMile);
        var calculatedCarFee = 0;
        if (travelType == "1" || travelType == "2") {
          if (isRoundTrip()) {
            calculatedCarFee =
              fee -
              (prevSelectedCarFee * distanceInMiles * 2 +
                prevCarMinimumStartFee) +
              (carPricePerMile * distanceInMiles * 2 + minimumCarFee);
          } else {
            calculatedCarFee =
              fee -
              (prevSelectedCarFee * distanceInMiles + prevCarMinimumStartFee) +
              (carPricePerMile * distanceInMiles + minimumCarFee);
          }
        } else if (travelType == "3") {
          calculatedCarFee =
            fee -
            (prevSelectedCarFee * hour + prevCarMinimumStartFee) +
            (parseFloat(car.pricePerHour) * hour + minimumCarFee);
        }
        dispatch(adCarFee(calculatedCarFee));
      }
      return {
        ...car,
        isSelected: car.carId == selectedCarId,
      };
    });
    dispatch(updateCars(updatedCars));
  };

  const handleExtraOptionSelect = (selectedOptionId) => {
    const updatedExtraOptions = extraOptions.map((option) => {
      if (selectedOptionId == option.extraOptionId) {
        const extraOptionFee = formik.values.extraOptionFee;
        const priceMultiplier = isRoundTrip() ? 2 : 1;
        const pricePerExtraOption = parseFloat(option.pricePerItem) * priceMultiplier;
        
        formik.setFieldValue("extraOptionFee", extraOptionFee + pricePerExtraOption);
        dispatch(addExtraOptionFee(pricePerExtraOption));
        return {
          ...option,
          itemQuantity: 1,
          isSelected: selectedOptionId == option.extraOptionId,
        };
      } else return option;
    });
    dispatch(updateExtraOption(updatedExtraOptions));
  };

  const handleExtraOptionUnSelect = (selectedOptionId) => {
    const updatedExtraOptions = extraOptions.map((option) => {
      if (selectedOptionId == option.extraOptionId) {
        const extraOptionFee = formik.values.extraOptionFee;
        const priceMultiplier = isRoundTrip() ? 2 : 1;
        const pricePerExtraOption = parseFloat(option.pricePerItem) * option.itemQuantity * priceMultiplier;
        
        formik.setFieldValue("extraOptionFee", extraOptionFee - pricePerExtraOption);
        dispatch(reduceExtraOptionFee(pricePerExtraOption));
        return {
          ...option,
          itemQuantity: 0,
          isSelected: false,
        };
      } else return option;
    });
    dispatch(updateExtraOption(updatedExtraOptions));
  };

  const addExtraOptionQuantity = (selectedOptionId) => {
    const updatedExtraOptions = extraOptions.map((option) => {
      if (selectedOptionId == option.extraOptionId) {
        const extraOptionFee = formik.values.extraOptionFee;
        const priceMultiplier = isRoundTrip() ? 2 : 1;
        const pricePerExtraOption = parseFloat(option.pricePerItem) * priceMultiplier;
        
        formik.setFieldValue("extraOptionFee", extraOptionFee + pricePerExtraOption);
        dispatch(addExtraOptionFee(pricePerExtraOption));
        return {
          ...option,
          itemQuantity: option.itemQuantity + 1,
        };
      } else {
        return option;
      }
    });
    dispatch(updateExtraOption(updatedExtraOptions));
  };

  const reduceExtraOptionQuantity = (selectedOptionId) => {
    const updatedExtraOptions = extraOptions.map((option) => {
      if (selectedOptionId == option.extraOptionId) {
        const extraOptionFee = formik.values.extraOptionFee;
        const priceMultiplier = isRoundTrip() ? 2 : 1;
        const pricePerExtraOption = parseFloat(option.pricePerItem) * priceMultiplier;
        
        formik.setFieldValue("extraOptionFee", extraOptionFee - pricePerExtraOption);
        dispatch(reduceExtraOptionFee(pricePerExtraOption));
        return {
          ...option,
          itemQuantity: option.itemQuantity - 1,
        };
      } else {
        return option;
      }
    });
    dispatch(updateExtraOption(updatedExtraOptions));
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
                  <MenuItem key={carType} value={carType}>
                    {carType}
                  </MenuItem>
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
                  hour={hour}
                  distanceInMiles={distanceInMiles}
                  isRoundTrip={isRoundTrip}
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
                <ExtraOptionComponent
                  key={option.extraOptionId}
                  option={option}
                  formik={formik}
                  handleExtraOptionSelect={handleExtraOptionSelect}
                  handleExtraOptionUnSelect={handleExtraOptionUnSelect}
                  addExtraOptionQuantity={addExtraOptionQuantity}
                  reduceExtraOptionQuantity={reduceExtraOptionQuantity}
                />
              ))}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
