import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import { Box } from "@mui/material";
import Map from "./Map";

function RideGoogleMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo",
  });
  if (!isLoaded) return <>loading</>;
  return (
    <>
      <Map />
    </>
  );
}

export default RideGoogleMap;

// import React from "react";
// import { Box } from "@mui/material";
// import { useLoadScript } from "@react-google-maps/api";
// import {
//   APIProvider,
//   Map,
//   Marker,
//   AdvancedMarker,
// } from "@vis.gl/react-google-maps";

// const App = () => (
//   <APIProvider apiKey={"AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo"}>
//     <Map
//       defaultCenter={{ lat: 22.54992, lng: 0 }}
//       defaultZoom={3}
//       gestureHandling={"greedy"}
//       disableDefaultUI={true}
//       mapId={"gkhewrhre434"}
//     >
//       <AdvancedMarker
//         position={{ lat: 53.58675649147477, lng: 10.045572975464376 }}
//         draggable={true}
//       ></AdvancedMarker>
//     </Map>
//   </APIProvider>
// );

// export default App;
// https://maps.googleapis.com/maps/api/js?key=AIzaSyAPSC6erLz9efudf70AKJlwp4gBjn2R5Qo`
