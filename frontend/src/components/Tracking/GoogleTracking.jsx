import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

function TrackingResult({ result }) {
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY_HERE'
  });

  useEffect(() => {
    if (result.coordinates) {
      setMapCenter({
        lat: result.coordinates[0],
        lng: result.coordinates[1]
      });
    } else {
      // Default to New York City
      setMapCenter({ lat: 40.7128, lng: -74.0060 });
    }
  }, [result]);

  if (result.error) {
    return (
      <div className="mt-8 text-center text-red-600">
        <p>{result.error}</p>
      </div>
    );
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

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
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={mapCenter}
          zoom={13}
        >
          <Marker position={mapCenter} />
        </GoogleMap>
      </div>
    </div>
  );
}

export default TrackingResult;