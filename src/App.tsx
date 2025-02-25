import React from "react";
import Sidebar from "./components/Sidebar";
import Trip from "./pages/Trip";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Routes, Route } from "react-router-dom";
import AddTrip from "./pages/AddTrip";
import RealTimeMap from "./pages/RealTimeMap";

axios.defaults.baseURL = "http://localhost:1747";
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 p-4 overflow-auto">
          <Routes>
            <Route path="/trips" element={<Trip />} />
            <Route path="/add-trips" element={<AddTrip />} />
            <Route path="/real-time-car-location" element={<RealTimeMap />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
