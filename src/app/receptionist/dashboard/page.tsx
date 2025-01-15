"use client"; 

import { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Reservation from '@/app/Rcomponents/Rreservation/page';
import RSettings from '@/app/Rcomponents/Rsetting/page';
import Checkout from '@/app/Rcomponents/Rcheckout/page';
import Customer from '@/app/Rcomponents/Rcustomer/page';
import FoodOrders from '@/app/Rcomponents/FoodOrders/page';
import RProfile from '@/app/Rcomponents/Rprofile/page';
import Rrevenue from '@/app/Rcomponents/Rrevenue/page';
import Reports from '@/app/Rcomponents/Rreport/page';
import { useRouter } from 'next/navigation';


export default function Dashboard() {
  const [activeSetting, setActiveSetting] = useState("revenue");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null); // Reference for dropdown menu
  const router = useRouter();

  const Report = () => <h1>Report</h1>;

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

            <a href="#" onClick={() => setActiveSetting("reservation")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "reservation" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/rooom.png" alt="room" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Reservation</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("customer")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "customer" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/profilee.png" alt="customer" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Customer</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("foodOrders")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "foodOrders" ? "bg-gray-800 text-white" : "hover:bg-gray-900"
              }`}>
              <Image src="/food.png" alt="food" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Food Orders</span>
            </a>

            <a href="#" onClick={() => setActiveSetting("checkout")}
              className={`flex items-center px-4 py-2 text-xs font-sans text-white ${
                activeSetting === "checkout" ? "bg-gray-800 white" : "hover:bg-gray-900"
              }`}>
              <Image src="/receptionist.png" alt="checkout" width={20} height={20} className="rounded-full" />
              <span className="ml-2 hidden lg:inline-block">Checkout</span>
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

{/* Dropdown Menu for Profile and Logout */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-950 rounded-lg shadow-lg py-2 z-10">
                <a href="#" onClick={() => setActiveSetting("rProfile")}
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
        <div className="p-8 overflow-auto ">
          {activeSetting === "checkout" && <Checkout />}
          {activeSetting === "revenue" && <Rrevenue />}
          {activeSetting === "dashboard" && <Dashboard />}
          {activeSetting === "reservation" && <Reservation />}
          {activeSetting === "customer" && <Customer />}
          {activeSetting === "foodOrders" && <FoodOrders />}
          {activeSetting === "settings" && <RSettings />}
          {activeSetting === "report" && <Reports />}
          {activeSetting === "rProfile" && <RProfile />}
        </div>
      </div>
    </div>
  );
}
