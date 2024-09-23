"use client";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Settings() {
  
{/* Manage which setting to display*/}
  const [activeSetting, setActiveSetting] = useState("profile");

{/* State for the uploaded profile and logo image*/}
  const [profileImage, setProfileImage] = useState("/admin.png");
  const [logoImage, setLogoImage] = useState("/Logo GraceInn.png"); 

{/* Reference to the hidden profile and logo input*/}
  const profileInputRef = useRef<HTMLInputElement | null>(null);
  const logoInputRef = useRef<HTMLInputElement | null>(null);

{/* Function to handle profile image upload*/}
  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };
  
{/*Function to handle logo image upload*/}
  const handleLogoImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLogoImage(imageUrl);
    }
  };

{/* Function to handle button click to trigger profile input*/}
  const handleProfileUploadClick = () => {
    profileInputRef.current?.click();
  };

{/* Function to handle button click to trigger logo input*/}
  const handleLogoUploadClick = () => {
    logoInputRef.current?.click();
  };
                               
                            {/* Components for each setting option*/}
                                
{/* Profile Picture Section */}
  const Profile = () => (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg space-y-12 space-x-8 relative">

{/* Save Button*/}
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            Save
          </button>
        </div>

        <h1 className="flex justify-center font-bold text-xl font-serif py-6">Edit Profile</h1>

        <div className="flex justify-center mb-6">
          <div className="relative">

{/*Profile upload button*/}
            <img
              src={profileImage}
              alt="Profile"
              width={100}
              height={100}
              className="w-24 h-24 rounded-full object-cover"
            />
            <button
              className="absolute bottom-0 right-0 bg-emerald-400 p-2 rounded-full text-lg font-bold"
              onClick={handleProfileUploadClick}
            >
              +
            </button>

{/* Hidden file input for profile */}
            <input
              type="file"
              ref={profileInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleProfileImageChange}
            />
          </div>
        </div>

{/* Form Section */}
        <div className="space-y-4">

{/* Name Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Hotel Admin"
            />
          </div>

{/* Username Input */}
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="admin123"
            />
          </div>

{/* Gender Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">Gender</label>
            <select className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500">
              <option>Male</option>
              <option>Female</option>
              <option>Others</option>
            </select>
          </div>
        </div>
        
      </div>
    </div>
  );

{/* Password Change Section*/}
  const ChangePassword = () => (
    <div className="flex justify-center items-center h-screen bg-gray-200 font-serif">
      <div className="bg-white text-black w-full max-w-md p-8 rounded-lg shadow-lg space-y-6 space-x-8 relative">

        <h1 className="text-center font-bold text-2xl mb-4">Change Password</h1>
        <p className="text-center mb-6">Update your password securely.</p>

{/*Form Section*/}
        <form className="space-y-4">

{/*Text Section*/}
          <div>
            <label className="block text-sm font-medium mb-1">Current Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Re-type New Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
              placeholder="Re-enter new password"
            />
          </div>

{/*Change Password Button*/}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );

{/* Logo Change Section*/}
    const ChangeLogo = () => (
      <div className="flex justify-center items-center h-screen bg-gray-200">
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

{/*Logo upload button*/}
              <button
                className="absolute bottom-0 right-0 bg-gray-200 p-2 rounded-full text-lg font-bold"
                onClick={handleLogoUploadClick}
              >
                +
              </button>
              
{/* Hidden file input for logo */}
            <input
              type="file"
              ref={logoInputRef}
              style={{ display: "none" }}
              accept="image/*"
              onChange={handleLogoImageChange}
            />
          </div>
        </div>

{/*Save Button*/}
          <div className="text-center mt-6">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              Save Logo
            </button>
          </div>
        </div>
      </div>
    );

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

{/* Main content area */}
      <div className="flex">
        <aside className="bg-purple-500 p-4 lg:p-8 min-h-screen transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-6">
            <h2 className="hidden lg:block text-2xl font-bold font-serif text-white">Settings</h2>
            <nav className="space-y-10">
              <button
                onClick={() => setActiveSetting("profile")}
                className="text-white font-serif hover:text-purple-300 flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3"
              >
                <Image src="/profile.png" alt="Profile" width={30} height={30} className="rounded-full" />
                <span className="hidden lg:inline-block">Profile</span>
              </button>
              <button
                onClick={() => setActiveSetting("changePassword")}
                className="text-white font-serif hover:text-purple-300 flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3"
              >
                <Image src="/key.png" alt="Change Password" width={30} height={30} />
                <span className="hidden lg:inline-block">Change Password</span>
              </button>
              <button
                onClick={() => setActiveSetting("changeLogo")}
                className="text-white font-serif hover:text-purple-300 flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3"
              >
                <Image src="/changeLogo.png" alt="Change Logo" width={30} height={30} />
                <span className="hidden lg:inline-block">Change Logo</span>
              </button>
              <button
                onClick={() => setActiveSetting("logout")}
                className="text-white font-serif hover:text-purple-300 flex items-center justify-center lg:justify-start space-x-0 lg:space-x-3"
              >
                <Image src="/logout.png" alt="Logout" width={30} height={30} />
                <span className="hidden lg:inline-block">Logout</span>
              </button>
            </nav>
          </div>
        </aside>

{/* Content Area */}
        <div className="w-full lg:w-4/5 p-8">
          {activeSetting === "profile" && <Profile />}
          {activeSetting === "changePassword" && <ChangePassword />}
          {activeSetting === "changeLogo" && <ChangeLogo />}
        </div>
      </div>

{/* Footer */}
      <footer className="bg-purple-600 text-white text-center py-4 font-serif text-2xl">
        Hotel Grace Inn 2024
      </footer>
    </div>
  );
}
