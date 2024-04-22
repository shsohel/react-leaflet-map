// Classes used by Leaflet to position controls
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  
} from "react-leaflet";
import SearchLocation from "./SearchLocation";
import ResetMap from "./ResetMap";
import axios from "axios";

const api ='https://nominatim.openstreetmap.org/reverse.php?'

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png"
});






function ReactLeafletMap() {
  const pt= {
    lat:
    22.496660999051866, lng:
    91.49002075195314
  }
  const [position, setPosition] = useState(pt);
  
  const { lat, lng } = position;
  
  const getLocation = (latlng) => {
    const { lat, lng } = latlng;

    setPosition({
      lat,
      lng
    })

    const params ={
      lat,
      lon: lng,
      format: 'json',
      addressdetails: 1,
      polygon_geojson: 1,
      zoom:18
  
    }
    const paramsQueryString = new URLSearchParams(params)

    axios.get(`${api}${paramsQueryString}`).then(response=>{
      console.log(response.data);
  
    })
  };
  return (
    <div className="main-app-container">
       <SearchLocation setPosition={setPosition}  />
    <MapContainer
      style={{ height: "80vh" }}

      center={position}
      zoom={12}
      scrollWheelZoom={true}
      whenReady={(map) => {
        map.target.on("click", function (e) {
          console.log(e);
          
          getLocation(e.latlng);
          // L.marker([lat, lng], { icon }).addTo(map.target);
        });
      }}
    >
      
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <MyComponent/> */}
      {/* <MinimapControl position="topright" /> */}
      <Marker
        position={[lat, lng]}
        icon={icon}
        eventHandlers={{
          click: (e) => {
            console.count("marker clicked", e);
          }
        }}
      />
      <ResetMap position={position}/>
    </MapContainer>
    </div>
  );
}
export default ReactLeafletMap;
