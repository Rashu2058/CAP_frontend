"use client"; // For client-side rendering
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Chart } from 'react-chartjs-2';
import React, { useState } from 'react';

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

export default function Rrevenue() {

  // State for Overview Section with placeholder data
  const [overviewData, setOverviewData] = useState<OverviewDataType>({
    totalRevenue: 5000,
    newReservations: 10,
    checkIn: 5,
    checkOut: 4,
  });

  // State for Room Occupancy Section with placeholder data
  const [occupancyData, setOccupancyData] = useState<OccupancyDataType>({
    totalRooms: 50,
    occupiedRooms: 30,
    availableRooms: 20,
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
              <p className="text-2xl font-bold">{overviewData.totalRevenue}</p> 
            </div>
            <div className="bg-gray-600 p-4 rounded-lg">
              <p>New Reservations</p>
              <p className="text-2xl font-bold">{overviewData.newReservations}</p> 
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
