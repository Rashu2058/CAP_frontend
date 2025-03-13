"use client"; // For client-side rendering
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

type OverviewDataType = {
  totalRevenue: number;
  newReservations: number;
  checkIn: number;
  checkOut: number;
};

type OccupancyDataType = {
  totalRooms: number;
  occupiedRooms: number;
  availableRooms: number;
};

type ChartDataType = {
  labels: string[];
  datasets: Array<{
    type: "bar" | "line";
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    fill?: boolean;
  }>;
};

export default function Revenue() {

  // State for Overview Section with placeholder data
  const [overviewData, setOverviewData] = useState<OverviewDataType>({
    totalRevenue: 5000,
    newReservations: 10,
    checkIn: 5,
    checkOut: 4,
  });

  // State for Room Occupancy Section with placeholder data
  const [occupancyData, setOccupancyData] = useState<OccupancyDataType>({
    totalRooms: 0,
    occupiedRooms: 0,
    availableRooms: 50,
  });
  

  // State for Chart Data with placeholder data
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [3000, 4000, 5000, 6000],
        backgroundColor: 'gray',
      },
      {
        type: 'line',
        label: 'Trend',
        data: [2800, 3500, 4800, 5700],
        borderColor: '#F5D042',
        borderWidth: 2,
        fill: false,
      },
    ],
  });

  const [totalReservations, setTotalReservations] = useState<number | null>(null);

  const [totalRevenue, setTotalRevenue] = useState<number | null>(null); // Initialize as null
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);  // Monthly revenue data

  useEffect(() => {
    const fetchTotalRooms = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Fetching total rooms and total reservations
        const totalRoomsResponse = await fetch("http://localhost:8080/api/rooms/count", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        console.log("Total Rooms API Response:", totalRoomsResponse);
  
        if (totalRoomsResponse.ok) {
          const totalRoomsData = await totalRoomsResponse.json();
          console.log("Total Rooms API Response:", totalRoomsData);
  
          // Fetch total reservations after getting the total rooms
          const totalReservationsResponse = await fetch("http://localhost:8080/api/reservations/total-reservations", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          });
  
          if (totalReservationsResponse.ok) {
            const totalReservationsData = await totalReservationsResponse.json();
  
            // Update state for occupancy data
            setOccupancyData(prev => ({
              ...prev,
              totalRooms: totalRoomsData,
              availableRooms: totalRoomsData - totalReservationsData,
            }));
          } else {
            console.error("Failed to fetch total reservations.");
          }
        } else {
          console.error("Failed to fetch total rooms.");
        }
      } catch (error) {
        console.error("Error fetching total rooms and reservations:", error);
      }
    };
  
    fetchTotalRooms();
  }, []); // Run once when the component mounts
  
  // Fetching data for total reservations, total revenue, and monthly revenue
  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetching total reservations
        const reservationsResponse = await fetch("http://localhost:8080/api/reservations/total-reservations", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (reservationsResponse.ok) {
          const reservationsData = await reservationsResponse.json();
          setTotalReservations(reservationsData);
        } else {
          console.error("Failed to fetch total reservations.");
        }

        // Fetching total revenue (assuming this API exists)
        const totalRevenueResponse = await fetch("http://localhost:8080/api/reports/total-revenue", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add token to Authorization header
          },
        });

        if (totalRevenueResponse.ok) {
          const totalRevenue = await totalRevenueResponse.json();
          console.log(totalRevenue); 
          setTotalRevenue(totalRevenue);  // Assuming the response returns an object with a 'totalRevenue' field
        } else {
          console.error("Failed to fetch total revenue.");
        }

        // Fetching monthly revenue
        const monthlyRevenueResponse = await fetch("http://localhost:8080/api/reports/monthly-revenue", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add token to Authorization header
          },
        });

        if (monthlyRevenueResponse.ok) {
          const monthlyRevenueData = await monthlyRevenueResponse.json();
          // Format the monthly revenue data (assuming the response is an array of objects with month and totalRevenue)
          const months = monthlyRevenueData.map((data: { month: string }) => data.month);
          const revenues = monthlyRevenueData.map((data: { totalRevenue: number }) => data.totalRevenue);

          setMonthlyRevenue(revenues);

          // Update chartData state
          setChartData({
            labels: months,
            datasets: [
              {
                type: 'bar',
                label: 'Monthly Revenue',
                data: revenues,
                backgroundColor: 'gray',
              },
              {
                type: 'line',
                label: 'Revenue Trend',
                data: revenues.map((value: number) => value * 0.9), // Example trend (you can adjust this logic)
                borderColor: '#F5D042',
                borderWidth: 2,
                fill: false,
              },
            ],
          });
        } else {
          console.error("Failed to fetch monthly revenue.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchOverviewData();
  }, []);

  useEffect(() => {
    const fetchCheckInCheckOutData = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Fetching check-ins and check-outs
        const checkInOutResponse = await fetch("http://localhost:8080/api/reservations/check-in-check-out", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (checkInOutResponse.ok) {
          const checkInOutData = await checkInOutResponse.json();
          setOverviewData(prevData => ({
            ...prevData,
            checkIn: checkInOutData.checkIn,
            checkOut: checkInOutData.checkOut,
          }));
        } else {
          console.error("Failed to fetch check-in and check-out data.");
        }
      } catch (error) {
        console.error("Error fetching check-in and check-out data:", error);
      }
    };
  
    // Fetch the check-in and check-out data
    fetchCheckInCheckOutData();
  }, []);  // Only run once when the component mounts
  
  useEffect(() => {
    setOccupancyData((prev) => ({
       ...prev,
       occupiedRooms: totalReservations || 0, // Ensure it's properly fetched
       availableRooms: prev.totalRooms - (totalReservations || 0),
    }));
 }, [totalReservations]);

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      
      {/* Grid Layout for Dashboard Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Overview Section */}
        <div className="lg:col-span-3 bg-gray-800 text-white rounded-lg p-4 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-gray-600 p-4 rounded-lg">
              <p>Total Revenue</p>
              <p className="text-2xl font-bold"> NPR. {totalRevenue === null ? 'Loading...':totalRevenue }</p>
            </div>
            <div className="bg-gray-600 p-4 rounded-lg">
              <p> Reservations</p>
              <p className="text-2xl font-bold">{totalReservations}</p> 
            </div>
            <div className="bg-gray-600 p-4 rounded-lg">
              <p>Check In</p>
              <p className="text-2xl font-bold">{overviewData.checkIn}</p> 
            </div>
            <div className="bg-gray-600 p-4 rounded-lg">
              <p>Check Out</p>
              <p className="text-2xl font-bold">{overviewData.checkOut}</p> 
            </div>
          </div>
        </div>

        {/* Room Occupancy Section */}
        <div className="bg-gray-800 text-white rounded-lg p-6 shadow-md">
          <h2 className="text-lg font-semibold mb-4">Room Occupancy</h2>
          <div className="text-lg font-bold mb-2">{occupancyData.totalRooms}</div> 
          <p className="text-2xl">Total Rooms</p>
          <div className="flex justify-between mt-4">
            <div>
              <p className="font-semibold">Occupied</p>
              <p className="text-lg">{occupancyData.occupiedRooms}</p> 
            </div>
            <div>
              <p className="font-semibold">Available</p>
              <p className="text-lg">{occupancyData.availableRooms}</p> 
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Chart Section */}
      <div className="mt-6 bg-gray-800 text-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Revenue</h2>
        <div className="bg-white rounded-lg p-4">
          {/* Use dynamic chartData */}
          <Chart type="bar" data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}