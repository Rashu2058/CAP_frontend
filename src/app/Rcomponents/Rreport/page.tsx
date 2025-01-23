"use client";

import React, { useState, useEffect } from "react";

type Report = {
  guestId: number;
  roomNo:number;
  roomType:string;
  guestName: string;
  receptionistName: string;
  checkInDate: string;
  checkOutDate: string;
  totalBill: number;
};

const Reports = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  const fetchReports = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/reports");

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched data:", data); // Log the data here
      setReports(data);  // Set reports state
      setIsLoading(false); // Mark loading as complete
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setIsLoading(false);
    }
  };

  // Filter reports based on user input
  const filteredReports = reports.filter((report) => {
    const matchesQuery =
      (report.guestName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      (report.receptionistName?.toLowerCase().includes(searchQuery.toLowerCase()) || false) ||
      String(report.guestId || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCheckIn = !checkInDate || report.checkInDate === checkInDate;
    const matchesCheckOut = !checkOutDate || report.checkOutDate === checkOutDate;

    const reportYear = report.checkInDate
      ? report.checkInDate.split("-")[0]
      : null;
    const reportMonth = report.checkInDate
      ? new Date(report.checkInDate).toLocaleString("default", { month: "long" })
      : null;

    const matchesYear = reportYear && selectedYear === reportYear;
    const matchesMonth = reportMonth && (selectedMonth === "" || selectedMonth === reportMonth);

    return matchesQuery && matchesCheckIn && matchesCheckOut && matchesYear && matchesMonth;
  });

  // Handle the printing functionality
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

  // Fetch data when the component mounts
  useEffect(() => {
    fetchReports();
  }, []);

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

      {/* Loading and Error Messages */}
      {isLoading ? (
        <p className="text-center text-gray-600">Loading reports...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          {/* Filter Toggle Button */}
          <div className="mb-6">
            <button
              onClick={() => setShowFilters((prev) => !prev)}
              className="text-black rounded-md px-4 py-2 hover:bg-gray-200"
            >
              <span className="flex items-center gap-2">
                <img src="/filter.png" alt="Filter Icon" className="w-5 h-5" />
                {showFilters ? "Hide" : "Filter"}
              </span>
            </button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search Query */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Search</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or ID"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Check-In Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-In Date</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Check-Out Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Check-Out Date</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>

                {/* Year Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value={String(currentYear)}>{currentYear}</option>
                    <option value={String(currentYear - 1)}>{currentYear - 1}</option>
                    <option value={String(currentYear - 2)}>{currentYear - 2}</option>
                  </select>
                </div>

                {/* Month Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">Month</label>
                  <select
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="">All Months</option>
                    {Array.from({ length: 12 }, (_, i) =>
                      new Date(0, i).toLocaleString("default", { month: "long" })
                    ).map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Report Section */}
          <div id="report-container" className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-800 text-white text-sm uppercase">
                <tr>
                
                  <th className="p-3 border">guest ID</th>
                  <th className="p-3 border">guest Name</th>
                  <th className="p-3 border">Room no</th>
                  <th className="p-3 border">Room Type</th>
                  <th className="p-3 border">Receptionist Name</th>
                  <th className="p-3 border">Check-In Date</th>
                  <th className="p-3 border">Check-Out Date</th>
                  <th className="p-3 border">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.length > 0 ? (
                  filteredReports.map((report, index) => (
                    <tr
                      key={index}
                      className="text-gray-700 text-sm border-b hover:bg-gray-50"
                    >
                      
                      <td className="p-3 text-center">{report.guestId}</td>
                      <td className="p-3 text-center">{report.guestName}</td>
                      <td className="p-3 text-center">{report.roomNo}</td>
                      <td className="p-3 text-center">{report.roomType}</td>
                      <td className="p-3 text-center">{report.receptionistName}</td>
                      <td className="p-3 text-center">{report.checkInDate}</td>
                      <td className="p-3 text-center">{report.checkOutDate}</td>
                      <td className="p-3 text-center">{report.totalBill}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="p-3 text-center">No reports found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Reports;
