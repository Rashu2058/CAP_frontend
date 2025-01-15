"use client";
import React, { useEffect,useState } from "react";
import axios from "axios";

interface Report {
  customer_idno: string;
  receptionist_name: string;
  customer_name: string;
  check_in_date: string;
  check_out_date: string;
  total_amount: number;
}

const Reports = () => {
  const currentDate = new Date();
  
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();
  const [dailyReports, setDailyReports] = useState<Report[]>([]);  
  const [selectedYear, setSelectedYear] = useState(String(currentYear));
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [searchQuery, setSearchQuery] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [showFilters, setShowFilters] = useState(false); 
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 

 
useEffect(() => {
  const fetchReports = async () => {
    setLoading(true); // Set loading to true before starting the fetch
    setError(null);   // Clear any previous errors

    const token = localStorage.getItem('token'); // Retrieve the token from localStorage or another secure location

    try {
      const response = await axios.get('http://localhost:8080/api/reports', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      const formattedReports = response.data.map((report: any) => ({
        id: report.id,
        receptionistName: report.receptionist_name,
        customerName: report.customer_name,
        checkInDate: report.check_in_date,
        checkOutDate: report.check_out_date,
        totalBill: report.total_bill,
      }));
      setDailyReports(formattedReports); // Update the state with fetched data
    } catch (error) {
      // Handle errors and set the error state
        } finally {
      setLoading(false); // Ensure loading is set to false in all cases
    }
  };

  fetchReports();
}, []);

  


{/* Filter daily reports based on user input*/}
  const filteredReports = dailyReports.filter((report) => {
    const matchesQuery =
  (report.customer_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (report.receptionist_name ?? "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (report.customer_idno ?? "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCheckIn = !checkInDate || report.check_in_date === checkInDate;
    const matchesCheckOut = !checkOutDate || report.check_out_date === checkOutDate;


{/* Extract year and month from report's check-in date*/}
function isValidDate(dateString: string) {
  return !isNaN(Date.parse(dateString));
}

const reportYear = isValidDate(report.check_in_date) ? report.check_in_date.split("-")[0] : "Unknown";
const reportMonth = isValidDate(report.check_in_date)
  ? new Date(report.check_in_date).toLocaleString("default", { month: "long" })
  : "Unknown";

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

{/* Filter Toggle Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className=" text-black rounded-md px-4 py-2 hover:bg-gray-200"
        >
        {showFilters ? "Hide" : "Filter"}
        </button>
      </div>


{/* Year Dropdown */}
{showFilters && (
  <div className="mb=6">
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
      </div>
)}
  
{/* Report Section */}
      <div id="print-section" className="overflow-x-auto shadow-md rounded-lg mb-6">


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
                  key={report.customer_idno}
                  className="text-gray-700 text-sm border-b hover:bg-gray-50"
                >
                  <td className="p-3 text-center">{report.customer_idno}</td>
                  <td className="p-3 text-center">{report.receptionist_name}</td>
                  <td className="p-3 text-center">{report.customer_name}</td>
                  <td className="p-3 text-center">{report.check_in_date}</td>
                  <td className="p-3 text-center">{report.check_out_date}</td>
                  <td className="p-3 text-center">NPR. {report.total_amount}</td>
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
