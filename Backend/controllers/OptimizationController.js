const axios = require("axios");

const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

class RouteOptimizationService {
  async optimizeRoute(deliveries, courierLocations) {
    const coordinates = this.formatCoordinates(deliveries, courierLocations);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/optimized-trips/v1/mapbox/driving/${coordinates}`,
        {
          params: {
            access_token: MAPBOX_ACCESS_TOKEN,
            geometries: "geojson",
            steps: "true",
            overview: "full",
          },
        }
      );

      return this.processOptimizedRoute(response.data, deliveries);
    } catch (error) {
      console.error("Error optimizing route:", error);
      throw error;
    }
  }

  formatCoordinates(deliveries, courierLocations) {
    const allCoordinates = [
      ...courierLocations.map((loc) => `${loc.longitude},${loc.latitude}`),
      ...deliveries.map(
        (delivery) => `${delivery.dropoffLongitude},${delivery.dropoffLatitude}`
      ),
    ];
    return allCoordinates.join(";");
  }

  processOptimizedRoute(data, deliveries) {
    const waypoints = data.waypoints;
    const optimizedDeliveries = waypoints.map((waypoint) => {
      const delivery = deliveries[waypoint.waypoint_index - 1];
      return {
        ...delivery,
        estimatedArrivalTime: new Date(
          Date.now() + waypoint.trip_duration * 1000
        ).toISOString(),
        optimizedIndex: waypoint.waypoint_index,
      };
    });

    return {
      optimizedDeliveries,
      totalDistance: data.trips[0].distance,
      totalDuration: data.trips[0].duration,
      routeGeometry: data.trips[0].geometry,
    };
  }
}

export default new RouteOptimizationService();
