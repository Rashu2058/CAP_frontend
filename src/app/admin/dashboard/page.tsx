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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown menu
  const router=useRouter();
 
{/*Handle logout*/}
  const handlelogout=()=>{
    localStorage.removeItem("authtoken");
    router.push("/login");
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
<aside className={`bg-gray-950 p-4 lg:p-4 sticky transition-all duration-300 ${
        isSidebarCollapsed ? 'lg:w-20' : 'lg:w-64'
      }`}>
        <div className="flex flex-col space-y-8">

          <div className="flex items-center justify-center">

{/*Logo */}
          <img 
              src={logoUrl} 
              alt="Hotel Logo" 
              className="w-20 h-20 transition-all duration-300"
            />
          </div>

{/*Navigation Items*/}
          <nav className="space-y-4">
            {[
              { id: "revenue", icon: "/dashboard.png", text: "Dashboard" },
              { id: "receptionist", icon: "/receptionist.png", text: "Front Desk Representative" },
              { id: "room", icon: "/rooom.png", text: "Room" },
              { id: "food", icon: "/food.png", text: "Food Menu" },
              { id: "settings", icon: "/settings.png", text: "Settings" },
              { id: "report", icon: "/report.png", text: "Report" },
            ].map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={() => setActiveSetting(item.id)}
                className={`flex items-center px-2 py-3 text-sm font-sans text-white ${
                  activeSetting === item.id ? "bg-gray-800" : "hover:bg-gray-900"
                }`}
              >
                <Image 
                  src={item.icon} 
                  alt={item.id} 
                  width={24} 
                  height={24} 
                  className="min-w-6" 
                />
               <span className={`ml-3 transition-all duration-300 ${
                  isSidebarCollapsed ? 'lg:opacity-0 lg:w-0' : 'opacity-100 w-full'
                }`}>
               {item.text}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </aside>

{/* Main Content Area */}
      <div className="flex-grow h-screen overflow-y-auto">

{/* Top Navigation bar */}
        <nav className="bg-white p-2 flex justify-between items-center shadow">

{/* Hamburger Icon for Desktop */}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="hidden lg:inline-block ml-4 p-2 hover:bg-gray-100 rounded"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>

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
