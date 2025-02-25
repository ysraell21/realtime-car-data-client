import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const WS_URL = "ws://localhost:8765"; 
const RealTimeMap: React.FC = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    const ws = new WebSocket(WS_URL);

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const { lat, lng } = data;
        setPosition([lat, lng]);
      } catch (error) {
        console.error("Error parsing WebSocket data:", error);
      }
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <div className="h-full w-full">
      <h1 className="text-center font-bold text-2xl">Real-Time Car Location</h1>
      {position ? (
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "90vh", width: "100%" }}
        >
          <TileLayer
            {...({
              url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
              attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            } as any)}
          />

          <Marker position={position}>
            <Popup>Car is here</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p style={{ textAlign: "center" }}>Waiting for location data...</p>
      )}
    </div>
  );
};

export default RealTimeMap;
