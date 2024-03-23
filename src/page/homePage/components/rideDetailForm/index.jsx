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
  Select,
  MenuItem,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  FormHelperText,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  useLoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useSelector, useDispatch } from "react-redux";
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
  const [searchAccomodationResult, setSearchAccomodationResult] =
    useState(null);
  const [originLatLng, setOriginLatLng] = useState();
  const [airportLatLng, setAirportLatLng] = useState();
  const [accomodationtLatLng, setAccomodationLatLng] = useState();
  const [directionsResponse, setDirectionsResponse] = useState();
  const [destinationLatLng, setDestinationLatLng] = useState();
  const [distance, setDistance] = useState();
  const [duration, setDuration] = useState();
  const theme = useTheme();
  const matchXS = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();
  const travelType = params.id;
  const pickupPhysicalAddressRef = useRef();
  const dropDownAddressRef = useRef();
  const MILE_TO_KM = 1.60934;
  const center = useMemo(() => ({ lat: 50, lng: -80 }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();
  const pointToPointTripTypes = useMemo(() => ["One-Way", "Round-Trip"]);
  const { airports } = useSelector((state) => state.airportReducer);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo",
    libraries: libraries,
  });
  useEffect(() => {
    getRoundTripMenuData();
  }, [selectedTripType]);

  useEffect(() => {
    if (originLatLng && destinationLatLng) {
      calculateDistance();
    }
  }, [originLatLng, destinationLatLng]);

  useEffect(() => {
    if (airportLatLng && accomodationtLatLng) {
      calculateAirportDistance();
    }
  }, [airportLatLng, accomodationtLatLng]);

  const airportServiceTripTypes = useMemo(
    () => [
      "Ride to the airport(one way)",
      "Ride from the airport(one way)",
      "Ride to the airport(round trip)",
      "Ride from the airport(round trip)",
    ],
    []
  );

  const calculateDistance = async () => {
    const google = window.google;
    var directionsService = null;
    if (google) {
      directionsService = new google.maps.DirectionsService();

      await directionsService
        .route({
          origin: originLatLng,
          destination: destinationLatLng,
          travelMode: google.maps.TravelMode["DRIVING"],
        })
        .then((response) => {
          formik.setFieldValue(
            "distanceInMiles",
            (response.routes[0].legs[0].distance.value * 0.001) / MILE_TO_KM
          );
          setDirectionsResponse(response);
          console.log("distance: ", response.routes[0].legs[0].distance.value);
          const distanceInMile =
            response.routes[0].legs[0].distance.value / 1609.344;
          setDistance(distanceInMile.toFixed(2) + " Mile"); // in mile
          // setDistance(response.routes[0].legs[0].distance.text); in km
          setDuration(response.routes[0].legs[0].duration.text);
        });
    }
  };

  const calculateAirportDistance = async () => {
    const google = window.google;
    var directionsService = null;
    if (google) {
      directionsService = new google.maps.DirectionsService();
      console.log("airportLatLng: ", airportLatLng);
      console.log("accomodationtLatLng: ", accomodationtLatLng);
      await directionsService
        .route({
          origin: airportLatLng,
          destination: accomodationtLatLng,
          travelMode: google.maps.TravelMode["DRIVING"],
        })
        .then((response) => {
          console.log("response: ", response);
          formik.setFieldValue(
            "distanceInMiles",
            (response.routes[0].legs[0].distance.value * 0.001) / MILE_TO_KM
          );
          setDirectionsResponse(response);
          const distanceInMile =
            response.routes[0].legs[0].distance.value / 1609.344;
          setDistance(distanceInMile.toFixed(2) + " Mile"); // in mile
          setDuration(response.routes[0].legs[0].duration.text);
        })
        .catch((error) => console.log("error2: ", error));
    }
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
      if (status == "OK") {
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
      const place = searchOriginResult.getPlace();
      const pickupPhysicalAddress = place.formatted_address;

      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      formik.setFieldValue("pickupPhysicalAddress", pickupPhysicalAddress);
      formik.setFieldValue("pickupLatitude", latlng?.lat);
      formik.setFieldValue("pickupLongitude", latlng?.lng);
      setOriginLatLng(latlng);
      // const name = place.name;
      // const status = place.business_status;
      // const formattedAddress = place.formatted_address;
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
      const dropoffPhysicalAddress = place.formatted_address;
      formik.setFieldValue("dropoffPhysicalAddress", dropoffPhysicalAddress);
      formik.setFieldValue("dropoffLatitude", latlng?.lat);
      formik.setFieldValue("dropoffLongitude", latlng?.lng);

      setDestinationLatLng(latlng);
    } else {
      alert("Please enter text");
    }
  }

  function onAccommodationChange() {
    if (searchAccomodationResult != null) {
      const place = searchAccomodationResult.getPlace();
      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      console.log("place: ", place);
      // const accommodationAddress = place.formatted_address;
      const accommodationAddress = place.name;
      formik.setFieldValue("hotel", accommodationAddress);
      formik.setFieldValue("accommodationAddress", accommodationAddress);
      formik.setFieldValue("accommodationLatitude", latlng?.lat);
      formik.setFieldValue("accommodationLongitude", latlng?.lng);
      setAccomodationLatLng(latlng);
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
  function onLoadAccomodationFunc(autocomplete) {
    setSearchAccomodationResult(autocomplete);
  }
  function handleAirportChange(e) {
    formik.handleChange(e);
    const lat = e.target.value.airportAddressLatitude;
    const lng = e.target.value.airportAddressLongitude;
    formik.setFieldValue("airPortId", e.target.value.airportId);
    formik.setFieldValue("airportAddressLatitude", lat);
    formik.setFieldValue("airportAddressLongitude", lng);
    const airportLatLng = {
      lat: lat,
      lng: lng,
    };
    setAirportLatLng(airportLatLng);
  }

  if (!isLoaded) {
    return <>loading</>;
  }

  return (
    <Box>
      <Grid
        container
        justifyContent={{ lg: "space-between", sm: "center" }}
        spacing={2}
      >
        <Grid item md={5} xs={12}>
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
              <FormControl fullWidth color="info">
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
              <FormControl fullWidth color="info">
                <InputLabel id="airport label">Select Airport</InputLabel>
                <Select
                  label="Select Airport"
                  name="airportName"
                  value={formik.values.airportName}
                  onChange={(e) => handleAirportChange(e)}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.airportName &&
                    Boolean(formik.errors.airportName)
                  }
                  helperText={
                    formik.touched.airportName && formik.errors.airportName
                  }
                >
                  {airports?.map((airport, key) => (
                    <MenuItem value={airport}>{airport.airportName}</MenuItem>
                  ))}
                </Select>
                {formik.touched.airportName && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.airportName}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {travelType == 3 && (
              <FormControl fullWidth color="info">
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
                  color="info"
                  label="Select pickup address"
                  fullWidth
                  name="pickupPhysicalAddress"
                  value={formik.values.pickupPhysicalAddress}
                  ref={pickupPhysicalAddressRef}
                  // value={formik.values.pickupPhysicalAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pickupPhysicalAddress &&
                    Boolean(formik.errors.pickupPhysicalAddress)
                  }
                  helperText={
                    formik.touched.pickupPhysicalAddress &&
                    formik.errors.pickupPhysicalAddress
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
                  color="info"
                  fullWidth
                  label="Select Dropoff address"
                  name="dropoffPhysicalAddress"
                  ref={dropDownAddressRef}
                  // value={formik.values.dropoffPhysicalAddress}
                  value={formik.values.dropoffPhysicalAddress}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.dropoffPhysicalAddress &&
                    Boolean(formik.errors.dropoffPhysicalAddress)
                  }
                  helperText={
                    formik.touched.dropoffPhysicalAddress &&
                    formik.errors.dropoffPhysicalAddress
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
              <Autocomplete
                onPlaceChanged={onAccommodationChange}
                onLoad={onLoadAccomodationFunc}
                types={["lodging"]}
              >
                <TextField
                  label="Select Hotel"
                  fullWidth
                  name="accommodationAddress"
                  value={formik.values.accommodationAddress}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.accommodationAddress &&
                    Boolean(formik.errors.accommodationAddress)
                  }
                  helperText={
                    formik.touched.accommodationAddress &&
                    formik.errors.accommodationAddress
                  }
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

        <Grid item md={6} xs={12}>
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
              mapContainerStyle={{
                width: "100%",
                height: matchXS && 400,
              }}
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
              <RSTypography>Distance: {distance ? distance : "_"}</RSTypography>
              <RSTypography>Duration: {duration ? duration : "_"}</RSTypography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
