import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import DataTable from "react-data-table-component";
import DeleteModal from "../components/DeleteModal";
import ViewModal from "../components/ViewModal";
import EditModal from "../components/EditModal";
import moment from "moment-timezone";

const columns = [
  {
    name: "Vehicle ID",
    selector: (row: Record<string, any>) => row.vehicleId,
    sortable: true,
  },
  {
    name: "Price",
    selector: (row: Record<string, any>) => row.price,
    sortable: true,
  },
  {
    name: <div style={{ textAlign: "center" }}>Start<br />Location</div>,
    selector: (row: Record<string, any>) => row.startLocation,
    sortable: true,
  },
  {
    name: <div style={{ textAlign: "center" }}>End<br />Location</div>,
    selector: (row: Record<string, any>) => row.endLocation,
    sortable: true,
  },
  {
    name: <div style={{ textAlign: "center" }}>Created<br />Date</div>,
    selector: (row: Record<string, any>) => row.createdAt,
    sortable: true,
  },
  {
    name: <div style={{ textAlign: "center" }}>Updated<br />Date</div>,
    selector: (row: Record<string, any>) => row.updatedAt,
    sortable: true,
  },
  {
    name: "Action",
    selector: (row: Record<string, any>) => row.actions,
  },
];

const Trip: React.FC = () => {
  const [trips, setTrips] = useState<Record<string, any>[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrip, setSelectedTrip] = useState<Record<string, any> | null>(
    null
  );
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const fetchTrips = async () => {
    try {
      const response = await axios.get("/trips");
      const data = response.data.data;
      const formatData = data
        .sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((trip: Record<string, any>) => {
          return {
            ...trip,
            createdAt: moment(trip?.createdAt).format("MM/D YYYY - h:mm A"),
            updatedAt: moment(trip?.updatedAt).format("MM/D YYYY - h:mm A"),
            actions: (
              <div className="flex items-center space-x-3">
                <MdDeleteForever
                  className="text-red-500 cursor-pointer"
                  size={20}
                  title="Delete"
                  onClick={() => handleOpenDeleteModal(trip)}
                />
                <FaEdit
                  className="text-yellow-500 cursor-pointer"
                  size={20}
                  title="Edit"
                  onClick={() => handleOpenEditModal(trip)}
                />
                <FaEye
                  className="text-blue-500 cursor-pointer"
                  size={20}
                  title="View"
                  onClick={() => handleOpenViewModal(trip)}
                />
              </div>
            ),
          };
        });
      setTrips(formatData);
    } catch (error) {
      toast.error("Failed to fetch trips");
    }
  };

  const handleOpenViewModal = async (trip: Record<string, any>) => {
    const id = trip?._id;
    if (!id) return;
    try {
      const response = await axios.get(`/trips/${trip._id}`);
      setSelectedTrip(response.data.data);
      setOpenViewModal(true);
    } catch (error) {
      toast.error("Failed to load trip details");
    }
  };

  const handleCloseViewModal = () => {
    setOpenViewModal(false);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    fetchTrips();
  };

  const handleOpenEditModal = (trip: Record<string, any>) => {
    setSelectedTrip(trip);
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (trip: Record<string, any>) => {
    setSelectedTrip(trip);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedTrip(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const id = selectedTrip?._id;
      if (!id) return;
      await axios.delete(`/trips/${id}`);
      toast.success("Trip deleted successfully");
      setTrips((prev) => prev.filter((trip) => trip._id !== id));
      handleCloseDeleteModal();
    } catch (error) {
      toast.error("Failed to delete trip");
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const filteredTrips = trips.filter(
    (trip) =>
      trip.vehicleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.startLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.endLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      trip.price.toString().includes(searchQuery)
  );

  const customStyles = {
    headCells: {
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#ffffff",
        backgroundColor: "#101828",
        whiteSpace: "normal", 
        textAlign: "center" as const,
        padding: "10px",
      },
    },
  };

  return (
    <div className="border-b-2 mt-10 ml-1 mr-5 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Trips</h2>
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search by Vehicle ID, Start Location, End Location, Price"
            className="border border-gray-300 rounded-md px-4 py-2 w-[700px] focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          {searchQuery && (
            <IoClose
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              size={20}
              onClick={() => setSearchQuery("")}
            />
          )}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={filteredTrips}
        customStyles={customStyles}
        pagination
      />
      <DeleteModal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        vehicleId={selectedTrip?.vehicleId}
      />

      <ViewModal
        open={openViewModal}
        onClose={handleCloseViewModal}
        trips={selectedTrip}
      />

      <EditModal
        open={openEditModal}
        onClose={handleCloseEditModal}
        trip={selectedTrip}
      />
    </div>
  );
};

export default Trip;
