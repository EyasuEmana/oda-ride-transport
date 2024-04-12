import React, { useMemo, useEffect } from "react";
import { Box, Grid, Stack, Alert } from "@mui/material";
import CarComponent from "./CarComponent";
import { useDispatch, useSelector } from "react-redux";
import hyundaiVenue from "../../../../assets/images/Hyundail Venue.webp";
import lamborghini from "../../../../assets/images/Lamborghini.webp";
import landCriser from "../../../../assets/images/LandCriiser V8.jpg";
import { getCars } from "../../../../store/actions/bookActions";
import { updateCars } from "../../../../store/reducers/bookReducers";
import RSTypography from "../../../../components/RSTypography";
function Index({ formik }) {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state.bookReducer);

  const handleCarSelect = (selectedCarId) => {
    const updatedCars = cars.map((car) => ({
      ...car,
      isSelected: car.id === selectedCarId,
    }));
    dispatch(updateCars(updatedCars));
  };

  useEffect(() => {
    dispatch(getCars());
  }, []);
  return (
    <Box>
      <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={3}>
          Summary
        </Grid>
        <Grid item xs={8}>
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
      </Grid>
    </Box>
  );
}

export default Index;
