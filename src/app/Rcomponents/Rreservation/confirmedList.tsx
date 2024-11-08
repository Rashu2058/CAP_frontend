import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import BookRoom from "./BookRoom";

// Confirmed List Component
const ConfirmedList = () => {
  const [reservations, setReservations] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
 
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

      setReservations(response.data); // Update the state with the fetched reservations
    } catch (error: any) {
      setError("Error fetching reservations.");
      console.error("Error fetching reservations", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch reservations when the component mounts
  useEffect(() => {
    fetchReservations();
  }, []); 
  
  // Handle search term change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Handle back to previous page/tab
  const handleBack = () => {
    console.log("Back to previous tab.");
  };

  // Filter reservations by search term
  const filteredReservations = reservations.filter((reservation) => {
    const customerIdStr = reservation.customer_idno?.toString() || '';
    return (
      customerIdStr.includes(searchTerm) ||
      reservation.customer_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // Delete reservation
  const deleteReservation = async (reservationId: number) => {
    console.log("Attempting to delete reservation with ID:", reservationId);  // Log the ID for debugging
    try {
      const token = localStorage.getItem("token");
  
      // Make the DELETE request to your backend API
      const response = await axios.delete(`http://localhost:8080/api/reservations/delete/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200 || response.status === 204) {
        // Optionally, refetch reservations after deletion
        fetchReservations(); // Refetch data to update the table
        alert("Reservation deleted successfully");
      } else {
        alert("Failed to delete the reservation.");
      }
    } catch (error) {
      console.error("Error deleting reservation", error);
      alert("There was an error deleting the reservation.");
    }
  };
  
  
  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Back Button */}
      <div className="flex justify-start mb-5">
        <button type="button" onClick={handleBack}>
          <Image src="/back.png" alt="Back" width={50} height={50} className="rounded-full" />
        </button>
      </div>

      {/* Search bar */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by ID or Name..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
            value={searchTerm}
            onChange={handleSearchChange}
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
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-center border border-gray-300">ID No.</th>
            <th className="py-3 px-6 text-center border border-gray-300">Customer Name</th>
            <th className="py-3 px-6 text-center border border-gray-300">Room No</th>
            <th className="py-3 px-6 text-center border border-gray-300">Room Type</th>
            <th className="py-3 px-6 text-center border border-gray-300">Room Price</th>
            <th className="py-3 px-6 text-center border border-gray-300">Check In</th>
            <th className="py-3 px-6 text-center border border-gray-300">Check Out</th>
            <th className="py-3 px-6 text-center border border-gray-300">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="hover:bg-purple-100">
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.customer_idno || "N/A"}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.customer_name}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.room_no || "N/A"}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.room_type}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.room_price}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.check_in_date}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">{reservation.check_out_date}</td>
                <td className="py-3 px-6 border border-gray-300 text-center">
                  <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={() => { }}>
                    Edit
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700 mr-2" onClick={() => deleteReservation(reservation.res_id)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="py-3 px-6 text-center">No reservations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConfirmedList;
