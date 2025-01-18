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
  Alert,
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
import { useNavigate, useParams } from "react-router-dom";
import RSTypography from "../../../../components/RSTypography";
import {
  checkServiceLocation,
  isLocationInColifornia,
} from "../../../../util/locationUtil";
const libraries = ["places"];

function Index({
  formik,
  handleChangeTripType,
  selectedTripType,
  locationChecker,
  setLocationCkecker,
  setAccomAddrChecker,
  accomAddrChecker,
}) {
  const [trip, setTrip] = React.useState();
  const [latLng, setLatLng] = useState(null);
  const [searchOriginResult, setSearchOriginResult] = useState(null);
  const [searchDestinationResult, setSearchDestinationResult] = useState(null);
  const [searchAccomodationResult, setSearchAccomodationResult] =
    useState(null);
  const [directionsResponse, setDirectionsResponse] = useState();
  const theme = useTheme();
  const matchXS = useMediaQuery(theme.breakpoints.down("md"));

  const params = useParams();
  const travelType = params.id;
  const pickupPhysicalAddressRef = useRef();
  const dropDownAddressRef = useRef();
  const center = useMemo(() => ({ lat: 50, lng: -80 }), []);
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const mapRef = useRef();
  const pointToPointTripTypes = useMemo(() => ["One-Way", "Round-Trip"]);
  const { airports } = useSelector((state) => state.airportReducer);
  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyAgAp1RwiIqCyZZg63gsmyP6TZBuVxw_8c",
    googleMapsApiKey: "AIzaSyCvm85RFSLVS4DV7zBb1l0UlOJ1tpSXRPQ",

    libraries: libraries,
  });

  useEffect(() => {
    if (formik.values.pickupLatitude &&
      formik.values.pickupLongitude &&
      formik.values.dropoffLatitude &&
      formik.values.dropoffLongitude
    ) {
      calculateDistance();
    }
  }, [formik.values.pickupLatitude &&
    formik.values.pickupLongitude &&
    formik.values.dropoffLatitude &&
    formik.values.dropoffLongitude]);

  useEffect(() => {
    if (formik.values.airportAddressLatitude &&
      formik.values.airportAddressLongitude &&
      formik.values.accommodationLatitude &&
      formik.values.accommodationLongitude) {
      calculateAirportDistance();
    }
  }, [formik.values.airportAddressLatitude,
  formik.values.airportAddressLongitude,
  formik.values.accommodationLatitude,
  formik.values.accommodationLongitude]);

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
      const originLatLng = {
        lat: formik.values.pickupLatitude,
        lng: formik.values.pickupLongitude
      }
      const destinationLatLng = {
        lat: formik.values.dropoffLatitude,
        lng: formik.values.dropoffLongitude
      }

      await directionsService
        .route({
          origin: originLatLng,
          destination: destinationLatLng,
          travelMode: google.maps.TravelMode["DRIVING"],
        })
        .then((response) => {
          const distanceInMile =
            response.routes[0].legs[0].distance.value / 1609.344;
          formik.setFieldValue("distanceInMiles", distanceInMile.toFixed(2));
          setDirectionsResponse(response);
          formik.setFieldValue(
            "duration",
            response.routes[0].legs[0].duration.text
          );
        });
    }
  };

  const calculateAirportDistance = async () => {
    const google = window.google;
    var directionsService = null;
    if (google) {
      directionsService = new google.maps.DirectionsService();

      const airportLatLng = {
        lat: formik.values.airportAddressLatitude,
        lng: formik.values.airportAddressLongitude
      };

      const accomodationtLatLng = {
        lat: formik.values.accommodationLatitude,
        lng: formik.values.accommodationLongitude
      };

      await directionsService
        .route({
          origin: airportLatLng,
          destination: accomodationtLatLng,
          travelMode: google.maps.TravelMode["DRIVING"],
        })
        .then((response) => {
          const distanceInMile =
            response.routes[0].legs[0].distance.value / 1609.344;
          formik.setFieldValue("distanceInMiles", distanceInMile.toFixed(2));
          setDirectionsResponse(response);
          formik.setFieldValue(
            "duration",
            response.routes[0].legs[0].duration.text
          );
        })
        .catch((error) => console.log("error2: ", error));
    }
  };
  const getTripType = () => {
    if (travelType == 1) {
      return "airport";
    }
    if (travelType == 2) {
      return "point-to-point";
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

  useEffect(() => {
    getRoundTripMenuData();
  }, [selectedTripType]);

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
  // const checkServiceLocation = (addressComponents) => {
  //   var country = addressComponents.find((component) =>
  //     component.types.includes("country")
  //   )?.short_name;
  //   var administrativeArea = addressComponents.find((component) =>
  //     component.types.includes("administrative_area_level_1")
  //   )?.short_name;

  //   var isInCalifornia = country === "US" && administrativeArea === "CA";
  //   if (!isInCalifornia) navigate("/not-in-california");
  // };

  function onOriginChanged() {
    if (searchOriginResult != null) {
      const place = searchOriginResult.getPlace();
      const address_components = place.address_components;

      const isInUsa = isLocationInColifornia(address_components);

      const pickupPhysicalAddress = place.formatted_address;
      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      formik.setFieldValue("pickupPhysicalAddress", pickupPhysicalAddress);
      formik.setFieldValue("pickupLatitude", latlng?.lat);
      formik.setFieldValue("pickupLongitude", latlng?.lng);

      if (!isInUsa) {
        setLocationCkecker({
          isUnsupportedLocation: true,
          errorMessage: "pickup address should be in California, USA",
        });
        formik.setFieldValue("isUnsupportedPickupAddr", true);
      } else if (formik.values.isUnsupportedDropoffAddr) {
        setLocationCkecker({
          isUnsupportedLocation: true,
          errorMessage: "dropoff address should be in US",
        });
      }

      if (isInUsa) {
        if (formik.values.isUnsupportedDropoffAddr) {
          setLocationCkecker({
            isUnsupportedLocation: true,
            errorMessage: "dropoff address should be in US",
          });
        } else {
          setLocationCkecker({
            isUnsupportedLocation: false,
            errorMessage: "",
          });
        }
        formik.setFieldValue("isUnsupportedPickupAddr", false);
      }
    } else {
      alert("Please enter text");
    }
  }

  function onDestinationChanged() {
    if (searchDestinationResult != null) {
      const place = searchDestinationResult.getPlace();
      const address_components = place.address_components;

      const isInUsa = checkServiceLocation(address_components);

      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const dropoffPhysicalAddress = place.formatted_address;
      formik.setFieldValue("dropoffPhysicalAddress", dropoffPhysicalAddress);
      formik.setFieldValue("dropoffLatitude", latlng?.lat);
      formik.setFieldValue("dropoffLongitude", latlng?.lng);

      if (!isInUsa) {
        setLocationCkecker({
          isUnsupportedLocation: true,
          errorMessage: "dropoff address should be in US",
        });
        formik.setFieldValue("isUnsupportedDropoffAddr", true);
      } else if (formik.values.isUnsupportedPickupAddr) {
        setLocationCkecker({
          isUnsupportedLocation: true,
          errorMessage: "pickup address should be in California, USA",
        });
      }

      if (isInUsa) {
        if (formik.values.isUnsupportedPickupAddr) {
          setLocationCkecker({
            isUnsupportedLocation: true,
            errorMessage: "pickup address should be in California, USA",
          });
        } else {
          setLocationCkecker({
            isUnsupportedLocation: false,
            errorMessage: "",
          });
        }
        formik.setFieldValue("isUnsupportedDropoffAddr", false);
      }
    } else {
      alert("Please enter text");
    }
  }

  function onAccommodationChange() {
    if (searchAccomodationResult != null) {
      const place = searchAccomodationResult.getPlace();
      const address_components = place.address_components;

      const isInUsa = checkServiceLocation(address_components);

      const latlng = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      const accommodationAddress = place.name;
      formik.setFieldValue("hotel", accommodationAddress);
      formik.setFieldValue("accommodationAddress", accommodationAddress);
      formik.setFieldValue("accommodationLatitude", latlng?.lat);
      formik.setFieldValue("accommodationLongitude", latlng?.lng);

      if (!isInUsa) {
        setAccomAddrChecker({
          isUnsupportedLocation: true,
          errorMessage: "accommodation address should be in US",
        });
      } else {

        setAccomAddrChecker({
          isUnsupportedLocation: false,
          errorMessage: " ",
        });
      }
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
              <FormLabel sx={{ color: "info" }}>Select Type of Service</FormLabel>
              <RadioGroup
                row
                defaultValue={travelType}
                name="radio-buttons-group"
                onChange={handleChangeTripType}
              >
               
                <FormControlLabel
                  value={1}
                  control={<RSRadio />}
                  label="Airport Service"
                />
                 <FormControlLabel
                  value={2}
                  control={<RSRadio />}
                  label="Point to Point"
                />
                <FormControlLabel
                  value={3}
                  control={<RSRadio />}
                  label="Hourly Charter"
                />
              </RadioGroup>
            </FormControl>
            {locationChecker.isUnsupportedLocation &&
              (travelType == "2" || travelType === "3") && (
                <Alert severity="error">{locationChecker.errorMessage}</Alert>
              )}
            {accomAddrChecker.isUnsupportedLocation && travelType == "1" && (
              <Alert severity="error">{accomAddrChecker.errorMessage}</Alert>
            )}
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
                    <MenuItem value={key} key={key}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.tripType && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.tripType}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {travelType == 1 && (
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
                    <MenuItem value={airport} key={airport.airportName}>
                      {airport.airportName}
                    </MenuItem>
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
                  {Array.from({ length: 20 }, (_, index) => (
                    <MenuItem value={index + 5}>{index + 5}</MenuItem>
                  ))}
                </Select>
                {formik.touched.hour && (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.hour}
                  </FormHelperText>
                )}
              </FormControl>
            )}

            {(travelType == 2 || travelType == 3) && isLoaded && (
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

            {(travelType == 2 || travelType == 3) && (
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

            {travelType == 1 && (
              <Autocomplete
                onPlaceChanged={onAccommodationChange}
                onLoad={onLoadAccomodationFunc}
              >
                <TextField
                  label="Enter Hotel/ residence/ other"
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
              <RSTypography>
                Distance:{" "}
                {formik.values.distanceInMiles
                  ? formik.values.distanceInMiles + " mile"
                  : "_"}
              </RSTypography>
              <RSTypography>
                Duration:{" "}
                {formik.values.duration ? formik.values.duration : "_"}
              </RSTypography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Index;
