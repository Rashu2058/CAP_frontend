"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserProfile() {
  
  const[ReceptionistDetails, setReceptionistDetails]=useState<any>(null);  
  const [loading, setLoading] = useState<boolean>(true);
  const[error,setError]=useState<string|null>(null);

  useEffect(() => {
    const fetchReceptionistDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://localhost:8080/api/v1/receptionist", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });

       setReceptionistDetails(response.data.data); // Extract and set the data
        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.response?.data?.message || err.message || "An error occurred");
        setLoading(false);
      }
    };
  
    fetchReceptionistDetails();
  }, []);

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
 
  return (
    <div className="min-h-screen bg-gray-300 rounded-lg shadow-md flex justify-center items-center">
      <div className="bg-gray-900 rounded-lg shadow-md p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">User Profile</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/admin.png"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Information Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium text-white">Full Name</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {ReceptionistDetails.name}
            </p>
          </div>

           {/* Username */}
           <div>
            <label className="block font-medium text-white">Username</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {ReceptionistDetails.username}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-white">Email</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {ReceptionistDetails.email}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium text-white">Phone Number</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {ReceptionistDetails.phoneno}
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-white">Gender</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {ReceptionistDetails.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
