import React, {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useState,
} from "react";

import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  TextField,
  InputAdornment,
  Button,
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";

import {
  useLoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";

// import { google } from "@types/google.maps";
import { GrLocation } from "react-icons/gr";
import { TbCurrentLocation } from "react-icons/tb";
import { MdOutlineHotel } from "react-icons/md";
import RSRadio from "../../../../components/RSRadio";
import { useParams } from "react-router-dom";
import RSTypography from "../../../../components/RSTypography";
const libraries = ["places"];

function Index({ formik, handleChangeTripType, selectedTripType }) {
  const [trip, setTrip] = React.useState();
  const [latLng, setLatLng] = useState(null);
  const [searchOriginResult, setSearchOriginResult] = useState(null);
  const [searchDestinationResult, setSearchDestinationResult] = useState(null);
  const [originLatLng, setOriginLatLng] = useState();
  const [directionsResponse, setDirectionsResponse] = useState();
  const [destinationLatLng, setDestinationLatLng] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const params = useParams();
  const travelType = params.id;
  const pickupAddressRef = useRef();
  const dropDownAddressRef = useRef();

  const center = useMemo(() => ({ lat: 50, lng: -80 }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();
  const pointToPointTripTypes = useMemo(() => ["One way", "Round trip"]);

  const airPorts = useMemo(
    () => ["Bole Airport", "Emirate Airport", "Kenya Airport", "Abuja Airport"],
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo",
    libraries: libraries,
  });
  useEffect(() => {
    getRoundTripMenuData();
  }, [selectedTripType]);

  useEffect(() => {
    // if (originLatLng && destinationLatLng) {
    calculateDistance(originLatLng, destinationLatLng);
    // }
  }, [originLatLng, destinationLatLng]);

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

  const calculateDistance = async () => {
    const google = window.google;
    const directionsService = new google.maps.DirectionsService();

    await directionsService
      .route({
        origin: originLatLng,
        destination: destinationLatLng,
        travelMode: google.maps.TravelMode["DRIVING"],
      })
      .then((response) => {
        setDirectionsResponse(response);
        setDistance(response.routes[0].legs[0].distance.text);
        setDuration(response.routes[0].legs[0].duration.text);
      });
    // .catch((e) => window.alert("Directions request failed due to "));
    // }
    console.log("response is: ", directionsResponse);
  };

  const getTripType = () => {
    if (travelType == 1) {
      return "point-to-point";
    }
    if (travelType == 2) {
      return "airport";
    }
  };

  const handleMapClick = async (e) => {
    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          console.log(results[0].formatted_address); // Location name
          console.log(latLng); // Latitude and Longitude
          setLatLng(latLng);
        } else {
          console.log("No results found");
        }
      } else {
        console.log(`Geocoder failed due to: ${status}`);
      }
    });
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

  function onOriginChanged() {
    if (searchOriginResult != null) {
      //variable to store the result
      const place = searchOriginResult.getPlace();
      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setOriginLatLng(latlng);
      const name = place.name;
      const status = place.business_status;
      const formattedAddress = place.formatted_address;
    } else {
      alert("Please enter text");
    }
  }

  function onDestinationChanged() {
    if (searchDestinationResult != null) {
      const place = searchDestinationResult.getPlace();
      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setDestinationLatLng(latlng);
    } else {
      alert("Please enter text");
    }
  }
  function onLoadOriginFunc(autocomplete) {
    setSearchOriginResult(autocomplete);
  }
  function onLoadDestinationFunc(autocomplete) {
    setSearchDestinationResult(autocomplete);
  }
  if (!isLoaded) return <>loading</>;

  return (
    <Box>
      <Grid
        container
        justifyContent={{ lg: "space-between", sm: "center" }}
        spacing={2}
      >
        <Grid item xs={10} md={5}>
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

            {(travelType == 1 || travelType == 3) && isLoaded && (
              <Autocomplete
                onPlaceChanged={onOriginChanged}
                onLoad={onLoadOriginFunc}
              >
                <TextField
                  label="Select pickup address"
                  fullWidth
                  name="pickUpAddress"
                  ref={pickupAddressRef}
                  // value={formik.values.pickUpAddress}
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
              </Autocomplete>
            )}

            {(travelType == 1 || travelType == 3) && (
              <Autocomplete
                onPlaceChanged={onDestinationChanged}
                onLoad={onLoadDestinationFunc}
              >
                <TextField
                  fullWidth
                  label="Select Dropoff address"
                  name="dropOffAddress"
                  ref={dropDownAddressRef}
                  // value={formik.values.dropOffAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dropOffAddress &&
                    Boolean(formik.errors.dropOffAddress)
                  }
                  helperText={
                    formik.touched.dropOffAddress &&
                    formik.errors.dropOffAddress
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <TbCurrentLocation />
                      </InputAdornment>
                    ),
                  }}
                />
              </Autocomplete>
            )}

            {travelType == 2 && (
              <Autocomplete types={["lodging"]}>
                <TextField
                  label="Select Hotel"
                  fullWidth
                  name="hotel"
                  // value={formik.values.hotel}
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
              </Autocomplete>
            )}
          </Stack>
        </Grid>

        <Grid item xs={6}>
          <Stack
            direction={"column"}
            justifyContent={"space-between"}
            spacing={2}
            sx={{ width: "100%", height: "100%" }}
          >
            <GoogleMap
              zoom={3}
              center={center}
              onLoad={onLoad}
              mapContainerStyle={{ width: "100%", height: "100%" }}
              mapContainerClassName="map-container"
              onClick={handleMapClick}
            >
              {latLng && <Marker position={latLng} />}

              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={"space-between"}
            >
              {<RSTypography>distance: {distance}</RSTypography>}
              {<RSTypography>duration: {duration}</RSTypography>}
            </Stack>
          </Stack>
        </Grid>
        {/* <Grid item xs={12} >
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent={"space-between"}
            >
              {<RSTypography>distance: {distance}</RSTypography>}
              {<RSTypography>duration: {duration}</RSTypography>}
            </Stack>
          </Grid> */}
      </Grid>
    </Box>
  );
}

export default Index;
