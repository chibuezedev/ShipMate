import React, { useState } from 'react';
import TrackingForm from '../../components/Tracking/trackingForm';
import TrackingResult from '../../components/Tracking/trackingResult';
import 'leaflet/dist/leaflet.css';


const Tracking = () =>{
  const [trackingResult, setTrackingResult] = useState(null);

  const handleTracking = async (trackingId) => {
    try {
      const response = await fetch(`/api/v1/track/${trackingId}`);
      const data = await response.json();
      if (response.ok) {
        // Mock coordinates for demonstration
        // In a real application, you would get these from your backend
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-8 bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-10 py-8">
          <h1 className="text-2xl font-bold text-center text-gray-900">Courier Tracking</h1>
          <TrackingForm onSubmit={handleTracking} />
        </div>
        {trackingResult && <TrackingResult result={trackingResult} />}
      </div>
    </div>
  );
}

export default Tracking;