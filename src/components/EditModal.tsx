import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import moment from "moment-timezone";
import toast from "react-hot-toast";
import axios from "axios";

interface EditModalProps {
  open: boolean;
  onClose: () => void;
  trip: Record<string, any> | null;
}

const EditModal: React.FC<EditModalProps> = ({ open, onClose, trip }) => {
  const [formData, setFormData] = useState({
    vehicleId: "",
    startLocation: "",
    endLocation: "",
    startDateTime: "",
    endDateTime: "",
    price: 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (trip) {
      setFormData({
        vehicleId: trip.vehicleId || "",
        startLocation: trip.startLocation || "",
        endLocation: trip.endLocation || "",
        startDateTime: trip.startDateTime
          ? moment(trip.startDateTime).format("YYYY-MM-DDTHH:mm")
          : "",
        endDateTime: trip.endDateTime
          ? moment(trip.endDateTime).format("YYYY-MM-DDTHH:mm")
          : "",
        price: trip.price || 0,
      });
    }
  }, [trip]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors({});
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setErrors({});
      const id = trip?._id;
      if (!id) {
        toast.error("Trip ID not found");
        return;
      }
      await axios.put(`/trips/${id}`, formData);
      toast.success("Trip updated successfully");
      onClose();
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
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center mb-4">Edit Trip</h2>

      {trip ? (
        <div className="space-y-3">
          <div className="flex flex-col">
            <label className="font-semibold">Vehicla ID</label>
            <input
              type="text"
              name="vehicleId"
              value={formData.vehicleId}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.vehicleId && (
              <p className="text-red-500 text-sm">{errors.vehicleId}</p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="font-semibold">Start Location</label>
            <input
              type="text"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.startLocation && (
              <p className="text-red-500 text-sm">{errors.startLocation}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">End Location</label>
            <input
              type="text"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.endLocation && (
              <p className="text-red-500 text-sm">{errors.endLocation}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Start Date & Time</label>
            <input
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
              className="border p-2 rounded-md"
              min={moment().format("YYYY-MM-DDTHH:mm")} // Prevents past dates
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
              onChange={handleChange}
              className="border p-2 rounded-md"
              min={
                formData.startDateTime || moment().format("YYYY-MM-DDTHH:mm")
              } // Restricts to after start date
            />
            {errors.endDateTime && (
              <p className="text-red-500 text-sm">{errors.endDateTime}</p>
            )}
          </div>

          <div className="flex flex-col">
            <label className="font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price}</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No trip data available.</p>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={onClose}
          className="px-6 py-2 bg-gray-200 rounded-lg cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg cursor-pointer"
        >
          Save
        </button>
      </div>
    </Modal>
  );
};

export default EditModal;
