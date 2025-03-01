"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { addGuest} from "./AddGuest";
import BookRoom from "./BookRoom";
import ConfirmedList from "./confirmedList";


{/* Tab data and corresponding components */}
const tabs = [
  { id: "addguest", label: "Guest" },
  { id: "bookRoom", label: "Reservation" },
  { id: "confirmedList", label: "Reserved" },
];

export default function Reservation() {
  const [activeTab, setActiveTab] = useState("addguest");
  const [isModalOpen, setIsModalOpen] = useState(false);

{/* Open and close modal */}
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

{/* Modal Component */}
  const Modal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold font-sans mb-4">Update Reservation</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2 gap-2">
            <p>
                <span className="font-semibold">ID No:</span> 
              </p>
              <p>
                <span className="font-semibold">guest Name:</span> 
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
        </div>
        </div>
    )
  );
      
{/* Add guest Component */}
  const Addguest = () => {
    const [formData, setFormData] = useState<{
      g_id: number;
      id_type: string;
      id_no: number | null;
      name: string;
      phone_number: number | null;
      address: string;
      gender_type: string;
      email: string;
      nationality: string;
      check_in_date:string,
      check_out_date:string,
      room_no:string,
      room_type:string,
      receptionist_name:string,
      institutionName:string,
      purpose:string,
    }>({
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
      receptionist_name:"",
      institutionName:"",
      purpose:"",
    });

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

{/* Handle input change*/}
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  const { name, value } = e.target;

  // For number fields, treat empty values as null
  if (name === "id_no" || name === "phone_number") {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value === "" ? null : Number(value),  // Convert empty string to null
    }));
  } else {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
};

{/* Handle form reset*/}
    const handleReset = () => {
      setFormData({
        g_id:0,
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
        receptionist_name:"",
        institutionName:"",
        purpose:"",
      });
    };
{/*check valid email*/}
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

{/*validate form*/}
    const validateForm = () => {
      const newErrors: { [key: string]: string } = {};
    
      if (!formData.id_type) newErrors.id_type = "ID Type is required.";
      if (!formData.id_no) newErrors.id_no = "ID No. is required.";
      if (!formData.name) newErrors.name = "Name is required.";
      if (!formData.phone_number) newErrors.phone_number = "Phone number is required.";
      if (formData.phone_number && formData.phone_number.toString().length !== 10) {
        newErrors.phone_number = "Phone number must be 10 digits.";
      }
      if (!formData.address) newErrors.address = "Address is required.";
      if (!formData.gender_type) newErrors.gender_type = "Gender is required.";
      if (!formData.email) newErrors.email = "Email is required.";
      if (formData.email && !isValidEmail(formData.email)) {
        newErrors.email = "Invalid email format.";
      }
      if (!formData.nationality) newErrors.nationality = "Nationality is required.";
    
      setErrors(newErrors);
    
      return Object.keys(newErrors).length === 0;
    };

{/* Handle form submission (Next button)*/}
    const handleAddguest = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(!validateForm()) return;

      try {
        // Convert phoneNo to BigInt
        const guestData = {
            ...formData,
            phoneNo: Number(formData.phone_number),
            id_no: formData.id_no||0,
            g_id:formData.g_id||0 // Convert to BigInt
        };
        
        await addGuest(guestData);

        handleReset();
        setActiveTab("bookRoom");
        
    } catch (error) {
        console.error("Error adding guest", error);
        alert("Failed to add guest.Please try again");
    }
    };

    return (
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleAddguest}>
            <select
              name="id_type"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.id_type}
              onChange={handleInputChange}
            >
              <option value="" disabled>ID Type</option>
              <option value="CITIZENSHIP">Citizenship</option>
              <option value="PASSPORT">Passport</option>
              <option value="DRIVING_LICENSE">Driving License</option>
              <option value="NID_CARD">National ID Card</option>
              <option value="INSTITUTION_CARD">Institution Card</option>
            </select>
            <input
              type="text"
              name="id_no"
              placeholder="ID No."
              maxLength={25}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.id_no||""}
              onChange={handleInputChange}
            />
            {errors.id_no && <p className="text-red-500 text-sm">{errors.id_no}</p>}
            <input
              type="text"
              name="name"
              placeholder="Name"
              maxLength={25}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.name}
              onChange={handleInputChange}
            />
            
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
           
            <input
              type="tel"
              name="phone_number"
              placeholder="Phone No"
              maxLength={14}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.phone_number||""}
              onChange={handleInputChange}
            />
            {errors.phone_number && <p className="text-red-500 text-sm">{errors.phone_number}</p>}
            <input
              type="text"
              name="address"
              placeholder="Address"
              maxLength={25}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.address}
              onChange={handleInputChange}
            />
            {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
            <select
              name="gender_type"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.gender_type}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
            {errors.gender_type && <p className="text-red-500 text-sm">{errors.gender_type}</p>}
            <input
              type="text"
              name="email"
              placeholder="Email"
              maxLength={20}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            <input
              type="text"
              name="nationality"
              placeholder="Nationality"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.nationality}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="institutionName"
              placeholder="Institution name"
              maxLength={30}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.institutionName}
              onChange={handleInputChange}
            />
            {errors.institution && <p className="text-red-500 text-sm">{errors.nationality}</p>}

            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}
            <input
              type="text"
              name="purpose"
              placeholder="Purpose"
              maxLength={30}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.purpose}
              onChange={handleInputChange}
            />
            {errors.nationality && <p className="text-red-500 text-sm">{errors.nationality}</p>}

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
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="p-8">

{/* Tabs for navigation */}
      <div className="flex justify-start space-x-4 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-2 ${activeTab === tab.id ? 
              'border-b-4 border-gray-600 text-gray-700 font-bold' 
              : 'text-gray-700 hover:text-gray-400'}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

{/* Render active component based on the selected tab */}
      <div className="mt-6">
        
        {activeTab === "addguest" && <Addguest />}
        {activeTab === "bookRoom" && <BookRoom/>}
        {activeTab === "confirmedList" && <ConfirmedList />}
      </div>

{/* Modal */}
      <Modal />
    </div>
  );
}
