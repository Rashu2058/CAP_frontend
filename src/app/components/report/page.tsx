"use client";

import React, { useState } from "react";

const Reports = () => {
  const currentDate = new Date();
  
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const previousMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1)).toLocaleString("default", { month: "long" });
  
  const currentYear = currentDate.getFullYear();
  
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");

  const dailyReports = [
    {
      id: "56789",
      receptionistName: "Rashu Shrestha",
      customerName: "Basanti Silwal",
      checkInDate: "2024-10-15",
      checkOutDate: "2024-10-20",
      totalBill: 9040,
    },
    {
      id: "1234",
      receptionistName: "Pushpa Thapa",
      customerName: "Hari Shrestha",
      checkInDate: "2024-11-22",
      checkOutDate: "2024-11-24",
      totalBill: 5000,
    },
    {
      id: "0157422",
      receptionistName: "Pushpa Thapa",
      customerName: "Maya Thapa",
      checkInDate: "2024-11-21",
      checkOutDate: "2024-11-23",
      totalBill: 5500,
    },
    {
      id: "0157422",
      receptionistName: "Namita Sharma",
      customerName: "Sachina Thapa",
      checkInDate: "2024-12-01",
      checkOutDate: "2024-12-08",
      totalBill: 8000,
    },
  ];

{/* Calculate Monthly Revenue Dynamically */}
  const calculateMonthlyRevenue = (reports: typeof dailyReports) => {
  return reports.reduce((acc, report) => {
    const monthKey = report.checkInDate.slice(0, 7); // Extract 'YYYY-MM' format
    acc[monthKey] = (acc[monthKey] || 0) + report.totalBill;
    return acc;
  }, {} as Record<string, number>);
};
  const monthlyRevenue = calculateMonthlyRevenue(dailyReports);

{/* Determine current and previous month keys*/}
  const currentMonthKey = `${selectedYear}-${String(new Date().getMonth() + 1).padStart(2, "0")}`;
  const previousMonthKey = `${selectedYear}-${String(new Date().getMonth()).padStart(2, "0")}`;

{/* Calculate Monthly Revenue Comparisons*/}
  const currentMonthRevenue = monthlyRevenue[currentMonthKey] || 0;
  const previousMonthRevenue = monthlyRevenue[previousMonthKey] || 0;
  const revenueDifference = currentMonthRevenue - previousMonthRevenue;

{/* Filter daily reports based on user input*/}
  const filteredReports = dailyReports.filter((report) => {
    const matchesQuery =
      report.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.receptionistName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCheckIn = !checkInDate || report.checkInDate === checkInDate;
    const matchesCheckOut = !checkOutDate || report.checkOutDate === checkOutDate;

{/* Extract year and month from report's check-in date*/}
  const reportYear = report.checkInDate.split("-")[0]; 
  const reportMonth = new Date(report.checkInDate).toLocaleString("default", { month: "long" });

  const matchesYear = selectedYear === reportYear;
  const matchesMonth = selectedMonth === "" || selectedMonth === reportMonth;

  return matchesQuery && matchesCheckIn && matchesCheckOut && matchesYear && matchesMonth;
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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label htmlFor="year" className="block text-sm font-medium text-gray-700">
          Year
        </label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border rounded-md p-2 text-sm w-full mt-2"
        >
          {[2025, 2024, 2023, 2022, 2021].map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

{/* Month Dropdown */}
      <div>
        <label htmlFor="month" className="block text-sm font-medium text-gray-700">
          Month
        </label>
        <select
          id="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-md p-2 text-sm w-full mt-2"
        >
          <option value="">No month selected</option>
          {["January", "February", "March","April","May","June",
            "July","August","September","October","November","December",
           ]
          .map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      </div>

{/* Search Bar */}
      <div className="mb-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          ID or Name
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
          <strong>{currentMonth} Revenue:</strong> NPR. {currentMonthRevenue}
        </p>
        <p className="text-sm text-gray-700">
          <strong>{previousMonth} Revenue:</strong> NPR. {previousMonthRevenue}
        </p>
        <p className="text-sm font-medium text-gray-700 mt-2">
          <strong>Difference:</strong> NPR. {revenueDifference}
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
                  <td className="p-3 text-center">NPR. {report.totalBill}</td>
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
