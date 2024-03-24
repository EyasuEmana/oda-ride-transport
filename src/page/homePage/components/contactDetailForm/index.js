import React, { useState } from "react";
import { Stack, Grid, FormControlLabel, Checkbox, Box } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import RSTextField from "../../../../components/RSTextField";
import StepSummary from "../StepSummary";
import CreditCardForm from "./CreditCardForm";
function Index({
  formik,
  vehicleSummaryData,
  rideSummaryData,
  tripSummaryData,
}) {
  const [bookForPassenger, setBookForPassenger] = useState(
    formik.values.bookingFor == "SomeoneElse"
  );
  const handleBookForPassenger = (e) => {
    setBookForPassenger(e.target.checked);
    formik.setFieldValue(
      "bookingFor",
      e.target.checked ? "SomeoneElse" : "Myself"
    );
    if (!e.target.checked) {
      formik.handleReset();
    } else {
      formik.setFieldValue("passengerFullName", "");
      formik.setFieldValue("passengerCellPhone", "");
    }
  };
  return (
    <Grid
      container
      direction={{ xs: "column-reverse", lg: "row" }}
      spacing={1}
      justifyContent={"start"}
    >
      <Grid item xs={3}>
        <StepSummary
          rideSummaryData={rideSummaryData}
          vehicleSummaryData={vehicleSummaryData}
          tripSummaryData={tripSummaryData}
          contactSummaryData={[]}
        />
      </Grid>
      <Grid item xs={8} spacing={{ xs: 12, md: 6 }}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="info"
                checked={bookForPassenger}
                onChange={handleBookForPassenger}
              />
            }
            label="I'm booking this for someone else."
          />
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} spacing={2}>
            <RSTextField
              label="Passenger Full Name"
              color={"info"}
              fullWidth
              disabled={!bookForPassenger}
              {...formik.getFieldProps("passengerFullName")}
              error={
                formik.touched.passengerFullName &&
                Boolean(formik.errors.passengerFullName)
              }
              helperText={
                formik.touched.passengerFullName &&
                formik.errors.passengerFullName
              }
            />
            <RSTextField
              label="Passenger Phone number"
              color={"info"}
              disabled={!bookForPassenger}
              fullWidth
              {...formik.getFieldProps("passengerCellPhone")}
              error={
                formik.touched.passengerCellPhone &&
                Boolean(formik.errors.passengerCellPhone)
              }
              helperText={
                formik.touched.passengerCellPhone &&
                formik.errors.passengerCellPhone
              }
            />
          </Stack>
        </Grid>
        {/* <Grid item xs={12} mt={2}>
          <Stack direction={"row"} spacing={2}>
            <RSTextField label="Credit Card" color={"info"} fullWidth />
            <RSTextField label="Expiration Date" color={"info"} fullWidth />
            <RSTextField label="Security Code" color={"info"} fullWidth />
          </Stack>
        </Grid> */}
        <Grid item xs={12} mt={2}>
          <Box>
            <CreditCardForm />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Index;