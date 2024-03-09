import React, { useState } from "react";
import {
  Box,
  Stack,
  Grid,
  FormControlLabel,
  FormControl,
  RadioGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import RSTextField from "../../../../components/RSTextField";
import RSRadio from "../../../../components/RSRadio";
function Index({ formik }) {
  const [stopOnWay, setStopOnWay] = useState(false);
  const getFormattdTime = (time) => {
    return time.format().substring(11, 19);
  };
  const erroSlot = (field) => {
    return {
      textField: {
        helperText:
          formik.touched[field] && formik.errors[field] && formik.errors[field],
        error: formik.touched[field] && Boolean(formik.errors[field]),
        sx: { color: "red" },
      },
    };
  };
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
                    onChange={(date) => {
                      formik.setFieldValue(
                        "pickupDate",
                        date && date.format().substring(0, 10)
                      );
                    }}
                    onBlur={formik.handleBlur}
                    onError={
                      formik.touched.pickupDate &&
                      Boolean(formik.errors.pickupDate)
                    }
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("pickupDate")}
                  />

                  <TimePicker
                    label="Pickup time"
                    value={formik.values.pickupTime}
                    onChange={(time) =>
                      time && formik.setFieldValue("pickupTime", time)
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.pickupTime &&
                      Boolean(formik.errors.pickupTime)
                    }
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("pickupTime")}
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
                      formik.setFieldValue(
                        "returnPickupDate",
                        date && date.format().substring(0, 10)
                      )
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.returnPickupDate &&
                      Boolean(formik.errors.returnPickupDate)
                    } 
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("returnPickupDate")}
                  />

                  <TimePicker
                    label="Return Pickup Time"
                    value={formik.values.returnPickupTime}
                    onChange={(time) =>
                      time &&
                      formik.setFieldValue(
                        "returnPickupTime",
                        getFormattdTime(time)
                      )
                    }
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.returnPickupTime &&
                      Boolean(formik.errors.returnPickupTime)
                    }
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("returnPickupTime")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <RSTextField
              fullWidth
              color="info"
              name="instruction"
              onBlur={formik.handleBlur}
              label="Special Instructions"
              value={formik.values.instruction}
              onChange={formik.handleChange}
              error={
                formik.touched.instruction && Boolean(formik.errors.instruction)
              }
              helperText={
                formik.touched.instruction && formik.errors.instruction
              }
              multiline
              rows={4}
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
