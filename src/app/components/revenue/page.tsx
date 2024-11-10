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

export default function Revenue() {

  {/*State for Overview Section*/}
  const [overviewData, setOverviewData] = useState<OverviewDataType>({
    totalRevenue: 5000,
    newReservations: 20,
    checkIn: 15,
    checkOut: 10,
  });

  {/* State for Room Occupancy Section*/}
  const [occupancyData, setOccupancyData] = useState<OccupancyDataType>({
    totalRooms: 100,
    occupiedRooms: 70,
    availableRooms: 30,
  });

  {/* State for Chart Data*/}
  const [chartData, setChartData] = useState<ChartDataType>({
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        type: 'bar',
        label: 'Revenue',
        data: [5000, 10000, 7500, 8000, 9000, 9500],
        backgroundColor: 'grey',
      },
      {
        type: 'line',
        label: 'Trend',
        data: [6000, 8000, 9000, 8500, 7000, 10000],
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
          
{/* Use static chartData */}
          <Chart type="bar" data={chartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
}
