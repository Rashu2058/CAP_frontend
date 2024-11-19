"use client";
import { useState, useRef } from "react";

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "help", label: "Help" },
];

export default function RSettings() {
  const [activeTab, setActiveTab] = useState("profile");

{/* State for the uploaded profile image*/}
  const [profileImage, setProfileImage] = useState("/admin.png");

{/* State for the selected help option*/}
  const [selectedHelpOption, setSelectedHelpOption] = useState("");

{/* Refs for file input*/}
  const profileInputRef = useRef<HTMLInputElement | null>(null);

{/* Function to handle profile image upload*/}
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

{/* Function to trigger profile input click*/}
  const handleProfileUploadClick = () => {
    profileInputRef.current?.click();
  };

{/* Handle help option selection*/}
  const handleHelpOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedHelpOption(event.target.value);
  };

{/* Profile Tab Component*/}
  const Profile = () => (
    <div className="flex justify-center items-center bg-gray-200">
      <div className="bg-white text-black w-full max-w-md p-6 rounded-lg shadow-lg space-y-12 space-x-8 relative">
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700">
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
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="user123@gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone No.</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              placeholder="9800000000"
            />
          </div>
        </div>
      </div>
    </div>
  );

{/* Help Tab Component*/}
  const Help = () => (
    <div className="flex justify-center items-center bg-gray-200 font-sans">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 space-x-8 relative">
        <h1 className="text-center font-bold text-2xl mb-4">FAQ</h1>

{/* Help options as radio buttons */}
        <div className="space-y-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="help"
              value="how-to-guides"
              className="form-radio text-pink-400"
              checked={selectedHelpOption === "how-to-guides"}
              onChange={handleHelpOptionChange}
            />
            <span>Guides</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="help"
              value="issue-troubleshooting"
              className="form-radio text-pink-400"
              checked={selectedHelpOption === "issue-troubleshooting"}
              onChange={handleHelpOptionChange}
            />
            <span>Issue troubleshooting</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="help"
              value="feature-request"
              className="form-radio text-pink-400"
              checked={selectedHelpOption === "feature-request"}
              onChange={handleHelpOptionChange}
            />
            <span>Feature request</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="help"
              value="other"
              className="form-radio text-pink-400"
              checked={selectedHelpOption === "other"}
              onChange={handleHelpOptionChange}
            />
            <span>Other</span>
          </label>
        </div>

{/* Next Button */}
        <button
          className="w-80 mt-8 py-2 bg-gray-950 rounded-lg text-white font-semibold hover:bg-gray-800"
          onClick={() => alert(`You selected: ${selectedHelpOption}`)}
        >
          Next
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8">

{/* Tabs for navigation */}
      <div className="flex justify-center space-x-4 border-b">
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
        {activeTab === "profile" && <Profile />}
        {activeTab === "help" && <Help />}
      </div>
    </div>
  );
}
