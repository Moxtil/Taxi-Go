"use client";
import "leaflet/dist/leaflet.css";
import React, { useContext, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";

import L from "leaflet";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import { Selectors } from "../context/Selected";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconRetinaUrl.src || iconRetinaUrl,
  iconUrl: iconUrl.src || iconUrl,
  shadowUrl: shadowUrl.src || shadowUrl,
});

const metersToMiles = (m) => (m / 1609.344).toFixed(2);

const DEFAULT_CENTER = [39.8283, -98.5795];
const DEFAULT_ZOOM = 4;

const Map = ({ fromCoords, toCoords, apiKey }) => {
  const [routeCoords, setRouteCoords] = useState([]);
  const [isClient, setIsClient] = useState(false);
  const { routeInfo, setRouteInfo, finalPrice } = useContext(Selectors);
  const hours = Math.floor(routeInfo?.duration / 60);
  const minutes = routeInfo?.duration % 60;

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Validate coords before fetching
    if (
      !fromCoords ||
      !toCoords ||
      typeof fromCoords.lat !== "number" ||
      typeof fromCoords.lon !== "number" ||
      typeof toCoords.lat !== "number" ||
      typeof toCoords.lon !== "number"
    ) {
      setRouteCoords([]);
      setRouteInfo(null);
      return;
    }

    const fetchRoute = async () => {
      const url = `https://api.geoapify.com/v1/routing?waypoints=${fromCoords.lat},${fromCoords.lon}|${toCoords.lat},${toCoords.lon}&mode=drive&apiKey=${apiKey}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        console.log("Geoapify Routing API response:", data);

        if (data.features && data.features.length > 0) {
          const coords = data.features[0].geometry.coordinates.map(
            ([lon, lat]) => [lat, lon]
          );
          setRouteCoords(coords);

          const properties = data.features[0].properties;
          setRouteInfo({
            distance: metersToMiles(properties.distance),
            duration: (properties.time / 60).toFixed(0),
          });
        } else {
          setRouteCoords([]);
          setRouteInfo(null);
          console.warn("No route found in Geoapify response.");
        }
      } catch (error) {
        console.error("Routing API error:", error);
        setRouteCoords([]);
        setRouteInfo(null);
      }
    };

    if (isClient) {
      fetchRoute();
    }
  }, [fromCoords, toCoords, apiKey, isClient]);

  const centerPosition =
    fromCoords && toCoords
      ? [
          (fromCoords.lat + toCoords.lat) / 2,
          (fromCoords.lon + toCoords.lon) / 2,
        ]
      : DEFAULT_CENTER;

  const zoomLevel = fromCoords && toCoords ? 7 : DEFAULT_ZOOM;

  if (!isClient) return null;

  return (
    <div className="w-full mx-auto mt-13 relative border-2 border-yellow-400">
      {routeInfo && (
        <div className="mt-4 text-start absolute md:top-[-10px] right-1.5 bg-amber-400 p-2 z-[10000] w-2/3 md:w-1/2 lg:w-1/3 text-white font-light">
          <p className="text-lg ">
            Costs: <strong>${finalPrice}</strong>
          </p>
          <p>
            Distance: <strong>{routeInfo.distance} miles</strong>
          </p>
          <p>
            Estimated time:{" "}
            <strong>
              {" "}
              {hours} hour{hours !== 1 ? "s" : ""} and {minutes} minute
              {minutes !== 1 ? "s" : ""}
            </strong>
            {/* Estimated time: <strong>{routeInfo.duration} minutes</strong> */}
          </p>
        </div>
      )}
      <MapContainer
        center={centerPosition}
        zoom={zoomLevel}
        style={{ height: "650px", width: "100%" }}
        scrollWheelZoom={false}
        key={`${centerPosition[0]}-${centerPosition[1]}`}
      >
        <TileLayer
          url={`https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=${apiKey}`}
          attribution="&copy; OpenStreetMap contributors"
        />

        {fromCoords && (
          <Marker position={[fromCoords.lat, fromCoords.lon]}>
            <Popup>From</Popup>
          </Marker>
        )}
        {toCoords && (
          <Marker position={[toCoords.lat, toCoords.lon]}>
            <Popup>To</Popup>
          </Marker>
        )}

        {routeCoords.length > 0 && (
          <Polyline positions={routeCoords} color="blue" />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
