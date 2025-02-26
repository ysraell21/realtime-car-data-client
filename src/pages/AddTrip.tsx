import React, { useState } from "react";
import moment from "moment-timezone";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddTrip: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    vehicleId: "",
    startLocation: "",
    endLocation: "",
    startDateTime: "",
    endDateTime: "",
    price: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      await axios.post(`/trips/create-trip`, formData);
      setFormData({
        vehicleId: "",
        startLocation: "",
        endLocation: "",
        startDateTime: "",
        endDateTime: "",
        price: 0,
      })
      toast.success("Trip created successfully");
      navigate("/trips");
    } catch (error: any) {
      if (error.response?.status === 400) {
        if (error.response.data.field === "vehicleId") {
          setErrors((prev) => ({
            ...prev,
            vehicleId: error.response.data.message,
          }));
        } else if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
      } else {
        toast.error("Failed to update trip");
      }
    }
  };
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg border-2 border-gray-200 h-full">
        <h2 className="text-2xl font-bold text-center mb-6">Add New Trip</h2>

        <div className="space-y-4">
          {[
            { label: "Vehicle ID", name: "vehicleId", type: "text" },
            { label: "Start Location", name: "startLocation", type: "text" },
            { label: "End Location", name: "endLocation", type: "text" },
            { label: "Price", name: "price", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label className="font-semibold">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData]}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
              {errors[name] && (
                <p className="text-red-500 text-sm">{errors[name]}</p>
              )}
            </div>
          ))}

          <div className="flex flex-col">
            <label className="font-semibold">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              min={moment().format("YYYY-MM-DDTHH:mm")}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.startDateTime && (
              <p className="text-red-500 text-sm">{errors.startDateTime}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">End Date & Time</label>
            <input
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              min={
                formData.startDateTime
                  ? moment(formData.startDateTime).format("YYYY-MM-DDTHH:mm")
                  : moment().format("YYYY-MM-DDTHH:mm")
              }
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.endDateTime && (
              <p className="text-red-500 text-sm">{errors.endDateTime}</p>
            )}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-6 px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
        >
          Save Trip
        </button>
      </div>
    </div>
  );
};

export default AddTrip;
