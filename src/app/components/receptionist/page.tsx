"use client";
import { headers } from "next/headers";
import React, { useState, useEffect } from "react";
import axios  from "axios";

const token =localStorage.getItem('token');
console.log("Token from localstorage:",token);
interface Receptionist {
  id: number;
  name: string;
  phoneno: string;
  gender: string;
  email: string;
  username: string;
  password: string;
  address:string;
}

export default function ReceptionistManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | null>(null);
  const [formData, setFormData] = useState<Receptionist>({
    id: 0,
    name: '',
    phoneno: '',
    gender: '',
    email: '',
    username: '',
    password: '',
    address:''
  });

  const openModal = (receptionist: Receptionist | null = null) => {
    setSelectedReceptionist(receptionist);
    setFormData(
      receptionist || {
        id: 0,
        name: '',
        phoneno: '',
        gender: '',
        email: '',
        username: '',
        password: '',
        address:'',
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReceptionist(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = selectedReceptionist
      ? `http://localhost:8080/api/v1/admin/updateReceptionist/${selectedReceptionist.id}`
      : `http://localhost:8080/api/v1/admin/registerReceptionist`;

    const method = selectedReceptionist ? 'PUT' : 'POST';

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add a space between 'Bearer' and token
      },
      body: JSON.stringify(formData),
    });
  
    // Fetch updated receptionist data
    fetchReceptionists();
    closeModal();
  };

  const fetchReceptionists = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/admin/receptionists', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      setReceptionists(data.data);
    } catch (error) {
      console.error("Error fetching receptionists:", error);
    }
  };

  const deleteReceptionist = async (id: number) => {
    await fetch(`http://localhost:8080/api/v1/admin/deleteReceptionist/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the token here
      },
    });
    fetchReceptionists();
  };

  useEffect(() => {
    fetchReceptionists();
  }, []);

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Receptionist</h3>
          <form className="grid grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="phoneno"
              placeholder="Phone No"
              value={formData.phoneno}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            
            <input
              type="text"
              name="address"
              placeholder="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-sans"
            >
              {selectedReceptionist ? 'Update' : 'Add'}
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg text-black font-bold mb-8 font-sans bg-gray-200 p-3 px-8">Receptionist Details</h3>
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-6 text-center border border-gray-300">Name</th>
                <th className="py-3 px-6 text-center border border-gray-300">Phone No</th>
                <th className="py-3 px-6 text-center border border-gray-300">Gender</th>
                <th className="py-3 px-6 text-center border border-gray-300">Addres</th>
                <th className="py-3 px-6 text-center border border-gray-300">Email</th>
                <th className="py-3 px-6 text-center border border-gray-300">Username</th>
               <th className="py-3 px-6 text-center border border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {receptionists.map((receptionist) => (
                <tr key={receptionist.id} className="hover:bg-purple-100">
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.name}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.phoneno}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.gender}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.address}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.email}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">{receptionist.username}</td>
                  <td className="py-3 px-6 border border-gray-300 text-center">
                    <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={() => openModal(receptionist)}>Edit</a>
                    <a href="#" className="text-red-600 hover:text-red-700 mr-2" onClick={() => deleteReceptionist(receptionist.id)}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold font-sans mb-4">{selectedReceptionist ? 'Update Receptionist Details' : 'Add New Receptionist'}</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                <input
                  type="text"
                  name="phoneno"
                  placeholder="Phone No"
                  value={formData.phoneno}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300 w-full"
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="MALE">Male</option>
                  <option value="FEMALE">Female</option>
                  <option value="OTHERS">Others</option>
                </select>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-8 py-2 rounded-lg hover:bg-gray-700 w-full"
                >
                  {selectedReceptionist ? 'Update' : 'Add'}
                </button>
              </form>
              <button className="mt-4 text-gray-600 hover:text-gray-900" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 