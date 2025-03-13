"use client";
import { useState, useRef } from "react";
import { useLogo } from "@/app/LogoContext";
import Image from "next/image";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";
import UserProfile from "../profile/page";
import axios from "axios";

// Tab data and corresponding components
const tabs = [
  { id: "profile", label: "Profile" },
  { id: "changeLogo", label: "Logo" },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { logoUrl, setLogoUrl } = useLogo(); // Use the context
  const logoInputRef = useRef<HTMLInputElement>(null); // Define the ref

  

  // Change Logo
  const ChangeLogo = () => (
    <div className="flex justify-center items-center bg-gray-200">
      <div className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl mb-4">Change Logo</h1>
        <p className="text-center mb-6">Upload a new logo for the hotel.</p>

        <div className="flex justify-center mb-6">
          <div className="relative">
            <Image
              src={logoUrl}
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
      </div>
    </div>
  );

  // Function to handle logo image upload
  const handleLogoImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post('http://localhost:8080/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          const newLogoUrl = `http://localhost:8080/api/files/${response.data.fileName}`;
          setLogoUrl(newLogoUrl);
          setSuccessMessage('Logo uploaded successfully!');
        } else {
          setErrorMessage('Failed to upload logo. Please try again');
        }
      } catch (error) {
        console.error('Error uploading logo:', error);
        setErrorMessage('Error uploading logo');
      }
    }
  };

  // Function to handle button click to trigger logo input
  const handleLogoUploadClick = () => {
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
        {activeTab === "profile" && <UserProfile />}
        {activeTab === "changeLogo" && <ChangeLogo />}
      </div>

      {/* Error and Success Messages */}
      {errorMessage && <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />}
      {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}
    </div>
  );
}