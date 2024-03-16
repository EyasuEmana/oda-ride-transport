import React, { useState } from "react";
import { Stack, Grid, FormControlLabel, Checkbox } from "@mui/material";
import RSTextField from "../../../../components/RSTextField";
import StepSummary from "../StepSummary";
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
    <Grid container direction={{ xs: "column-reverse", lg: "row" }} spacing={1}>
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
    </Grid>
  );
}

export default Index;

{
  /* <Grid item xs={6}>
            <RSTextField
              label="First Name"
              color={"info"}
              fullWidth
              {...formik.getFieldProps("firstName")}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="Last Name"
              color={"info"}
              fullWidth
              {...formik.getFieldProps("lastName")}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="Email"
              color={"info"}
              fullWidth
              {...formik.getFieldProps("email")}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="Confirm Email"
              color={"info"}
              fullWidth
              {...formik.getFieldProps("confirmEmail")}
              error={
                formik.touched.confirmEmail &&
                Boolean(formik.errors.confirmEmail)
              }
              helperText={
                formik.touched.confirmEmail && formik.errors.confirmEmail
              }
            />
          </Grid>
          <Grid item xs={6}>
            <RSTextField
              label="Your Cell Phone"
              color={"info"}
              fullWidth
              {...formik.getFieldProps("cellPhone")}
              error={
                formik.touched.cellPhone && Boolean(formik.errors.cellPhone)
              }
              helperText={formik.touched.cellPhone && formik.errors.cellPhone}
            />
          </Grid> */
}
