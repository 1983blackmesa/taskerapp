import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "./rootSlice";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

const zoom = 12;

function ChangeView() {
  const coords = useSelector((state) => state.root.userData);

  const map = useMap();
  map.setView([coords.latitude, coords.longitude], zoom);

  return null;
}

const MapComponent = () => {
  const dispatch = useDispatch();
  const coord = useSelector((state) => state.root.userData);

  useEffect(() => {
    if (navigator?.geolocation) {
      navigator.geolocation.getCurrentPosition((location) => {
        if (location) dispatch(getUserData(location.coords));
      });
    }
  }, [dispatch]);

  if (!coord) return null;
  return (
    <MapContainer
      center={[51.5, -0.09]}
      zoom={zoom}
      style={{ height: "75vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[coord.latitude, coord.longitude]} icon={icon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <ChangeView />
    </MapContainer>
  );
};

export default MapComponent;
