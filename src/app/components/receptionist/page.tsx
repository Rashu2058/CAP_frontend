"use client"; // For client-side rendering
import React, { useState,useEffect } from "react";
import Image from "next/image";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

interface Receptionist{
  id:number;
  name:string;
  phoneno:string;
  gender:string;
  email:string;
  username:string;
  password?:string;
  address:string;
};


export default function ReceptionistManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
  const token=localStorage.getItem("token") ||"";

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
    setFormData((prev:Receptionist) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(!validateForm()) return;
    
    const url = selectedReceptionist
      ? `http://localhost:8080/api/v1/admin/updateReceptionist/${selectedReceptionist.id}`
      : `http://localhost:8080/api/v1/admin/registerReceptionist`;

    const method = selectedReceptionist ? 'PUT' : 'POST';
    handleReset();

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Add a space between 'Bearer' and token
      },
      body: JSON.stringify(formData),
      
    });
    setSuccessMessage("Successfully added")
    // Fetch updated receptionist data
    fetchReceptionists();

    closeModal();
  };
  const handleReset = () => {
    setFormData({
      id: 0,
      name: '',
      phoneno: '',
      gender: '',
      email: '',
      username: '',
      password: '',
      address:'',
    });
  };
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const[errorMessage,setErrorMessage]=useState("")
  const [successMessage, setSuccessMessage] = useState<string>("");
  
  {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}
  {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />}
 {/*check valid email*/}
    const isValidEmail = (email: string): boolean => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

{/*validate form*/}
const validateForm = () => {
   {/*Error pop up message */}
   <ErrorPopup message={errorMessage}onClose={()=>setErrorMessage("")}/>
  const newErrors: { [key: string]: string } = {};
  
  if (!formData.name) newErrors.name = "Name is required.";
  if (!formData.phoneno) newErrors.phoneno = "Phone number is required.";
  if (formData.phoneno && formData.phoneno.toString().length !== 10) {
    newErrors.phoneno = "Phone number must be 10 digits.";
   
  }
  if (!formData.address) newErrors.address = "Address is required.";
  if (!formData.username) newErrors.username = "Address is required.";
  if(!formData.password){
    newErrors.password="Password is required";
  }
  if (!formData.gender) newErrors.gender = "Gender is required.";
  if (!formData.email) newErrors.email = "Email is required.";
  if (formData.email && !isValidEmail(formData.email)) {
    newErrors.email = "Invalid email format.";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


  const fetchReceptionists = async () => {
    try {
      const token = localStorage.getItem("token") || "";
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
    const token = localStorage.getItem("token") || "";
    const response=await fetch(`http://localhost:8080/api/v1/admin/deleteReceptionist/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`, // Add the token here 
      },
    });
    if(response.ok){
        setSuccessMessage("Deleted Successfully");
        fetchReceptionists();
      }else{
        setErrorMessage("Error occured");
      }

  };

  useEffect(() => {
    fetchReceptionists();
  }, []);

{/*Filter reports based on user input*/}
  const filteredReceptionists = receptionists.filter((recep) =>{
    const matchesQuery=
      (recep.name?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (recep.email?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      String(recep.phoneno || "").toLowerCase().includes(searchQuery.toLowerCase());
      return matchesQuery;  
    });

  return (
    <div>
      <div className="max-w-5xl mx-auto p-4">
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Front Desk Representative</h3>
          <form className="grid grid-cols-2 gap-4 mb-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              maxLength={30}
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
              {errors.name && <span className="text-red-500">{errors.name}</span>}
            <input
              type="number"
              name="phoneno"
              minLength={10} maxLength={14}
              placeholder="Phone No"
              value={formData.phoneno}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            {errors.phoneno && <span className="text-red-500">{errors.phoneno}</span>}
              
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
            {errors.gender && <span className="text-red-500">{errors.gender}</span>}
               
            <input
              type="text"
              name="email"
              maxLength={20}
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            {errors.email && <span className="text-red-500">{errors.email}</span>}
            <input
              type="text"
              name="username"
              maxLength={15}
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="password"
              minLength={6} 
              maxLength={10}
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            {errors.password && <span className="text-red-500">{errors.password}</span>}
            <input
              type="text"
              name="address"
              maxLength={20}
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />         
            {errors.address && <span className="text-red-500">{errors.address}</span>}
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-2 rounded-lg hover:bg-gray-700 text-xl"
            >
              {selectedReceptionist ? 'Update' : 'Add'}

            </button>
          </form>
        </div>
        
{/*Receptionist Details Section */}
        <div className="bg-white p-6 rounded-lg min-w-min">
          <h3 
          className="text-lg text-black font-bold mb-8 font-sans bg-gray-200 p-3 px-8">
            Front Desk Representative Details</h3>
          
{/* Search bar*/}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            maxLength={20}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
          
{/*Table */}
  <div id="" className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-800 text-white">
            <tr>
                <th className="py-3 px-6 text-center border ">Name</th>
                <th className="py-3 px-6 text-center border ">Phone No</th>
                <th className="py-3 px-6 text-center border ">Gender</th>
                <th className="py-3 px-6 text-center border ">Addres</th>
                <th className="py-3 px-6 text-center border ">Email</th>
                <th className="py-3 px-6 text-center border ">Username</th>
               <th className="py-3 px-6 text-center border ">Action</th>
              </tr>
            </thead>
            <tbody>
            {filteredReceptionists.length > 0 ? (
                filteredReceptionists.map((receptionist,index) => (
                <tr key={index} className="hover:bg-gray-100">

                  <td className="py-3 px-6  text-center">{receptionist.name}</td>
                  <td className="py-3 px-6  text-center">{receptionist.phoneno}</td>
                  <td className="py-3 px-6  text-center">{receptionist.gender}</td>
                  <td className="py-3 px-6  text-center">{receptionist.address}</td>
                  <td className="py-3 px-6  text-center">{receptionist.email}</td>
                  <td className="py-3 px-6  text-center">{receptionist.username}</td>
                  <td className="py-3 px-6  text-center">
                  <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={() => openModal(receptionist)}>Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-700 mr-2" onClick={() => deleteReceptionist(receptionist.id)}>Delete</a>
                    {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}
                  </td>
                </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-3 text-gray-500">
                    No matching receptionists found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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
                {errors.name && <span className="text-red-500">{errors.name}</span>}
                <input
                  type="text"
                  name="phoneno"
                  placeholder="Phone No"
                  value={formData.phoneno}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                {errors.phoneno && <span className="text-red-500">{errors.phoneno}</span>}
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
                {errors.gender && <span className="text-red-500">{errors.gender}</span>}
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                {errors.email && <span className="text-red-500">{errors.email}</span>}
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                {errors.username && <span className="text-red-500">{errors.username}</span>}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  minLength={6}
                  maxLength={10}
                  value={formData.password}
                  onChange={handleChange}
                  className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300 w-full"
                />
                {errors.password && <span className="text-red-500">{errors.password}</span>}

{/*Action Buttons */}
          <div className="flex justify-end gap-x-4">
            <button
              type="submit"
              className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500 "
            >
              Save
            </button>
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
              onClick={closeModal}
            >
             Cancel
            </button>
          </div>
          </form>
        </div>
      </div>
        )}
      </div>
    </div>
  )
} 