"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProfileSettings() {
  
{/* Manage which setting to display*/}
  const [activeSetting, setActiveSetting] = useState("profile");

{/* Components for each setting option*/}
  const Profile = () => (
    <div className="flex justify-center sm:justify-center px-3 py-5">
      <Image src="/admin.png" alt="User" width={100} height={100} className="rounded-full" />
    </div>
  );

  const ChangePassword = () => (
    <div>
      <h2 className="text-xl font-semibold">Change Password</h2>
      <p>Change your password securely.</p>
    </div>
  );

  const ChangeLogo = () => (
    <div>
      <h2 className="text-xl font-semibold">Change Logo</h2>
      <p>Upload a new logo for your account.</p>
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

{/* Main content area with flex layout */}
      <div className="flex">

{/* Sidebar */}
        <aside className="w-1/5 bg-purple-500 p-8 space-y-8 min-h-screen">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold font-serif">Settings</h2>
            <nav className="space-y-10">
              <button
                onClick={() => setActiveSetting("profile")}
                className="text-white font-serif hover:text-purple-300 flex items-center space-x-3"
              >
                <Image src="/profile.png" alt="User" width={30} height={30} className="rounded-full" />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveSetting("changePassword")}
                className="text-white font-serif hover:text-purple-300 flex items-center space-x-3"
              >
                <Image src="/key.png" alt="Change Password" width={30} height={30} />
                <span>Change Password</span>
              </button>
              <button
                onClick={() => setActiveSetting("changeLogo")}
                className="text-white font-serif hover:text-purple-300 flex items-center space-x-3"
              >
                <Image src="/changeLogo.png" alt="Change Logo" width={30} height={30} />
                <span>Change Logo</span>
              </button>
              <button
                onClick={() => setActiveSetting("logout")}
                className="text-white font-serif hover:text-purple-300 flex items-center space-x-3"
              >
                <Image src="/logout.png" alt="logout" width={30} height={30} />
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </aside>

{/* Content Area */}
        <div className="w-4/5 p-8">
          {activeSetting === "profile" && <Profile />}
          {activeSetting === "changePassword" && <ChangePassword />}
          {activeSetting === "changeLogo" && <ChangeLogo />}
        </div>

      </div>
    </div>
  );
}
