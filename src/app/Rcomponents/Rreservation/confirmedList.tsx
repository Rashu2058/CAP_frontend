import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteGuest } from "./AddGuest";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

interface Reservation {
  res_id: number;
  guest_idno: number;
  guest_name: string;
  room_no: number;
  room_type: string;
  room_price: number;
  check_in: string;
  check_out: string;
}

const ConfirmedList = () => {
  
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [reservations, setReservations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [editReservation, setEditReservation] = useState<any | null>(null);
  const [availableRooms, setAvailableRooms] = useState<any[]>([]);

  // Fetch confirmed reservations
  const fetchReservations = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Authentication token not found.");
        setLoading(false);
        return;
      }

      const response = await axios.get("http://localhost:8080/api/reservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservations(response.data);
    } catch (error) {
      setError("Error fetching reservations.");
      console.error("Error fetching reservations", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

 // Fetch available rooms based on selected room type
const fetchAvailableRooms = async (room_type: string) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing");
      return;
    }

    const response = await axios.get(`http://localhost:8080/api/reservations/rooms/${room_type}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setAvailableRooms(response.data);
  } catch (error) {
    console.error("Error fetching available rooms", error);
    alert("Error fetching available rooms");
  }
};
const fetchRoomPrice = async (room_no: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing");
      return;
    }
    console.log("Token used:", token);
    const response = await axios.get(`http://localhost:8080/api/reservations/price/${room_no}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Room Price Response:", response.data);
    setEditReservation((prev:any) => ({
      ...prev,
      room_price: response.data.price,
    }));
  } catch (error) {
    console.error("Error fetching room price", error);
    setErrorMessage("Error fetching room price");
  }
};

// Handle form change and fetch rooms when room type changes
// Debugging form changes
const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;
  console.log(`Form changed: ${name} = ${value}`); // Debug log
  setEditReservation({
    ...editReservation,
    [name]: value,
  });

  if (name === "room_type") {
    fetchAvailableRooms(value);
  }

  if (name === "room_no") {
    console.log("Fetching price for room:", value); // Debug log
    fetchRoomPrice(parseInt(value, 10));
  }
};

const handleUpdateSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editReservation) return;

  console.log("Updated Reservation:", editReservation);  // Log the updated reservation details

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token missing");
      return;
    }

    // Construct the updated reservation object in the expected format
    const updatedReservation = {
      room: { room_no: editReservation.room_no },  // Nested room object
      checkInDate: editReservation.check_in_date,   // Properly formatted check-in date
      checkOutDate: editReservation.check_out_date // Properly formatted check-out date
    };

    // Log the updated reservation data before sending the request
    console.log("Sending updated reservation data:", updatedReservation);

    // Send the PUT request to update the reservation
    const response = await axios.put(
      `http://localhost:8080/api/reservations/update/${editReservation.res_id}`,
      updatedReservation,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    if (response.status === 200) {
      setSuccessMessage("Reservation updated successfully");
      fetchReservations(); // Reload the updated list of reservations
      setEditReservation(null); // Close the edit form
    } else {
      alert("Failed to update reservation");
    }
  } catch (error) {
    console.error("Error updating reservation", error);
    alert("Error updating reservation");
  }
};
  // Filter reservations by search term
  const filteredReservations = reservations.filter((reservation) => {
    const guestIdStr = reservation.guest_idno?.toString() || '';
    return (
      guestIdStr.includes(searchTerm) ||
      reservation.guest_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  // Delete reservation
  const deleteReservation = async (reservationId: number, guestIdNo: number) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this reservation and the associated guest?");
    if (!isConfirmed) return;
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing");
        return;
      }
  
      // Delete the reservation first
      const response = await axios.delete(`http://localhost:8080/api/reservations/delete/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.status === 200 || response.status === 204) {
        await deleteGuest(guestIdNo); // Delete associated guest
        fetchReservations(); // Reload the reservations
        alert("Reservation and associated guest deleted successfully");
      } else {
        alert("Failed to delete the reservation");
      }
    } catch (error) {
      console.error("Error deleting reservation", error);
      alert("Error deleting the reservation and associated guest");
    }
  };
  

  return (
    <div className="bg-white p-6 rounded-lg min-w-max">

{/* Search bar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by ID or Name..."
            maxLength={15}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img src="/search.png" alt="Search" className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

{/* Loading and Error Handling */}
      {loading && (
        <div className="text-center py-4">
          <span className="text-gray-500">Loading reservations...</span>
        </div>
      )}
      {error && (
        <div className="text-center py-4 text-red-500">
          <span>{error}</span>
        </div>
      )}

{/* Table */}
<div id="report-container" className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
            <th className="p-3 border">ID No.</th>
            <th className="p-3 border">guest Name</th>
            <th className="p-3 border">Room No</th>
            <th className="p-3 border">Room Type</th>
            <th className="p-3 border">Room Price</th>
            <th className="p-3 border">Check In</th>
            <th className="p-3 border">Check Out</th>
            <th className="p-3 border">Entered By</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-purple-100">
                <td className="p-3 text-center">{reservation.guest_idno || "N/A"}</td>
                <td className="p-3 text-center">{reservation.guest_name}</td>
                <td className="p-3 text-center">{reservation.room_no || "N/A"}</td>
                <td className="p-3 text-center">{reservation.room_type}</td>
                <td className="p-3 text-center">{reservation.room_price}</td>
                <td className="p-3 text-center">{reservation.check_in_date}</td>
                <td className="p-3 text-center">{reservation.check_out_date}</td>
                <td className="p-3 text-center">{reservation.receptionist_name}</td>
                <td className="p-3 text-center">
                  <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={() => setEditReservation(reservation)}>
                    Edit
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 mr-2" onClick={() => deleteReservation(reservation.res_id, reservation.guest_idno)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="p-3 text-center">
              No reservation found matching "{searchTerm}
              <div className="mt-2 text-sm text-gray-400">
                Try searching for a different reservation.
             </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
 


      {/* Update Form */}
      {editReservation && (
        <form className="space-y-4 mt-6" onSubmit={handleUpdateSubmit}>
          <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="guest_idno"
              placeholder="Enter ID No."
              value={editReservation.guest_idno || ""}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
            <input
              type="text"
              name="guest_name"
              placeholder="Enter guest Name"
              value={editReservation.guest_name || ""}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              readOnly
            />
             
            <select
                  id="room_type"
                  name="room_type"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editReservation.room_type}
                  onChange={handleFormChange}
                >
                  <option value="SINGLE">Single</option>
                  <option value="DOUBLE">Double</option>
                  <option value="SUITE">Suite</option>
                  {/* Add more options as needed */}
                </select>
                <select
                  id="room_no"
                  name="room_no"
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  value={editReservation.room_no}
                  onChange={handleFormChange}
                >
                  {availableRooms.map((room) => (
                    <option key={room.room_no} value={room.room_no}>
                      {room.room_no}
                    </option>
                  ))}
                </select>

            <input
              type="text"
              name="room_price"
              placeholder="Enter Room Price"
              value={editReservation.room_price || ""}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="datetime-local"
              name="check_in_date"
              placeholder="Enter Check-In Date"
              value={editReservation.check_in_date || ""}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="datetime-local"
              name="check_out_date"
              placeholder="Enter Check-Out Date"
              value={editReservation.check_out_date || ""}
              onChange={handleFormChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-950 text-white rounded-lg hover:bg-blue-900 transition-colors"
          
          >
            Update Reservation
          </button>
        </form>
      )}
      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
      {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}
    </div>
  );
};

export default ConfirmedList;
