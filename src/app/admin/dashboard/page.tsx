"use client"; // Needed for client-side interactions

import { useState } from 'react';
import Image from "next/image";
import RoomManagement from '../../components/room/page';
import ReceptionistManagement from '../../components/receptionist/page';
import FoodManagement from '../../components/foodMenu/page';
import Settings from '../../components/setting/page';
import Profile from '../../components/profile/page';

export default function Dashboard() {

{/* Manage which setting to display */}
  const [activeSetting, setActiveSetting] = useState("profile");
  const [isOpen, setIsOpen] = useState(false);

  const Dashboard = () => <h1>Dashboard</h1>;
  const Report = () => <h1>Report</h1>;

  return (
    <div className="min-h-screen flex bg-gray-200">

{/* Sidebar section */}
      <aside className="bg-gray-950 p-4 lg:p-8 max-h-full w-1/6">
        <div className="flex flex-col space-y-16">
          <div className="flex items-center">
            <Image src="/logo.png" alt="Logo" width={150} height={150} />
          </div>
          <nav className="space-y-4">
            <a href="#" onClick={() => setActiveSetting("dashboard")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/dashboard.png" alt="dashboard" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Dashboard</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("room")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/rooom.png" alt="room" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Room</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("receptionist")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/receptionist.png" alt="receptionist" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Receptionist</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("food")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/food.png" alt="food" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Food Menu</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("settings")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/settings.png" alt="settings" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Settings</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("report")}
              className="flex items-center px-4 py-2 text-xs hover:bg-gray-900 text-white font-sans">
              <Image src="/report.png" alt="report" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Report</span>
            </a>

          </nav>
        </div>
      </aside>

{/* Main Content Area */}
      <div className="flex-grow">

{/* Navigation bar*/}
        <nav className="bg-white p-2 flex justify-between items-center">

{/* Search bar with custom icon inside */}
          <div className="relative w-1/3">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
            />
            
{/*Search Icon */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img
                src="/search.png" 
                alt="Search"
                className="h-5 w-5 text-gray-400"
              />
            </div>
          </div>

{/* Profile Picture and Dropdown */}
          <div className="relative">
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

                <a href="#" className="flex items-center px-4 py-2 text-sm hover:bg-gray-900 text-white">
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
