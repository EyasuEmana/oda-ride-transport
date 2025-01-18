import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Grid,
  FormLabel,
  FormControlLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import RSTextField from "../../../../components/RSTextField";
import RSRadio from "../../../../components/RSRadio";
import StepSummary from "../StepSummary";
import { getAllPreferences } from "../../../../store/actions/preferenceAction";
import { remote_host } from "../../../../globalVariable";
import {
  addAdditionalStopFee,
  addAirportPreferenceFee,
} from "../../../../store/reducers/bookReducers";
function Index({ formik, vehicleSummaryData, rideSummaryData }) {
  const [stopOnWay, setStopOnWay] = useState(false);
  const [additionalStopsOnTheWay, setAdditionalStopsOnTheWay] = useState([]);
  const { fee } = useSelector((state) => state.bookReducer);
  const getFormattdTime = (time) => {
    return time.format().substring(11, 19);
  };
  const location = useLocation();
  const dispatch = useDispatch();
  const { preferences } = useSelector((state) => state.preferenceReducer);
  var travelType = location.pathname.split("/").pop();
  const tripType = rideSummaryData.tripType;
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

  const isPointToPointTravel = travelType === "2";
  const isAirportTravel = travelType === "1";
  const isHourlyTravel = travelType === "3";

  const isRoundTrip = () => {
    return (
      (tripType == "Round-Trip" ||
        tripType == "Ride to the airport(round trip)" ||
        tripType == "Ride from the airport(round trip)") &&
      !(travelType === "3")
    );
  };
  const getAdditionalAtStopOnTheWay = async () => {
    await axios
      .get(`${remote_host}/api/v1/additional-stops`)
      .then((res) => {
        setAdditionalStopsOnTheWay(res.data);
      })
      .catch((error) =>
        console.log("error: ", "error while loading additional stop on the way")
      );
  };



  const handleStopOnWayChange = (event) => {
    formik.setFieldValue("additionalStopId", event.target.value);
    var stopOnWayFee = parseFloat(event.target.name);
    var prevAddtionalStopOnTheWayFee =
      formik.values.prevAddtionalStopOnTheWayFee;
    formik.setFieldValue("stopOnWayFee", stopOnWayFee);
    dispatch(
      addAdditionalStopFee({ stopOnWayFee, prevAddtionalStopOnTheWayFee })
    );
    formik.setFieldValue("prevAddtionalStopOnTheWayFee", stopOnWayFee);
  };



  useEffect(() => {
    getAdditionalAtStopOnTheWay();
    dispatch(getAllPreferences());
  }, []);


  return (
    <Box>
      <Grid
        container
        direction={{ xs: "column-reverse", lg: "row" }}
        spacing={1}
      >
        <Grid item xs={3}>
          <StepSummary
            rideSummaryData={rideSummaryData}
            vehicleSummaryData={vehicleSummaryData}
            tripSummaryData={[]}
            contactSummaryData={[]}
          />
        </Grid>
        <Grid item xs={8} mt={-1}>
          <Stack direction={"column"} spacing={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker", "TimePicker"]}>
                <DatePicker
                  label="Pickup Date"
                  disablePast
                  value={formik.values.pickupDate}
                  onChange={(date) => {
                    formik.setFieldValue("pickupDate", date);
                    formik.setFieldValue(
                      "formattedPickupDate",
                      date && date.format().substring(0, 10)
                    );
                  }}
                  onBlur={formik.handleBlur}
                  onError={
                    formik.touched.formattedPickupDate &&
                    Boolean(formik.errors.formattedPickupDate)
                  }
                  slotProps={erroSlot("formattedPickupDate")}
                />

                <TimePicker
                  label="Pickup time"
                  value={formik.values.pickupTime}
                  onChange={(time) => {
                    formik.setFieldValue("pickupTime", time);
                    time &&
                      formik.setFieldValue(
                        "formattedPickupTime",
                        getFormattdTime(time)
                      );
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.formattedPickupTime &&
                    Boolean(formik.errors.formattedPickupTime)
                  }
                  sx={{ width: "100%" }}
                  slotProps={erroSlot("formattedPickupTime")}
                />
              </DemoContainer>
            </LocalizationProvider>
            {isRoundTrip() && (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker", "TimePicker"]}>
                  <DatePicker
                    disablePast
                    label="Return Pickup Date"
                    value={formik.values.returnPickupDate}
                    onChange={(date) => {
                      formik.setFieldValue("returnPickupDate", date);
                      formik.setFieldValue(
                        "formattedReturnPickupDate",
                        date && date.format().substring(0, 10)
                      );
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.formattedReturnPickupDate &&
                      Boolean(formik.errors.formattedReturnPickupDate)
                    }
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("formattedReturnPickupDate")}
                  />

                  <TimePicker
                    label="Return Pickup Time"
                    value={formik.values.returnPickupTime}
                    onChange={(time) => {
                      formik.setFieldValue("returnPickupTime", time);
                      time &&
                        formik.setFieldValue(
                          "formattedReturnPickupTime",
                          getFormattdTime(time)
                        );
                    }}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.formattedReturnPickupTime &&
                      Boolean(formik.errors.formattedReturnPickupTime)
                    }
                    sx={{ width: "100%" }}
                    slotProps={erroSlot("formattedReturnPickupTime")}
                  />
                </DemoContainer>
              </LocalizationProvider>
            )}


            {isAirportTravel && (
              <RSTextField
                fullWidth
                color="info"
                name="airline"
                onBlur={formik.handleBlur}
                label="Airline (arrival)"
                value={formik.values.airline}
                onChange={formik.handleChange}
                error={formik.touched.airline && Boolean(formik.errors.airline)}
                helperText={formik.touched.airline && formik.errors.airline}
                multiline
              />
            )}
            {isAirportTravel && (
              <RSTextField
                fullWidth
                color="info"
                name="arrivalFlightNumber"
                onBlur={formik.handleBlur}
                label="Flight Number (arrival)"
                value={formik.values.arrivalFlightNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.arrivalFlightNumber &&
                  Boolean(formik.errors.arrivalFlightNumber)
                }
                helperText={
                  formik.touched.arrivalFlightNumber &&
                  formik.errors.arrivalFlightNumber
                }
                multiline
              />
            )}






            {isAirportTravel && isRoundTrip() && (
              <RSTextField
                fullWidth
                color="info"
                name="returnAirline"
                onBlur={formik.handleBlur}
                label="airline (return)"
                value={formik.values.returnAirline}
                onChange={formik.handleChange}
                error={formik.touched.returnAirline && Boolean(formik.errors.returnAirline)}
                helperText={formik.touched.returnAirline && formik.errors.returnAirline}
                multiline
              />
            )}
            {isAirportTravel && isRoundTrip() && (
              <RSTextField
                fullWidth
                color="info"
                name="returnFlightNumber"
                onBlur={formik.handleBlur}
                label="Flight Number (return)"
                value={formik.values.returnFlightNumber}
                onChange={formik.handleChange}
                error={
                  formik.touched.returnFlightNumber &&
                  Boolean(formik.errors.returnFlightNumber)
                }
                helperText={
                  formik.touched.returnFlightNumber &&
                  formik.errors.returnFlightNumber
                }
                multiline
              />
            )}







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
            {isAirportTravel && (
              <FormControl fullWidth>
                <FormLabel sx={{ color: "info" }}>
                  Airport Pickup Preference :
                </FormLabel>
                <RadioGroup
                  row
                  defaultValue={1}
                  name="pickupPreference"
                  onBlur={formik.handleBlur}
                  label="Special pickupPreferences"
                  value={formik.values.pickupPreference}
                  onChange={(e) => {
                    formik.setFieldValue("pickupPreference", e.target.value);
                    const prefFee = parseFloat(
                      preferences[e.target.name].preferencePrice
                    );
                    const prevPrefFee = formik.values.prevPickupPrefValue;
                    dispatch(addAirportPreferenceFee({ prefFee, prevPrefFee }));
                    formik.setFieldValue("prevPickupPrefValue", prefFee);
                    formik.setFieldValue("pickupPreferenceFee", prefFee);
                  }}
                  error={
                    formik.touched.pickupPreference &&
                    Boolean(formik.errors.pickupPreference)
                  }
                  helperText={
                    formik.touched.pickupPreference &&
                    formik.errors.pickupPreference
                  }
                >
                  {preferences?.map((preference, key) => (
                    <FormControlLabel
                      key={preference.pickupPreferenceId}
                      value={preference.pickupPreferenceId}
                      name={key}
                      control={<RSRadio />}
                      label={`${preference.preferenceName} ($${preference.preferencePrice})`}
                    />
                  ))}
                </RadioGroup>

                {formik.touched.pickupPreference && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.pickupPreference}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {isHourlyTravel && (
              <FormControl fullWidth color="info">
                <InputLabel id="occation">Occation</InputLabel>
                <Select
                  label="occation"
                  name="occation"
                  value={formik.values.occation}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.occation && Boolean(formik.errors.occation)
                  }
                >
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="tour">Tour</MenuItem>
                  <MenuItem value="prom">Promotion</MenuItem>
                  <MenuItem value="gradiation">Graduation</MenuItem>
                  <MenuItem value="concert">Concert</MenuItem>
                </Select>
                {formik.touched.occation && formik.errors.occation && (
                  <FormHelperText sx={{ color: "#F00" }}>
                    {formik.errors.occation}
                  </FormHelperText>
                )}
              </FormControl>
            )}



            {( isAirportTravel || isPointToPointTravel) && (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={stopOnWay}
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        setStopOnWay(e.target.checked);
                        formik.setFieldValue("additionalStopId", 0);
                        formik.setFieldValue(
                          "additionalStopOnTheWayDescription",
                          ""
                        );
                        if (!isChecked) {

                          var stopOnWayFee = formik.values.stopOnWayFee;
                          dispatch(
                            addAdditionalStopFee({
                              stopOnWayFee: 0,
                              prevAddtionalStopOnTheWayFee: stopOnWayFee,
                            })
                          );
                          formik.setFieldValue(
                            "prevAddtionalStopOnTheWayFee",
                            0
                          );
                          formik.setFieldValue("stopOnWayFee", 0);
                          formik.setFieldValue("additionalStopId", 0)
                        }
                      }}
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
                          name="radio-buttons-group"
                          onChange={handleStopOnWayChange}
                        >
                          {additionalStopsOnTheWay.map((stopOnWay) => {
                            stopOnWay.hidden =
                              stopOnWay.stopType == "Roundtrip" &&
                              !isRoundTrip();
                            return (
                              !stopOnWay.hidden && (
                                <FormControlLabel
                                  key={stopOnWay.additionalStopId}
                                  value={stopOnWay.additionalStopId}
                                  name={stopOnWay.additionalStopPrice}
                                  control={<RSRadio />}
                                  label={
                                    stopOnWay.stopType +
                                    " (" +
                                    stopOnWay.additionalStopPrice +
                                    " " +
                                    stopOnWay.currency +
                                    ")"
                                  }
                                />
                              )
                            );
                          })}
                        </RadioGroup>

                      </FormControl>
                      <RSTextField
                        color="info"
                        label="Let's know where you'd like to stop on the way"
                        multiline
                        rows={3}
                        fullWidth
                        {...formik.getFieldProps(
                          "additionalStopOnTheWayDescription"
                        )}
                        error={
                          formik.touched.additionalStopOnTheWayDescription &&
                          Boolean(
                            formik.errors.additionalStopOnTheWayDescription
                          )
                        }
                        helperText={
                          formik.touched.additionalStopOnTheWayDescription &&
                          formik.errors.additionalStopOnTheWayDescription
                        }
                      />
                    </Stack>
                  </Box>
                )}
              </>
            )}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
