/** @format */

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const ResetMap = ({ position }) => {
  const map = useMap();
  const { lat, lng } = position;

  useEffect(() => {
    if (position) {
      map.setView(L.latLng(lat, lng), map.getZoom(), {
        animate: true,
      });
    }
    return () => {};
  }, [position]);

  return null;
};

export default ResetMap;
