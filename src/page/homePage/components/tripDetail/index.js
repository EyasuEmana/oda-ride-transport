import React, { useState } from "react";
import {
  Box,
  Stack,
  Grid,
  TextField,
  FormControlLabel,
  FormControl,
  RadioGroup,
  Radio,
  FormLabel,
  Checkbox,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import RSButton from "../../../../components/RSButton";
import RSTypography from "../../../../components/RSTypography";
import RSTextField from "../../../../components/RSTextField";
import RSRadio from "../../../../components/RSRadio";
function Index({ formik }) {
  const [stopOnWay, setStopOnWay] = useState(false);
  return (
    <Box>
      <Grid container direction={{ xs: "column-reverse", lg: "row" }}>
        <Grid item xs={3}>
          summary
        </Grid>
        <Grid item xs={8}>
          <Stack direction={"column"} spacing={2}>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "TimePicker"]}>
                  <DatePicker
                    label="Pickup Date"
                    disablePast
                    value={formik.values.pickupDate}
                    onChange={(date) =>
                      formik.setFieldValue("pickupDate", date)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.pickupDate &&
                      Boolean(formik.errors.pickupDate)
                    }
                    helperText={
                      formik.touched.pickupDate && formik.errors.pickupDate
                    }
                    sx={{ width: "100%" }}
                  />
                  <TimePicker
                    label="Pickup time"
                    value={formik.values.pickupTime}
                    onChange={(time) =>
                      formik.setFieldValue("pickupTime", time)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.pickupTime &&
                      Boolean(formik.errors.pickupTime)
                    }
                    helperText={
                      formik.touched.pickupTime && formik.errors.pickupTime
                    }
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "TimePicker"]}>
                  <DatePicker
                    disablePast
                    label="Return Pickup Date"
                    value={formik.values.returnPickupDate}
                    onChange={(date) =>
                      formik.setFieldValue("returnPickupDate", date)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.returnPickupDate &&
                      Boolean(formik.errors.returnPickupDate)
                    }
                    helperText={
                      formik.touched.returnPickupDate &&
                      formik.errors.returnPickupDate
                    }
                    sx={{ width: "100%" }}
                  />
                  <TimePicker
                    label="Return Pickup Time"
                    value={formik.values.returnPickupTime}
                    onChange={(time) =>
                      formik.setFieldValue("returnPickupTime", time)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.returnPickupTime &&
                      Boolean(formik.errors.returnPickupTime)
                    }
                    helperText={
                      formik.touched.returnPickupTime &&
                      formik.errors.returnPickupTime
                    }
                    sx={{ width: "100%" }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <RSTextField
              label="Special Instructions"
              multiline
              rows={4}
              color="info"
            />
            <FormControlLabel
              control={
                <Checkbox
                  color="info"
                  checked={stopOnWay}
                  onChange={(e) => setStopOnWay(e.target.checked)}
                />
              }
              label="Additional stop on the way"
            />
            {stopOnWay && (
              <Box>
                <Stack direction={"column"} spacing={2}>
                  <FormControl>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="Oneway"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Oneway"
                        control={<RSRadio />}
                        label="Oneway (20$)"
                      />
                      <FormControlLabel
                        value="RoundTrip"
                        control={<RSRadio />}
                        label="RoundTrip (40$)"
                      />
                    </RadioGroup>
                  </FormControl>
                  <RSTextField
                    color="info"
                    label="Let's know where you'd like to stop on the way"
                    multiline
                    rows={3}
                  />
                </Stack>
              </Box>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
