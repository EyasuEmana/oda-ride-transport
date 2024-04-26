import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material";
import Map from "./Map";

function RideGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAgAp1RwiIqCyZZg63gsmyP6TZBuVxw_8c",
  });
  if (!isLoaded) return <>loading</>;
  return <Map />;
}

export default RideGoogleMap;
