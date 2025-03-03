"use client"; // 👈 Говорим Next.js, что это клиентский компонент

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// 📌 Динамический импорт react-leaflet, чтобы избежать SSR
const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), { ssr: false });

export default function MapComponent({ lat, lon }: { lat: number; lon: number }) {
  const [L, setL] = useState<any>(null); // 👈 Leaflet загружается динамически

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  if (!L) return <p>Loading map...</p>; // 👈 Пока leaflet не загружен, показываем текст

  // 📌 Правильный путь к иконкам Leaflet
  const customMarkerIcon = new L.Icon({
    iconUrl: "/leaflet/marker-icon.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  return (
    <MapContainer center={[lat, lon]} zoom={10} style={{ height: "300px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[lat, lon]} icon={customMarkerIcon}>
        <Popup>Текущая погода здесь</Popup>
      </Marker>
    </MapContainer>
  );
}