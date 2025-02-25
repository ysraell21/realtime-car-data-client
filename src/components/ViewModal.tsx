import React from "react";
import Modal from "./Modal";
import moment from "moment-timezone";

interface ViewModalProps {
  open: boolean;
  onClose: () => void;
  trips: Record<string, any> | null;
}

const ViewModal: React.FC<ViewModalProps> = ({ open, onClose, trips }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <h2 className="text-2xl font-bold text-center mb-4">Trip Details</h2>

      {trips ? (
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="font-semibold">Vehicle ID:</span>
            <span>{trips.vehicleId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Start Location:</span>
            <span>{trips.startLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">End Location:</span>
            <span>{trips.endLocation}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Start Date & Time:</span>
            <span>{moment(trips.startDateTime).format("MMMM D, YYYY - h:mm A")}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">End Date & Time:</span>
            <span>{moment(trips.endDateTime).format("MMMM D, YYYY - h:mm A")}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Price:</span>
            <span className="text-green-600">${trips.price.toFixed(2)}</span>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">No trip data available.</p>
      )}

      <div className="mt-6 flex justify-center">
        <button onClick={onClose} className="px-6 py-2 bg-gray-200 rounded-lg cursor-pointer">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default ViewModal;
