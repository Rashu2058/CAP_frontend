"use client"; // For client-side rendering
import { useState } from "react";
import Image from "next/image";

export default function RoomManagement() {
{/* State to control modal visibility */}
  const [isModalOpen, setIsModalOpen] = useState(false);
 
{/* Open and close modal */}
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-200">

{/* Navigation bar */}
      <nav className="bg-gray-300 p-2 flex justify-between items-center">
       
{/* Logo Section */}
        <div className="flex items-center space-x-0 font-serif font-bold font-xl text-purple-800">
          <Image src="/Logo GraceInn.png" alt="Logo" width={65} height={65} />
          <h1>Grace Inn</h1>
        </div>

{/* Navigation and User Section */}
        <div className="flex items-center space-x-8">
          
{/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 justify-items-end font-serif">
            <a href="#" className="text-purple-800 hover:text-gray-200">Dashboard</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Rooms</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Receptionists</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Food Menu</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Reports</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Settings</a>
          </div>

{/* User Section */}
          <div className="flex justify-end sm:justify-end px-3 py-2">
            <button
              type="button"
              className="bg-gray-300 text-purple-800 font-serif px-3 py-2 rounded-lg flex items-center space-x-3"
            >
              <Image src="/admin.png" alt="User" width={25} height={25} className="rounded-full" />
              <span>Admin</span>
            </button>
          </div>

{/* Small screen menu */}
          <div className="lg:hidden">
            <input id="menu-toggle" type="checkbox" className="hidden" />
            <label htmlFor="menu-toggle" className="cursor-pointer block lg:hidden">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </label>

{/* Small screen dropdown menu */}
            <div className="hidden lg:flex" id="mobile-menu">
              <ul className="flex flex-col space-y-4 bg-gray-300 p-4">
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Dashboard</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Rooms</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Receptionists</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Food Menu</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Reports</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

{/* Receptioinist Management Section */}
      <div className="max-w-5xl mx-auto p-20">
        <h2 className="text-2xl font-bold mb-6 font-serif">Receptionist Management</h2>

{/* Add New Receptionist Section */}
        <div className="bg-purple-400 p-6 rounded-lg mb-6 align-right">
          <h3 className="text-lg text-black font-bold mb-4 font-serif"><u>Add New Receptionist</u></h3>
          <form className="grid grid-cols-2 gap-4 mb-4" action="/add-receptionist" method="POST">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone No"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <select
              name="gender"
              className="p-2 border rounded-lg"
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
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
          </form>
          <div className="flex justify-end sm:justify-end px-6 py-4">
            <button
              type="button"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 text-xl flex items-center space-x-2 font-serif"
            >
              <Image src="/add.png" alt="Add" width={26} height={26} className="rounded-full" />
              <span>Add</span>
            </button>
          </div>
        </div>

{/* Delete Section */}
          <div className="flex justify-end sm:justify-end px-6 py-4 space-x-10">
          <button
            type="button"
            className="bg-red-600 text-white text-xl font-serif px-8 py-4 rounded-lg hover:bg-red-700 flex items-center space-x-2"
          >
            <Image src="/delete.png" alt="Delete" width={26} height={26} className="rounded-full" />
            <span>Delete</span>
          </button>
        </div>
        
{/* Room Details with Update Button */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg text-black font-bold mb-8 font-serif bg-purple-300 p-3 px-6">Receptionist Details</h3>

          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="py-3 px-6 text-center border border-gray-300">Name</th>
                <th className="py-3 px-6 text-center border border-gray-300 ">Phone No</th>
                <th className="py-3 px-6 text-center border border-gray-300">Gender</th>
                <th className="py-3 px-6 text-center border border-gray-300">Email</th>
                <th className="py-3 px-6 text-center border border-gray-300">Username</th>
                <th className="py-3 px-6 text-center border border-gray-300">Password</th>
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
                <td className="py-3 px-6 border border-gray-300 text-center">
                <a href="#" className="text-purple-800 hover:text-purple-300 mr-2"onClick={openModal}>Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

{/* Update Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-purple-100 p-10 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold font-serif mb-4">Update Room Details</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-serif">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-semibold font-serif">Name:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Phone No:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Gender:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Email:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Username:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Password:</span> 
              </p>
            </div>
          </div>

{/* New Update Section */} 
              <form className="space-y-4">
              <h3 className="text-lg font-semibold mb-3 font-serif">Update Here</h3>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Enter Phone No"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  />
                  <select
                    name="gender"
                    className="p-2 border rounded-lg"
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
                    type="text"
                    placeholder="Enter Email"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Enter Username"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                  />
                  <input
                    type="text"
                    placeholder="Enter Password"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
                    className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

{/* Footer */}
      <footer className="bg-purple-500 text-white text-center py-4 font-serif text-2xl">
        Hotel Grace Inn 2024
      </footer>

{/* Logout Section */}
      <div className="flex justify-end sm:justify-end px-6 py-4">
        <button
          type="button"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
