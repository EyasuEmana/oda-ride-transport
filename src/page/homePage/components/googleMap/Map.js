import { useState, useMemo, useCallback, useRef } from "react";
import { GoogleMap } from "@react-google-maps/api";
import "./style.css";

export default function Map() {
  const mapRef = useRef();

  const center = useMemo(() => ({ lat: 50, lng: -80 }), []);

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <>
      <GoogleMap
        zoom={3}
        center={center}
        onLoad={onLoad}
        mapContainerClassName="map-container"
      ></GoogleMap>
    </>
  );
}

// const defaultOptions = {
//   strokeOpacity: 0.5,
//   strokeWeight: 2,
//   clickable: false,
//   draggable: false,
//   editable: false,
//   visible: true,
// };
// const closeOptions = {
//   ...defaultOptions,
//   zIndex: 3,
//   fillOpacity: 0.05,
//   strokeColor: "#8BC34A",
//   fillColor: "#8BC34A",
// };
// const middleOptions = {
//   ...defaultOptions,
//   zIndex: 2,
//   fillOpacity: 0.05,
//   strokeColor: "#FBC02D",
//   fillColor: "#FBC02D",
// };
// const farOptions = {
//   ...defaultOptions,
//   zIndex: 1,
//   fillOpacity: 0.05,
//   strokeColor: "#FF5252",
//   fillColor: "#FF5252",
// };
