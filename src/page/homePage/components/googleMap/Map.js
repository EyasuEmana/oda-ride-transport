import { useState, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import "./style.css";
import Places from "./places.js";
// import Distance from "./distance";

export default function Map() {
  const mapRef = useRef();
  const [office, setOffice] = useState();

  const center = useMemo(() => ({ lat: 50, lng: -80 }), []);
  const options = useMemo(
    () => ({
      disableDefaultUI: true,
      clickablelcons: false,
    }),
    []
  );

  const onLoad = useCallback((map) => (mapRef.current = map), []);

  return (
    <>
      {/* <Places
        setOffice={(position) => {
          setOffice(position);
          mapRef.current?.panTo(position);
        }}
      /> */}
      <div style={{ marginBottom: 6 }}></div>
      <GoogleMap
        zoom={3}
        center={center}
        onLoad={onLoad}
        //   options={options}
        mapContainerClassName="map-container"
      ></GoogleMap>
    </>
  );
}

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
