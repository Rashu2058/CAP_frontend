"use client";

import React, { useState } from "react";

const Reports = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const previousMonth = new Date(
    currentDate.setMonth(currentDate.getMonth() - 1)
  ).toLocaleString("default", { month: "long" });

  const [selectedYear, setSelectedYear] = useState("2024");
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const monthlyRevenue: Record<string, number> = {
    "2024-10": 2900,
    "2024-11": 3100,
    "2024-12": 2500, // Constant value for demonstration
  };

  const dailyReports = [
    {
      id: "C001",
      receptionistName: "John Doe",
      customerName: "Jane Smith",
      checkInDate: "2024-11-22",
      checkOutDate: "2024-11-24",
      totalBill: 300,
    },
    {
      id: "C002",
      receptionistName: "Emily Davis",
      customerName: "Mark Johnson",
      checkInDate: "2024-11-21",
      checkOutDate: "2024-11-23",
      totalBill: 450,
    },
  ];

{/* Filter daily reports based on user input*/}
  const filteredReports = dailyReports.filter((report) => {
    const matchesQuery =
      report.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.receptionistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCheckIn = !checkInDate || report.checkInDate === checkInDate;
    const matchesCheckOut = !checkOutDate || report.checkOutDate === checkOutDate;

    return matchesQuery && matchesCheckIn && matchesCheckOut;
  });

{/* Print functionality*/}
  const handlePrint = () => {
    const printContent = document.getElementById("print-section");
    if (!printContent) return;

    const contentClone = printContent.cloneNode(true) as HTMLElement;

    const lastDivider = contentClone
      .querySelectorAll("hr")
      .item(contentClone.querySelectorAll("hr").length - 1);
    if (lastDivider) {
      let nextElement = lastDivider.nextSibling;
      while (nextElement) {
        const elementToRemove = nextElement;
        nextElement = nextElement.nextSibling;
        elementToRemove?.remove();
      }
    }

    const originalContent = document.body.innerHTML;
    document.body.innerHTML = contentClone.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
  };

{/* Monthly revenue calculations*/}
  const currentMonthRevenue =
    monthlyRevenue[`${selectedYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`] || 0;
  const previousMonthRevenue =
    monthlyRevenue[`${selectedYear}-${String(new Date().getMonth()).padStart(2, "0")}`] || 0;
  const revenueDifference = currentMonthRevenue - previousMonthRevenue;

  return (
    <div className="min-h-screen bg-gray-50 p-4">

{/* Header */}
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Yearly Report</h1>
        <button
          onClick={handlePrint}
          className="bg-gray-900 text-white rounded-md px-4 py-2 hover:bg-gray-700"
        >
          Print
        </button>
      </header>

{/* Year Dropdown */}
      <div className="mb-6">
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Select Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded-md p-2 text-sm w-full mt-2"
        >
          {[2024, 2023, 2022].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

{/* Search Bar */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Search by ID or Name
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border rounded-md p-2 text-sm w-full mt-2"
          placeholder="Search..."
        />
      </div>

{/* Date Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700">
            Check-In Date
          </label>
          <input
            id="check-in"
            type="date"
            value={checkInDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="border rounded-md p-2 text-sm w-full mt-2"
          />
        </div>
        <div>
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700">
            Check-Out Date
          </label>
          <input
            id="check-out"
            type="date"
            value={checkOutDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="border rounded-md p-2 text-sm w-full mt-2"
          />
        </div>
      </div>
  
{/* Report Section */}
      <div id="print-section" className="overflow-x-auto shadow-md rounded-lg mb-6">

{/* Monthly Revenue Comparison */}
        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Monthly Revenue Comparison
        </h2>
        <p className="text-sm text-gray-700">
          <strong>{currentMonth} Revenue:</strong> ${currentMonthRevenue}
        </p>
        <p className="text-sm text-gray-700">
          <strong>{previousMonth} Revenue:</strong> ${previousMonthRevenue}
        </p>
        <p className="text-sm font-medium text-gray-700 mt-2">
          <strong>Difference:</strong> ${revenueDifference}
        </p>

{/* Daily Report Table */}
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-200 text-gray-600 text-sm uppercase">
            <tr>
              <th className="p-3 border">Customer ID</th>
              <th className="p-3 border">Receptionist Name</th>
              <th className="p-3 border">Customer Name</th>
              <th className="p-3 border">Check-In Date</th>
              <th className="p-3 border">Check-Out Date</th>
              <th className="p-3 border">Total Bill</th>
            </tr>
          </thead>
          <tbody>

{/* Filtered Daily Reports */}
            {filteredReports.length > 0 ? (
              filteredReports.map((report, index) => (
                <tr
                  key={index}
                  className="text-gray-700 text-sm border-b hover:bg-gray-50"
                >
                  <td className="p-3 text-center">{report.id}</td>
                  <td className="p-3 text-center">{report.receptionistName}</td>
                  <td className="p-3 text-center">{report.customerName}</td>
                  <td className="p-3 text-center">{report.checkInDate}</td>
                  <td className="p-3 text-center">{report.checkOutDate}</td>
                  <td className="p-3 text-center">${report.totalBill}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-3 text-center text-gray-500 italic">
                  No reports available for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
