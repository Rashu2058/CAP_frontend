"use client";
import React, { useState,useEffect } from "react";
import { fetchGuest,deleteGuest,updateGuest } from "../Rreservation/AddGuest";
import type { Guest } from "../Rreservation/AddGuest";

export default function Guest() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
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
    check_in_date:"",
    check_out_date:"",
    room_no:"",
    room_type:"",
    institutionName:"",
    purpose:"",
    receptionist_name:"",
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
      // Fetch the updated customer list after deletion
      const updatedGuests = await fetchGuest();
      setGuests(updatedGuests); // Update state with the new customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Open and close modal
  const openModal = (guest:Guest) => {
    setSelectedGuest(guest);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);


  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedGuest) return;
  
    const updatedGuests = { ...selectedGuest };
    const formElements = event.target as HTMLFormElement;
  
    updatedGuests.id_type = formElements["id_type"].value;
    updatedGuests.phone_number = formElements["phone_number"].value;
    updatedGuests.address = formElements["address"].value;
    updatedGuests.gender_type = formElements["gender_type"].value;
    updatedGuests.email = formElements["email"].value;
    updatedGuests.nationality = formElements["nationality"].value;
    updatedGuests.institutionName=formElements["institutionName"].value;
    updatedGuests.purpose=formElements["purpose"].value;
  
    if (!updatedGuests.phone_number || !updatedGuests.email) {
      alert("Please fill in all required fields!");
      return;
    }
  
    const { id_no } = selectedGuest;  // Ensure this is correct
    console.log("Updating guest with id_no:", id_no);
    console.log("Updated guest:", updateGuest);
  
    try {
      await updateGuest(id_no, selectedGuest);  // Pass id_no and updated data
      const updatedGuests = await fetchGuest();
      setGuests(updatedGuests);
      closeModal();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
    
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (selectedGuest) {
      const { name, value } = event.target;
    setSelectedGuest((prevGuest) => ({
      ...prevGuest!,
      [name]: value,
    }));
  }
};
   
  // Modal Component
  const Modal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold font-sans mb-4">Update Customer Details</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2 gap-2">
              <p>
                <span className="font-semibold">ID Type:</span>{selectedGuest?.id_type}</p> 
              <p>
                <span className="font-semibold">ID No:</span>{selectedGuest?.id_no}</p> 
              <p>
                <span className="font-semibold">Name:</span> {selectedGuest?.name}</p>
              <p>
                <span className="font-semibold">Phone No:</span>{selectedGuest?.phone_number}</p> 
              <p>
                <span className="font-semibold">Address:</span>{selectedGuest?.address}</p> 
              <p>
                <span className="font-semibold">Gender:</span>{selectedGuest?.gender_type}</p> 
              <p>
                <span className="font-semibold">Email:</span>{selectedGuest?.email}</p> 
              <p>
                <span className="font-semibold">Nationality:</span>{selectedGuest?.nationality}</p>
              <p>
                <span className="font-semibold">Institution name:</span>{selectedGuest?.institutionName}</p>
              <p>
                <span className="font-semibold">Purpose:</span>{selectedGuest?.purpose}</p>    
            </div>
          </div>

{/* New Update Section */} 
          <form onSubmit={handleUpdate}className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="id_type"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                value={selectedGuest?.id_type}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                <option value="CITIZENSHIP">Citizenship</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING_LICENSE">Driving Liscense</option>
                <option value="NID_CARD">National ID Card</option>
              </select>
              <input
                type="text"
                name="id_no"
                placeholder="Enter ID No."
                value={selectedGuest?.id_no||""}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="name"
                value={selectedGuest?.name||""}
                placeholder="Enter Name"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="phone_number"
                value={selectedGuest?.phone_number||""}
                placeholder="Enter Phone No."
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="address"
                value={selectedGuest?.address||""}
                placeholder="Enter Address"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <select
                name="gender_type"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
               value={selectedGuest?.gender_type||""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
              <input
                type="email"
                name="email"
                value={selectedGuest?.email||""}
                placeholder="Enter Email"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="nationality"
                value={selectedGuest?.nationality||""}
                onChange={handleInputChange}
                placeholder="Enter Nationality"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="institutionName"
                value={selectedGuest?.institutionName||""}
                onChange={handleInputChange}
                placeholder="Enter Nationality"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="purpose"
                value={selectedGuest?.purpose||""}
                onChange={handleInputChange}
                placeholder="Enter Nationality"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
            </div>

{/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

{/* Customer Details Component*/}
  const GuestDetails = () => (
    <div className="bg-white p-6 rounded-lg min-w-min">
      <h1 className="text-xl font-bold">Guest Details</h1>
      
{/* Search bar with custom icon inside */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
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

{/*Table*/}
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
          {guests.map((guest) => (
            <tr key={guest.g_id} className="text-gray-700 text-sm border-b hover:bg-gray-50">
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
                  onClick={()=>openModal(guest)}
                >
                  Edit
                </a>
                <a href="#" className="text-red-600 hover:text-red-700" 
                onClick={() => handleDelete(guest.id_no??0)}>
                  Delete
                </a>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );

  return (
    <div>
      {/* Render Customer Details */}
      <GuestDetails />

      {/* Modal */}
      <Modal />
    </div>
  );
}
