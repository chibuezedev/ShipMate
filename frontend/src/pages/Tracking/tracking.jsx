import React, { useState } from 'react';
import TrackingForm from '../../components/Tracking/trackingForm';
import TrackingResult from '../../components/Tracking/trackingResult';
import Navbar from '../../components/navbar/navbar';
import 'leaflet/dist/leaflet.css';


const Tracking = () => {
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTracking = async (trackingId) => {
    try {
      const response = await fetch(`/api/v1/track/${trackingId}`);
      const data = await response.json();
      if (response.ok) {
        data.coordinates = [40.7128, -74.0060]; // Example: New York City
        setTrackingResult(data);
      } else {
        setTrackingResult({ error: data.error });
      }
    } catch (error) {
      setTrackingResult({ error: 'Unable to connect to the server' });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-10 py-8">
          <h1 className="text-2xl font-bold text-center text-gray-900">Courier Tracking</h1>
          <TrackingForm onSubmit={handleTracking} />
        </div>
        {trackingResult && <TrackingResult result={trackingResult} />}
      </div>
    </div>
    </>
  );
}

export default Tracking;