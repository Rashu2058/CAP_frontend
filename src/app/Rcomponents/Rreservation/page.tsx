"use client";
import React, { useState } from "react";
import Image from "next/image";

{/* Tab data and corresponding components */}
const tabs = [
  { id: "addCustomer", label: "Add Customer" },
  { id: "bookRoom", label: "Book Room" },
  { id: "confirmedList", label: "Confirmed List" },
];

export default function Reservation() {
  const [activeTab, setActiveTab] = useState("addCustomer");
  const [isModalOpen, setIsModalOpen] = useState(false);

  {/* Open and close modal */}
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  {/* Modal Component */}
  const Modal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold font-sans mb-4">Update Reservation</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2">
            <p>
                <span className="font-semibold">ID No:</span> 
              </p>
              <p>
                <span className="font-semibold">Customer Name:</span> 
              </p>
              <p>
                <span className="font-semibold">Room No:</span> 
              </p>
              <p>
                <span className="font-semibold">Room Type:</span> 
              </p>
              <p>
                <span className="font-semibold">Room Price:</span> 
              </p>
              <p>
                <span className="font-semibold">Check In:</span> 
              </p>
              <p>
                <span className="font-semibold">Check Out:</span> 
              </p>
            </div>
          </div>

{/* New Update Section */} 
          <form className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
                <div className="grid grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Enter ID No."
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                  />
                   <input
                    type="text"
                    placeholder="Enter Customer Name"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <select
                    name="Room No"
                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                    defaultValue=""
                  >
                   <option value="" disabled>
                    Select Room No
                 </option>
                  <option value="101">101</option>
                  <option value="102">102</option>
                  <option value="103">103</option>
                  </select>
                  <select
                    name="Room Type"
                    className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                    defaultValue=""
                  >
                   <option value="" disabled>
                    Select Room Type
                 </option>
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="suite">Suite</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Enter Room Price"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <input
                    type="datetime-local"
                    placeholder="Check In"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <input
                    type="date"
                    placeholder="Check Out"
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
      
{/* Add Customer Component */}
  const AddCustomer = () => {
    const [formData, setFormData] = useState({
      idType: "",
      idNo: "",
      name: "",
      phoneNo: "",
      address: "",
      gender: "",
      email: "",
      nationality: ""
    });
  
{/* Handle input change*/}
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };

{/* Handle form reset*/}
    const handleReset = () => {
      setFormData({
        idType: "",
        idNo: "",
        name: "",
        phoneNo: "",
        address: "",
        gender: "",
        email: "",
        nationality: ""
      });
    };

{/* Handle form submission (Next button)*/}
    const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setActiveTab("bookRoom");
    };
   

    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleNext}>
            <select
              name="idType"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.idType}
              onChange={handleInputChange}
            >
              <option value="" disabled>ID Type</option>
              <option value="citizenship">Citizenship</option>
              <option value="passport">Passport</option>
              <option value="drivingLiscense">Driving License</option>
              <option value="nationalIdCard">National ID Card</option>
            </select>
            <input
              type="text"
              name="idNo"
              placeholder="ID No."
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.idNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone No"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.phoneNo}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.address}
              onChange={handleInputChange}
            />
            <select
              name="gender"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.nationality}
              onChange={handleInputChange}
            />

            <div className="flex justify-end sm:justify-end px-2 py-2 space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-600 text-xl flex items-center space-x-2 font-sans"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-sans"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

{/* Book Room Component */}
const BookRoom = () => {
  const [formData, setFormData] = useState({
    room_type: "",
    room_no: "",
    room_price: "",
    checkIn: "",
    checkOut: ""
  });

  {/* Handle input change */}
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  {/* Handle form reset */}
  const handleReset = () => {
    setFormData({
      room_type: "",
      room_no: "",
      room_price: "",
      checkIn: "",
      checkOut: ""
    });
  };

  {/* Handle form submission */}
  const handleNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActiveTab("confirmedList");
  };

  {/* Handle back button */}
  const handleBack = () => {
    setActiveTab("addCustomer");
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6 align-right">

{/* Back Button */}
      <div className="flex justify-start mb-5">
        <button
          type="button"
          onClick={handleBack}
        >
         <Image src="/back.png" alt="room" width={50} height={50} className="rounded-full" />
        </button>

      </div>
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleNext}>
          <select
            name="room_type"
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_type}
            onChange={handleInputChange}
          >
            <option value="" disabled>Room Type</option>
            <option value="single">Single</option>
            <option value="double">Double</option>
            <option value="suite">Suite</option>
          </select>
          <select
            name="room_no"
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_no}
            onChange={handleInputChange}
          >
            <option value="" disabled>Room No</option>
            <option value="101">101</option>
            <option value="102">102</option>
            <option value="103">103</option>
          </select>
          <input
            type="text"
            name="room_price"
            placeholder="Room Price"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_price}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="checkIn"
            placeholder="Check In"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.checkIn}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="checkOut"
            placeholder="Check Out"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.checkOut}
            onChange={handleInputChange}
          />
          
{/* Action Buttons */}
          <div className="flex justify-end sm:justify-end px-2 py-2 space-x-2">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={handleReset}
                className="bg-gray-800 text-white px-8 py-4 rounded-lg hover:bg-gray-600 text-xl"
              >
                Reset
              </button>
              <button
                type="submit"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl"
              >
                Confirm
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

{/* Confirmed List Component */}
const ConfirmedList = () => {
  const handleBack = () => {
    setActiveTab("bookRoom");
  };

  return (
    <div className="bg-white p-6 rounded-lg">
      
{/* Back Button */}
      <div className="flex justify-start mb-5">
        <button
          type="button"
          onClick={handleBack}
        >
         <Image src="/back.png" alt="room" width={50} height={50} className="rounded-full" />
        </button>
      </div>

{/* Search bar with custom icon inside */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
          />
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
          <tr className="hover:bg-purple-100">
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center">
              <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={openModal}>
                Edit
              </a>
              <a href="#" className="text-red-600 hover:text-red-700 mr-2">
                Delete
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

  return (
    <div>
{/* Tabs for navigation */}
      <div className="flex justify-center mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 rounded-md ${activeTab === tab.id ? 'bg-gray-900 text-white text-lg font-serif' : 'bg-gray-200 text-gray-900 hover:bg-gray-100'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

{/* Render active component based on the selected tab */}
      <div className="mt-6">
        
        {activeTab === "addCustomer" && <AddCustomer />}
        {activeTab === "bookRoom" && <BookRoom />}
        {activeTab === "confirmedList" && <ConfirmedList />}
      </div>

{/* Modal */}
      <Modal />
    </div>
  );
}
