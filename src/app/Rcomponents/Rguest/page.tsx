"use client";
import React, { useState, useEffect } from "react";
import { fetchGuest, deleteGuest, updateGuest } from "../Rreservation/AddGuest";
import type { Guest } from "../Rreservation/AddGuest";
import Modal from "./Modal";

export default function Guest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const [formData, setFormData] = useState<Guest>({
    g_id: 0,
    id_type: "",
    id_no: null,
    name: "",
    phone_number: null,
    address: "",
    gender_type: "",
    email: "",
    nationality: "",
    check_in_date: "",
    check_out_date: "",
    room_no: "",
    room_type: "",
    institutionName: "",
    purpose: "",
    receptionist_name: "",
  });

  useEffect(() => {
    const loadGuests = async () => {
      try {
        const guestData = await fetchGuest();
        setGuests(guestData);
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    };
    loadGuests();
  }, []);

  const handleDelete = async (id_no: number) => {
    try {
      await deleteGuest(id_no);
      const updatedGuests = await fetchGuest();
      setGuests(updatedGuests);
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  const openModal = (guest: Guest) => {
    setSelectedGuest(guest);
    setFormData(guest);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedGuest) return;

    const updatedGuest = { ...formData };

    if (!updatedGuest.phone_number || !updatedGuest.email) {
      alert("Please fill in all required fields!");
      return;
    }

    const { id_no } = selectedGuest;
    console.log("Updating guest with id_no:", id_no);
    console.log("Updated guest:", updatedGuest);

    try {
      await updateGuest(id_no, updatedGuest);
      setGuests((prevGuests) =>
        prevGuests.map((guest) =>
          guest.id_no === id_no ? updatedGuest : guest
        )
      );
      closeModal();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  {/*Search Query*/}
const filteredGuests = guests.filter((guest) =>{
  const matchesQuery=
    (guest.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (guest.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    (guest.institutionName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
    String(guest.id_no || "").toLowerCase().includes(searchQuery.toLowerCase())||
    String(guest.phone_number || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesQuery;  
  });
  
 {/* Modal */}
 <Modal
 isModalOpen={isModalOpen}
 selectedGuest={selectedGuest}
 formData={formData}
 handleInputChange={handleInputChange}
 handleUpdate={handleUpdate}
 closeModal={closeModal}
/>

  return (
    <div className="bg-white p-6 rounded-lg min-w-min">
      <h1 className="text-xl font-bold">Guest Details</h1>

{/* Search bar with custom icon inside */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            maxLength={15}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by ID, name, email, phone.no, or institution..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 
            focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
          />

          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img
              src="/search.png"
              alt="Search"
              className="h-5 w-5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div id="" className="overflow-x-auto shadow-md rounded-lg mb-6 ">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-800 text-white text-sm uppercase">
            <tr>
              <th className="p-3 border ">ID Type</th>
              <th className="p-3 border ">ID No.</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone No</th>
              <th className="p-3 border">Address</th>
              <th className="p-3 border">Gender</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Nationality</th>
              <th className="p-3 border">Institution Name</th>
              <th className="p-3 border">Purpose</th>
              <th className="p-3 border">Check In Date</th>
              <th className="p-3 border">Check Out Date</th>
              <th className="p-3 border">Entered By</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
          {filteredGuests.length > 0 ? (
            filteredGuests.map((guest,index) => (
              <tr key={index} className="text-gray-700 text-sm border-b hover:bg-gray-50">
                <td className="p-3 text-center">{guest.id_type}</td>
                <td className="p-3 text-center">{guest.id_no}</td>
                <td className="p-3 text-center">{guest.name}</td>
                <td className="p-3 text-center">{guest.phone_number}</td>
                <td className="p-3 text-center">{guest.address}</td>
                <td className="p-3 text-center">{guest.gender_type}</td>
                <td className="p-3 text-center">{guest.email}</td>
                <td className="p-3 text-center">{guest.nationality}</td>
                <td className="p-3 text-center">{guest.institutionName}</td>
                <td className="p-3 text-center">{guest.purpose}</td>
                <td className="p-3 text-center">{guest.check_in_date}</td>
                <td className="p-3 text-center">{guest.check_out_date}</td>
                <td className="p-3 text-center">{guest.receptionist_name}</td>
                <td className="p-3 text-center">
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-700 mr-2"
                    onClick={() => openModal(guest)}
                  >
                    Edit
                  </a>
                  <a href="#" className="text-red-600 hover:text-red-700"
                    onClick={() => handleDelete(guest.id_no ?? 0)}>
                    Delete
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={14} className="text-center py-3 text-gray-500">
              No guest found matching "{searchQuery}"
                <div className="mt-2 text-sm text-gray-400">
                 Try searching for a different item or check the spelling.
                </div>
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
 

  