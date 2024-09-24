import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./tracking.css"

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// This component will update the map view when the position changes
function ChangeView({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

function TrackingResult({ result }) {
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    // Force re-render of map when result changes
    setMapKey((prevKey) => prevKey + 1);
  }, [result]);

  if (result.error) {
    return (
      <div className="mt-8 text-center text-red-600">
        <p>{result.error}</p>
      </div>
    );
  }

  const position = result.coordinates || [40.7128, -74.006]; // Default to New York City

  return (
    <div className="mt-8 bg-gray-50 p-4 rounded-md">
      <h2 className="text-lg font-medium text-gray-900">Package Found</h2>
      <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
        <div className="py-3 flex justify-between text-sm font-medium">
          <dt className="text-gray-500">Status:</dt>
          <dd className="text-gray-900">{result.status}</dd>
        </div>
        <div className="py-3 flex justify-between text-sm font-medium">
          <dt className="text-gray-500">Location:</dt>
          <dd className="text-gray-900">{result.location}</dd>
        </div>
      </dl>
      <div className="mt-4 h-64 rounded-md overflow-hidden">
        <MapContainer
          key={mapKey}
          center={position}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <ChangeView center={position} zoom={13} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>Package location: {result.location}</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}

export default TrackingResult;
