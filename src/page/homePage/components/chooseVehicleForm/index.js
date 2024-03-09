import React, { useMemo, useEffect } from "react";
import {
  Box,
  Grid,
  Stack,
  Alert,
  MenuItem,
  Select,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@mui/material";
import CarComponent from "./CarComponent";
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../../../store/actions/bookActions";
import { updateCars } from "../../../../store/reducers/bookReducers";
import RSTypography from "../../../../components/RSTypography";
import ExtraOptionComponent from "./ExtraOptionComponent";
import { getExtraOptions } from "../../../../store/actions/extraOptions";
import extraOptions from "./options";

function Index({ formik }) {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.bookReducer);
  // const { extraOptions } = useSelector((state) => state.extraOptionReducer);
  const carTypes = useMemo(() => [
    "All Vehicles",
    "Limousis",
    "Sedan",
    "Stretch Limousis",
    "SUV",
    "Van",
  ]);
  const handleCarSelect = (selectedCarId) => {
    const updatedCars = cars.map((car) => ({
      ...car,
      isSelected: car.id === selectedCarId,
    }));
    dispatch(updateCars(updatedCars));
  };

  useEffect(() => {
    dispatch(getCars());
    dispatch(getExtraOptions());
  }, []);
  useEffect(() => {
    console.log("extraOptions: ", extraOptions);
  }, [extraOptions]);
  return (
    <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
      <Grid item xs={3}>
        Summary
      </Grid>
      <Grid item container xs={8} spacing={2} justifyContent={"center"}>
        <Grid item xs={12}>
          <Box
            sx={{ width: "100%", backgroundColor: "#CCC", padding: 2, mb: 1 }}
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

              <Select label="TYPE">
                {carTypes.map((carType, index) => (
                  <MenuItem value={index}>{carType}</MenuItem>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
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
            {Boolean(formik.errors.vehicle) && (
              <Alert severity="error">{formik.errors.vehicle}</Alert>
            )}
            {cars?.map((car) => (
              <Box key={car.id}>
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
            {extraOptions.map((option) => (
              <ExtraOptionComponent option={option} formik={formik} />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;
