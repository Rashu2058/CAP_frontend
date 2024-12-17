"use client";
import { useState,useEffect, useRef } from "react";
import axios from "axios";
import Image from "next/image";

{/* Tab data and corresponding components*/}
const tabs = [
  { id: "profile", label: "Profile" },
  { id: "changePassword", label: "Password" },
  { id: "changePicture", label: "System Picture" },
  { id: "changeLogo", label: "Logo" },
];


export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const[adminDetails, setAdminDetails]=useState<any>(null);  
{/* State for the uploaded profile and logo image */}
  const [profileImage, setProfileImage] = useState("/admin.png");
  const [logoImage, setLogoImage] = useState("/logo.png"); 

{/* Reference to the hidden profile and logo input */}
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://localhost:8080/api/v1/admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });

       setAdminDetails(response.data.data); // Extract and set the data
        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.response?.data?.message || err.message || "An error occurred");
        setLoading(false);
      }
    };
  
    fetchAdminDetails();
  }, []);
  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please login.");
      }
  
      const formData = new FormData();
      formData.append("name", adminDetails?.name || "");
      formData.append("username", adminDetails?.username || "");
      formData.append("email", adminDetails?.email || "");
      formData.append("phoneno", adminDetails?.phoneno?.toString() || "");
      formData.append("gender", adminDetails?.gender || "");
  
      console.log("Form data being sent:", formData);  // Debugging form data
  
      const response = await axios.put(
        "http://localhost:8080/api/v1/admin/updateAdmin",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type":"application/json"
          },
        }
      );
  
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      setError(
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An error occurred"
      );
    }
  };
  
  
  
{/* Component definitions*/}

{/*Profile*/}
  const Profile = () => (
    <div className="flex justify-center items-center bg-gray-200">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg space-y-12 space-x-8 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700" onClick={handleSaveProfile}>
            Save
          </button>
        </div>

        <h1 className="flex justify-center font-bold text-xl font-sans py-6">Edit Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full text-lg font-bold"
              onClick={handleProfileUploadClick}
            >
              +
            </button>
            <input
              type="file"
              ref={profileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Hotel Admin"
              defaultValue={adminDetails?.name||""}
              onChange={(e)=> setAdminDetails({...adminDetails,name:e.target.value
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="admin123"
              defaultValue={adminDetails?.username||""}
              onChange={(e)=> setAdminDetails({...adminDetails,username:e.target.value
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="admin123@gmail.com"
              defaultValue={adminDetails?.email||""}
              onChange={(e)=> setAdminDetails({...adminDetails,email:e.target.value
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone No</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="9800000000"
              defaultValue={adminDetails?.phoneno||""}
              onChange={(e)=> setAdminDetails({...adminDetails,phoneno:e.target.value
              })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
             defaultValue={adminDetails?.gender||""}
             onChange={(e)=> setAdminDetails({...adminDetails,gender:e.target.value
             })}
            >
            <option value="" disabled>
              Select Gender
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Others</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

{/*Change Password*/}
  const ChangePassword = () => (
    <div className="flex justify-center items-center bg-gray-200 font-sans">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 space-x-8 relative">
        <h1 className="text-center font-bold text-2xl mb-4">Change Password</h1>
        <p className="text-center mb-6">Update your password securely.</p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Re-type New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="Re-enter new password"
            />
          </div>
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
{/*Change Picture*/}
const ChangePicture = () => (
  <div className="flex justify-center items-center bg-gray-200">
    <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
      <h1 className="text-center font-bold text-2xl mb-4">Change Picture</h1>
      <p className="text-center mb-6">Upload a new picture for the hotel.</p>

      <div className="flex justify-center mb-6">
        <div className="relative">
          
          <button
            className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full text-lg font-bold"
            onClick={handlePictureUploadClick}
          >
            +
          </button>
          <input
            type="file"
            ref={logoInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handlePictureChange}
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
);

{/*Change Logo*/}
  const ChangeLogo = () => (
    <div className="flex justify-center items-center bg-gray-200">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-4">Change Logo</h1>
        <p className="text-center mb-6">Upload a new logo for the hotel.</p>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src={logoImage}
              alt="Logo"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full text-lg font-bold"
              onClick={handleLogoUploadClick}
            >
              +
            </button>
            <input
              type="file"
              ref={logoInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleLogoImageChange}
            />
          </div>
        </div>

        <div className="text-center mt-6">
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-2 rounded-md hover:bg-gray-700"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

{/* Function to handle profile image upload */}
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  
{/* Function to handle logo image upload */}
  const handleLogoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoImage(imageUrl);
    }
  };

{/* Function to handle picture image upload */}
const handlePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
   
  }
};

{/* Function to handle button click to trigger profile input */}
  const handleProfileUploadClick = () => {
    profileInputRef.current?.click();
  };

{/* Function to handle button click to trigger logo input */}
  const handleLogoUploadClick = () => {
    logoInputRef.current?.click();
  };

{/* Function to handle button click to trigger picture input */}
  const handlePictureUploadClick = () => {
    logoInputRef.current?.click();
  };

return (
    <div className="p-8">
{/* Tabs for navigation */}
      <div className="flex justify-center space-x-4 border-b">
        {tabs.map(tab => (
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
        {activeTab === "profile" && <Profile />}
        {activeTab === "changePassword" && <ChangePassword />}
        {activeTab === "changePicture" && <ChangePicture />}
        {activeTab === "changeLogo" && <ChangeLogo />}
      </div>
    </div>
  );
}
