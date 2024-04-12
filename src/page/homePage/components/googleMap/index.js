import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material";
import Map from "./Map";

function RideGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo",
  });
  if (!isLoaded) return <>loading</>;
  return <Map />;
}

export default RideGoogleMap;
