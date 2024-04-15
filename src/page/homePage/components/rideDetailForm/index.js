import React, { useEffect, useMemo } from "react";
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormLabel,
  useTheme,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useNavigate } from "react-router-dom";
import { GrLocation } from "react-icons/gr";
import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineHotel } from "react-icons/md";
import { GiCheckMark } from "react-icons/gi";
import { MdRadioButtonUnchecked } from "react-icons/md";
import RSRadio from "../../../../components/RSRadio";
import { useParams } from "react-router-dom";
import GoogleMap from "../googleMap/index";
function Index({ formik }) {
  const [trip, setTrip] = React.useState();
  const [selectedTripType, setSelectedTripType] = React.useState();
  const params = useParams();
  const travelType = params.id;
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    ready,
    value,
    setValue,
    suggestions,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleChangeTripType = (event) => {
    navigate(`/home/${event.target.value}`);
    setSelectedTripType(params.id);
  };
  const airportServiceTripTypes = useMemo(
    () => [
      "Ride to the airport(one way)",
      "Ride from the airport(one way)",
      "Ride to the airport(round trip)",
      "Ride from the airport(round trip)",
      "Ride from the airport(round trips with two different airports)",
    ],
    []
  );
  const pointToPointTripTypes = useMemo(() => ["One way", "Round trip"]);
  const airPorts = useMemo(
    () => ["Bole Airport", "Emirate Airport", "Kenya Airport", "Abuja Airport"],
    []
  );
  const getTripType = () => {
    if (travelType == 1) {
      return "point-to-point";
    }
    if (travelType == 2) {
      return "airport";
    }
  };
  const getRoundTripMenuData = () => {
    const tripType = getTripType();
    switch (tripType) {
      case "airport":
        setTrip(airportServiceTripTypes);
        break;
      case "point-to-point":
        setTrip(pointToPointTripTypes);
        break;
      default:
        setTrip(null);
        break;
    }
  };

  const handleSelect = ({ description }) => {
    setValue(description, false);
    clearSuggestions();

    // Get latitude and longitude of the selected place
    getGeocode({ address: description })
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log("Coordinates: ", { lat, lng });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  useEffect(() => {
    getRoundTripMenuData();
  }, [selectedTripType]);
  // useEffect(() => {
  //   console.log("suggestions:", suggestions);
  // }, [value]);
  return (
    <Box>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={5}>
          <Stack direction={"column"} spacing={2}>
            <FormControl fullWidth>
              <FormLabel sx={{ color: "info" }}>Trip Type</FormLabel>
              <RadioGroup
                row
                defaultValue={travelType}
                name="radio-buttons-group"
                onChange={handleChangeTripType}
              >
                <FormControlLabel
                  value={1}
                  control={<RSRadio />}
                  label="Point to Point"
                />
                <FormControlLabel
                  value={2}
                  control={<RSRadio />}
                  label="Airport Service"
                />
                <FormControlLabel
                  value={3}
                  control={<RSRadio />}
                  label="Hourly Based"
                />
              </RadioGroup>
            </FormControl>
            {console.log("travelType == point to point: ", travelType == 1)}
            {(travelType == 1 || travelType == 2) && (
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-helper-label">
                  Select one way or round trip
                </InputLabel>
                <Select
                  label="Select one way or round trip"
                  name="tripType"
                  value={formik.values.tripType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.tripType && Boolean(formik.errors.tripType)
                  }
                  helperText={formik.touched.tripType && formik.errors.tripType}
                >
                  {trip?.map((key) => (
                    <MenuItem value={key}>{key}</MenuItem>
                  ))}
                </Select>
                {formik.touched.tripType && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.tripType}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {travelType == 2 && (
              <FormControl fullWidth>
                <InputLabel id="airport label">Select Airport</InputLabel>
                <Select
                  label="Select Airport"
                  name="airPort"
                  value={formik.values.airPort}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.airPort && Boolean(formik.errors.airPort)
                  }
                  helperText={formik.touched.airPort && formik.errors.airPort}
                >
                  {airPorts?.map((key) => (
                    <MenuItem value={key}>{key}</MenuItem>
                  ))}
                </Select>
                {formik.touched.airPort && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.airPort}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {travelType == 3 && (
              <FormControl fullWidth>
                <InputLabel id="hour label">Select Hours</InputLabel>
                <Select
                  // value={selectedTrip}
                  label="Select Hours"
                  // onChange={handleChange}
                  name="hour"
                  value={formik.values.hour}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.hour && Boolean(formik.errors.hour)}
                  helperText={formik.touched.hour && formik.errors.hour}
                >
                  {Array.from({ length: 24 }, (_, index) => (
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  ))}
                </Select>
                {formik.touched.hour && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.hour}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {(travelType == 1 || travelType == 3) && (
              <TextField
                label="Select pickup address"
                fullWidth
                name="pickUpAddress"
                value={formik.values.pickUpAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.pickUpAddress &&
                  Boolean(formik.errors.pickUpAddress)
                }
                helperText={
                  formik.touched.pickUpAddress && formik.errors.pickUpAddress
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GrLocation />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {(travelType == 1 || travelType == 3) && (
              <TextField
                fullWidth
                label="Select Dropoff address"
                name="dropOffAddress"
                value={formik.values.dropOffAddress}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.dropOffAddress &&
                  Boolean(formik.errors.dropOffAddress)
                }
                helperText={
                  formik.touched.dropOffAddress && formik.errors.dropOffAddress
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TbCurrentLocation />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {travelType == 2 && (
              <TextField
                label="Select Hotel"
                fullWidth
                name="hotel"
                value={formik.values.hotel}
                onChange={formik.handleChange}
                error={formik.touched.hotel && Boolean(formik.errors.hotel)}
                helperText={formik.touched.hotel && formik.errors.hotel}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdOutlineHotel />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <GoogleMap />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
