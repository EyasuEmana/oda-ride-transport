import React, { useState } from "react";
import { Box, Grid, FormControlLabel, Checkbox } from "@mui/material";
import RSTextField from "../../../../components/RSTextField";
function Index({ formik }) {
  const [stopOnWay, setStopOnWay] = useState(true);

  return (
    <Box>
      <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={3}>
          summary
        </Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={6}>
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
          </Grid>
          <Grid container item xs={12} spacing={2}>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    color="info"
                    checked={stopOnWay}
                    onChange={(e) => setStopOnWay(e.target.checked)}
                  />
                }
                label="I'm not the passenger. I'm booking this for someone else."
              />
            </Grid>
            {stopOnWay && (
              <>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger First Name"
                    color={"info"}
                    fullWidth
                    {...formik.getFieldProps("passengerFirstName")}
                    error={
                      formik.touched.passengerFirstName &&
                      Boolean(formik.errors.passengerFirstName)
                    }
                    helperText={
                      formik.touched.passengerFirstName &&
                      formik.errors.passengerFirstName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger Last Name"
                    color={"info"}
                    fullWidth
                    {...formik.getFieldProps("passengerLastName")}
                    error={
                      formik.touched.passengerLastName &&
                      Boolean(formik.errors.passengerLastName)
                    }
                    helperText={
                      formik.touched.passengerLastName &&
                      formik.errors.passengerLastName
                    }
                  />
                </Grid>
                <Grid item xs={6}>
                  <RSTextField
                    label="Passenger Cell Phone"
                    color={"info"}
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
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
