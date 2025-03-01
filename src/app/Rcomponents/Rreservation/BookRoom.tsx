"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Image from "next/image";
import axios from "axios";
import ConfirmedList from "./confirmedList";
import jwt_decode from 'jwt-decode';

interface AvailableRoom {
  room_no: number;
}

export interface ReservationData {
  res_id:number;
  guest_idno: string;
  room_type: string;
  room_no: string;
  room_price: string;
  check_in_date: string;
  check_out_date: string;
  receptionist_name:string;
}

export default function BookRoom() {
  
  const [formData, setFormData] = useState<ReservationData>({
    res_id:0,
    guest_idno: "",
    room_type: "",
    room_no: "",
    room_price: "",
    check_in_date: "",
    check_out_date: "",
    receptionist_name:"",
  });
  const [availableRooms, setAvailableRooms] = useState<AvailableRoom[]>([]);
  const [activeTab, setActiveTab] = useState("ConfirmedList");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  // Fetch available rooms
  useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (formData.room_type) {
        try {
          const token = localStorage.getItem("token"); // Retrieve token from local storage
          const response = await axios.get(`http://localhost:8080/api/reservations/rooms/${formData.room_type}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
          });
          console.log("Fetched rooms:",response.data);
          setAvailableRooms(response.data);
          setFormData(prevState=>({
            ...prevState,
            room_no:"",
            room_price:"",
          }));


        } catch (error:any) {
          console.error("Error fetching available rooms", error);
          if (error.response && error.response.status === 401) {
            alert("Unauthorized. Please log in.");
          }
        }
      }
    };
    fetchAvailableRooms();
  }, [formData.room_type]);

  useEffect(() => {
    const fetchRoomPrice = async () => {
      if (formData.room_no) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:8080/api/reservations/price/${formData.room_no}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          console.log("Fetched room price:", response.data);  // Check what you're receiving here
          setFormData((prevState) => ({
            ...prevState,
            room_price: response.data.price,  // Ensure response contains the correct price
          }));
        } catch (error) {
          console.error("Error fetching room price", error);
        }
      }
    };
    fetchRoomPrice();
  }, [formData.room_no]);

  useEffect(() => {
    console.log("Current room price:", formData.room_price); // Log the current room price to check if it's updated
  }, [formData.room_no]);
  

  // Pre-fill guest ID if available in local storage
  useEffect(() => {
    const storedGuestIdNo = localStorage.getItem("guest_idno");
    if (storedGuestIdNo) {
      setFormData((prev) => ({ ...prev, guest_idno: storedGuestIdNo }));
    
    }
  }, []);
   // Extract receptionist name from the JWT token
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = jwt_decode(token);
      const receptionistName = decoded.name; // Assuming the receptionist's name is stored in the token as 'name'
      setFormData((prevState) => ({
        ...prevState,
        receptionist_name: receptionistName, // Set receptionist name
      }));
    }
  }, []);

{/*validate form*/}
const validateForm = () => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.room_type) newErrors.room_type = "Room Type is required.";
  if (!formData.room_no) newErrors.room_no = "Room no is required.";
  if (!formData.check_in_date) newErrors.check_in_date = "CheckIn date is required.";
  if (!formData.check_out_date) newErrors.check_out_date = "CheckOut date is required.";

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  // Handle input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      res_id:0,
      guest_idno: "",
      room_type: "",
      room_no: "",
      room_price: "",
      check_in_date: "",
      check_out_date: "",
      receptionist_name:"",
    });
  };

    // Submit reservation to backend
    const submitReservation = async () => {
      if(!validateForm()) return;
      try {
          const token = localStorage.getItem("token");
          const reservationData = {
              roomType: formData.room_type,  // room_type from form data
              roomPrice: formData.room_price,  // room_price from form data
              check_in_date: formData.check_in_date,  // checkIn from form data
              check_out_date: formData.check_out_date,  // checkOut from form data
              receptionist_name:formData.receptionist_name
            };
  
          const response = await axios.post(
              `http://localhost:8080/api/reservations/add?guest_idno=${formData.guest_idno}&roomNo=${formData.room_no}`, 
              reservationData,
              {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
          );
          console.log("Reservation added successfully", response.data);
          setActiveTab("ConfirmedList");
          handleReset();
      } catch (error:any) {
          console.error("Error adding reservation", error);
          
      }
  };
  
  // Handle form submission
  const handleNext = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitReservation();
  };
  

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6 align-right">
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleNext}>
          <input
            type="text"
            name="guest_idno"
            placeholder="Guest ID No."
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.guest_idno}
            onChange={handleInputChange}
            readOnly
          />
          
          <select
            name="room_type"
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_type}
            onChange={handleInputChange}
          >
            <option value="" disabled>Room Type</option>
            <option value="SINGLE">Single</option>
            <option value="DOUBLE">Double</option>
            <option value="SUITE">Suite</option>
          </select>
          
          {errors.room_type && <p className="text-red-500 text-sm">{errors.room_type}</p>}
          <select
            name="room_no"
            className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_no}
            onChange={handleInputChange}
            required
            disabled={availableRooms.length === 0}
          >
            <option value="" disabled>Room No</option>
            {availableRooms.map((rooms) => (
              <option key={rooms.room_no} value={rooms.room_no}>
                {rooms.room_no}
              </option>
            ))}       
          {errors.room_no && <p className="text-red-500 text-sm">{errors.room_no}</p>}

          </select>
          <input
            type="text"
            name="room_price"
            placeholder="Room Price"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            value={formData.room_price}
            readOnly
          />

          <div className="grid grid-cols-2 gap-4 items-center mb-4">
  {/* Check-In Section */}
  <div className="flex flex-col">
    <label className="mb-1 text-black">Check In</label>
    <input
      type="datetime-local"
      name="check_in_date"
      className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
      value={formData.check_in_date}
      onChange={handleInputChange}
    />
    {errors.check_in_date && (
      <p className="text-red-500 text-sm mt-1">{errors.check_in_date}</p>
    )}
  </div>

  {/* Check-Out Section */}
  <div className="flex flex-col">
    <label className="mb-1 text-black ">Check Out</label>
    <input
      type="datetime-local"
      name="check_out_date"
      className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
      value={formData.check_out_date}
      onChange={handleInputChange}
    />
    {errors.check_out_date && (
      <p className="text-red-500 text-sm mt-1">{errors.check_out_date}</p>
    )}
  </div>
</div>

{/* Action Buttons */}
          <div className="flex justify-end space-x-2">
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
        </form>
      </div>
     
    </div>
  );
}
