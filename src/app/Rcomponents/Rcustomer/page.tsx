"use client";
import React, { useState } from "react";

export default function Customer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open and close modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Modal Component
  const Modal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold font-sans mb-4">Update Customer Details</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2 gap-4">
              <p>
                <span className="font-semibold">ID Type:</span> 
              </p>
              <p>
                <span className="font-semibold">ID No:</span> 
              </p>
              <p>
                <span className="font-semibold">Name:</span> 
              </p>
              <p>
                <span className="font-semibold">Phone No:</span> 
              </p>
              <p>
                <span className="font-semibold">Address:</span> 
              </p>
              <p>
                <span className="font-semibold">Gender:</span> 
              </p>
              <p>
                <span className="font-semibold">Email:</span> 
              </p>
              <p>
                <span className="font-semibold">Nationality:</span> 
              </p>
            </div>
          </div>

{/* New Update Section */} 
          <form className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="ID Type"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                <option value="citizenship">Citizenship</option>
                <option value="passport">Passport</option>
                <option value="drivingLiscense">Driving Liscense</option>
                <option value="nationalId">National ID Card</option>
              </select>
              <input
                type="text"
                placeholder="Enter ID No."
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Enter Name"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Enter Phone No."
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                placeholder="Enter Address"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <select
                name="Gender"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                defaultValue=""
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="others">Others</option>
              </select>
              <input
                type="email"
                placeholder="Enter Email"
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
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
  const CustomerDetails = () => (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-xl font-bold">Customer Details</h1>
      {/* Search bar with custom icon inside */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
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
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-center border border-gray-300">ID Type</th>
            <th className="py-3 px-6 text-center border border-gray-300">ID No.</th>
            <th className="py-3 px-6 text-center border border-gray-300">Name</th>
            <th className="py-3 px-6 text-center border border-gray-300">Phone No</th>
            <th className="py-3 px-6 text-center border border-gray-300">Address</th>
            <th className="py-3 px-6 text-center border border-gray-300">Gender</th>
            <th className="py-3 px-6 text-center border border-gray-300">Email</th>
            <th className="py-3 px-6 text-center border border-gray-300">Nationality</th>
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
            <td className="py-3 px-6 border border-gray-300 text-center"></td>
            <td className="py-3 px-6 border border-gray-300 text-center">
              <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={openModal}>
                Edit
              </a>
              <a href="#" className="text-red-600 hover:text-red-700 mr-2">Delete</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* Render Customer Details */}
      <CustomerDetails />

      {/* Modal */}
      <Modal />
    </div>
  );
}
