"use client"; 

import { useState, useEffect, useRef } from 'react';
import { useLogo } from '@/app/LogoContext';
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
  const { logoUrl } = useLogo();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown menu
  const router=useRouter();
 
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
      <aside className="bg-gray-950 p-4 lg:p-8 sticky min-w-[220px]">
        <div className="flex flex-col space-y-16">
          <div className="flex items-center">
          <img src={logoUrl} alt="Hotel Logo" width={100} height={100} />
           </div>
          <nav className="space-y-4">
            <a href="#" onClick={() => setActiveSetting("revenue")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "revenue" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/dashboard.png" alt="dashboard" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Dashboard</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("receptionist")}
               className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "receptionist" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/receptionist.png" alt="receptionist" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Receptionist</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("room")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "room" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/rooom.png" alt="room" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Room</span>
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
        <nav className="bg-white p-2 flex justify-end items-center shadow">

{/* Profile and Dropdown */}
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

{/* Dropdown Menu for Profile and Logout */}
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
        <div className="p-8 overflow-auto">
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
