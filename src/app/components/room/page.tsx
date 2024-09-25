"use client"; // For client-side rendering
import { useState } from "react";

export default function RoomManagement() {
{/* State to control modal visibility */}
  const [isModalOpen, setIsModalOpen] = useState(false);
 
{/* Open and close modal */}
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>

{/* Room Management Section */}
      <div className="max-w-5xl mx-auto p-4">

{/* Add New Rooms Section */}
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Room</h3>
          <form className="grid grid-cols-1 gap-4 mb-4" action="/add-room" method="POST">
            <input
              type="text"
              name="roomNo"
              placeholder="Room No"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="roomType"
              placeholder="Room Type"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="roomPrice"
              placeholder="Room Price"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
          </form>
          <div className="flex justify-end sm:justify-end px-2 py-2">
            <button
              type="button"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-sans"
            >
              Add
            </button>
          </div>
        
{/* Room Details with Action Buttons */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg text-black font-bold mb-8 font-sans bg-gray-200 p-3 px-8">Room Details</h3>

          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-center border border-gray-300">Room No</th>
                <th className="py-3 px-6 text-center border border-gray-300">Room Type</th>
                <th className="py-3 px-6 text-center border border-gray-300">Room Price</th>
                <th className="py-3 px-6 text-center border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-100">
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center">
                <a href="#" className="text-gray-600 hover:text-gray-700 mr-2"onClick={openModal}>Edit</a>
                <a href="#" className="text-red-600 hover:text-red-700 mr-2">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>

{/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold font-sans mb-4">Update Room Details</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-serif">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-semibold font-serif">Room No:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Room Type:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Room Price:</span> 
              </p>
            </div>
          </div>

{/* New Update Section */} 
              <form className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 font-serif">Update Here</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Enter Room No"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Enter Room Type"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Enter Room Price"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
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
        )}
      </div>
    </div>
  );
}
