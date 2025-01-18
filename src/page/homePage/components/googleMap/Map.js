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
