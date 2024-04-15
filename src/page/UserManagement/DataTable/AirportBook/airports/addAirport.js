import React, { useState, useCallback, useMemo, useRef } from "react";
import { Box, Stack, Typography, Button, TextField, Grid } from "@mui/material";
import axios from "axios";
import {
  useLoadScript,
  Autocomplete,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
const libraries = ["places"];

export default function AddAirPort() {
  const [airportData, setAirportData] = useState({
    airportName: "",
    airportAddress: "",
    airportAddressLongitude: 0,
    airportAddressLatitude: 0,
  });
  const [latLng, setLatLng] = useState(null);
  const [searchAirportResult, setSearchAirportResult] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState();
  const [center, setCenter] = useState({ lat: 50, lng: -80 });
  const mapRef = useRef();
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo",
    libraries: libraries,
  });
  function onAirportChanged() {
    if (searchAirportResult != null) {
      const place = searchAirportResult.getPlace();
      const airportPhysicalAddress = place.formatted_address;
      const longitude = place.geometry.location.lng();
      const latitude = place.geometry.location.lat();
      setAirportData({
        airportName: place.name,
        airportAddress: airportPhysicalAddress,
        airportAddressLongitude: longitude,
        airportAddressLatitude: latitude,
      });
      const latlng = { lat: latitude, lng: longitude };
      setLatLng({ lat: latitude, lng: longitude });
      setCenter(latlng);
      console.log("airport data: ", airportData);
    } else {
      alert("Please enter text");
    }
  }
  function onLoadAirportFunc(autocomplete) {
    setSearchAirportResult(autocomplete);
  }

  const handleMapClick = async (e) => {
    const geocoder = new window.google.maps.Geocoder();
    const longitude = e.latLng.lng();
    const latitude = e.latLng.lat();
    const latLng = { lat: latitude, lng: longitude };

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
        // console.log(Geocoder failed due to: ${status});
      }
    });
  };
  const handleSubmit = async () => {
    const result = await axios
      .post("http://api.odatransportation.com/api/v1/airports", airportData)
      .then((result) => console.log("data: ", result.data));
  };
  if (!isLoaded) return <>loading</>;
  return (
    <Box>
      <Box mb={5}>
        <Grid container justifyContent={"space-between"} spacing={2}>
          <Grid item md={6} xs={11}>
            <Autocomplete
              style={{ width: "100%" }}
              onPlaceChanged={onAirportChanged}
              onLoad={onLoadAirportFunc}
            >
              <TextField fullWidth color="info" label="Select airport" />
            </Autocomplete>
          </Grid>
          <Grid item md={6} xs={11}>
            <Button
              variant={"contained"}
              sx={{ backgroundColor: "#03930A", paddingY: 2 }}
              fullWidth
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
      <GoogleMap
        zoom={6}
        center={center}
        onLoad={onLoad}
        mapContainerStyle={{
          width: "100%",
          height: 400,
        }}
        mapContainerClassName="map-container"
        onClick={handleMapClick}
      >
        {latLng && <Marker position={latLng} />}
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
    </Box>
  );
}
