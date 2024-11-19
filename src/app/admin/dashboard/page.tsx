"use client"; 

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import RoomManagement from '../../components/room/page';
import ReceptionistManagement from '../../components/receptionist/page';
import FoodManagement from '../../components/foodMenu/page';
import Settings from '../../components/setting/page';
import Profile from '../../components/profile/page';
import Revenue from '@/app/components/revenue/page';
import Report from '@/app/components/report/page';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const [activeSetting, setActiveSetting] = useState("revenue");
  const [isOpen, setIsOpen] = useState(false);
  const router=useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown menu
  {/*handle logout*/}
  const handlelogout=()=>{
    localStorage.removeItem("authtoken");
    router.push("/");
  };
{/* Close the dropdown when clicking outside of it*/}
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false); // Close dropdown
    }
  }

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [dropdownRef]);


  return (
    <div className="min-h-screen flex bg-gray-200">

{/* Sidebar section */}
      <aside className="bg-gray-950 p-4 lg:p-8 max-h-full w-1/6 h-screen sticky top-0">
        <div className="flex flex-col space-y-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </div>
          <nav className="space-y-4">
            <a href="#" onClick={() => setActiveSetting("revenue")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "revenue" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/dashboard.png" alt="dashboard" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Dashboard</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("room")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "room" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/rooom.png" alt="room" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Room</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("receptionist")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "receptionist" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/receptionist.png" alt="receptionist" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Receptionist</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("food")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "food" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/food.png" alt="food" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Food Menu</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("settings")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "settings" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/settings.png" alt="settings" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Settings</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("report")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "report" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/report.png" alt="report" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Report</span>
            </a>

          </nav>
        </div>
      </aside>

{/* Main Content Area */}
      <div className="flex-grow h-screen overflow-y-auto">

{/* Navigation bar */}
        <nav className="bg-white p-2 flex justify-between items-center">

{/* Search bar with custom icon inside */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
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

{/* Profile Picture and Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)} 
            >
              <img
                src="/admin.png"
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            </div>

{/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-950 rounded-lg shadow-lg py-2 z-10">
                <a href="#" onClick={() => setActiveSetting("profile")}
                  className="flex items-center px-4 py-2 text-sm hover:bg-gray-900 text-white">
                  <Image src="/profilee.png" alt="profile" width={20} height={20} className="rounded-full" />
                  <span className="ml-2 hidden lg:inline-block">Profile</span>
                </a>

                <a href="#" onClick={handlelogout}className="flex items-center px-4 py-2 text-sm hover:bg-gray-900 text-white">
                  <Image src="/logoutt.png" alt="Logout" width={20} height={20} className="rounded-full" />
                  <span className="ml-2 hidden lg:inline-block">Logout</span>
                </a>
              </div>
            )}
          </div>
        </nav>

{/* Dynamic Content Area */}
        <div className="p-8">
          {activeSetting === "profile" && <Profile />}
          {activeSetting === "revenue" && <Revenue />}
          {activeSetting === "dashboard" && <Dashboard />}
          {activeSetting === "room" && <RoomManagement />}
          {activeSetting === "receptionist" && <ReceptionistManagement />}
          {activeSetting === "food" && <FoodManagement />}
          {activeSetting === "settings" && <Settings />}
          {activeSetting === "report" && <Report />}
        </div>
      </div>
    </div>
  );
}
