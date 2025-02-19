"use client";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css"
import { useCountries } from "../Lib/getCountries";
import { icon } from "leaflet";

const ICON = icon({
    iconUrl: "https://png.pngtree.com/png-clipart/20191120/original/pngtree-map-location-marker-icon-in-red-png-image_5004115.jpg",
    iconSize: [50, 50],
})

export default function Map({locationValue}:{locationValue: string}) {
    const {getCountryByValue} = useCountries()
    const latLang = getCountryByValue(locationValue)?.latLang;
  return (
    <MapContainer
      scrollWheelZoom={false}
      className="h-[50vh] rounded-lg relative z-0"
      center={latLang ?? [52.505, -0.09]}
      zoom={10}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={latLang ?? [52.505, -0.09]} icon={ICON}/>
    </MapContainer>
  );
}
