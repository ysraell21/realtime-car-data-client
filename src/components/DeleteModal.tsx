import React from "react";
import Modal from "./Modal";

interface DeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  vehicleId: string | null;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  vehicleId,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex flex-col space-y-4 items-center">
        <h1 className="text-2xl font-bold">Delete Trip</h1>
        <p>
          Are you sure you want to delete this trip{" "}
          <span className="font-bold">{vehicleId}</span> ?
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded-lg cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
