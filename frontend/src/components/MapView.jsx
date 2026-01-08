import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function MapView({ points }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  });

  if (!isLoaded) return <div className="card">Se incarca harta...</div>;

  const valid = (points || []).filter(p => typeof p.lat === "number" && typeof p.lng === "number");

  const center = valid.length
    ? { lat: valid[0].lat, lng: valid[0].lng }
    : { lat: 44.4268, lng: 26.1025 };

  return (
    <div className="card" style={{ padding: 0, overflow: "hidden" }}>
      <div style={{ height: 420 }}>
        <GoogleMap mapContainerStyle={{ width: "100%", height: "100%" }} center={center} zoom={11}>
          {valid.map((p) => (
            <Marker key={p.id} position={{ lat: p.lat, lng: p.lng }} />
          ))}
        </GoogleMap>
      </div>
    </div>
  );
}
