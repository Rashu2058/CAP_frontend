import Image from "next/image";

export default function RoomManagement() {
  return (
    <div className="min-h-screen bg-gray-200">

      {/* Navbar */}
      <nav className="bg-gray-300 p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Image src="/Logo GraceInn.png" alt="Logo" width={60} height={60} />
        </div>

        <div className="flex space-x-12 font-serif">
          <a href="#" className="text-gray-800 hover:text-gray-200">Dashboard</a>
          <a href="#" className="text-gray-800 hover:text-gray-200">Room Management</a>
          <a href="#" className="text-gray-800 hover:text-gray-200">Receptionist Management</a>
          <a href="#" className="text-gray-800 hover:text-gray-200">Reports</a>
          <a href="#" className="text-gray-800 hover:text-gray-200">Settings</a>
        </div>

        <div className="flex items-center space-x-6 font-serif">
          <Image src="/user.png" alt="User" width={50} height={50} className="rounded-full" />
          <a href="#" className="text-gray-800 hover:text-gray-200 text-left space-x-10">User</a>
        </div>
      </nav>

      {/* Room Management Section */}
      <div className="max-w-5xl mx-auto p-20">
        <h2 className="text-2xl font-bold mb-6 font-serif">Room Management</h2>

        {/* Add New Rooms */}
        <div className="bg-purple-400 p-6 rounded-lg mb-6 align-right">
          <h3 className="text-lg text-black font-bold mb-4 font-serif"><u>Add New Rooms</u></h3>
          <form className="grid grid-rows-3 gap-4 mb-4" action="/add-room" method="POST">
            <input
              type="text"
              name="roomNo"
              placeholder="Room no"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="roomType"
              placeholder="Room type"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="roomPrice"
              placeholder="Room price"
              className="p-2 border rounded-lg"
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 row-span-3"
            >
              Add
            </button>
          </form>
        </div>

        {/* Room Details */}
        <div className="bg-purple-100 p-6 rounded-lg">
          <h3 className="text-lg text-purple-700 font-bold mb-4">Room Details</h3>
          <table className="min-w-full bg-white">
            <thead className="bg-purple-400 text-white">
              <tr>
                <th className="py-2 px-4">Room no</th>
                <th className="py-2 px-4">Room type</th>
                <th className="py-2 px-4">Room price</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-purple-500 text-white text-center py-4 font-serif text-2xl">
        Hotel Grace Inn 2024
      </footer>
      <div className="flex-items-left px-6 py-4">
       <button 
              type="button"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 row-span-3  "
            >
              Logout
        </button>
       </div> 
    </div>
  );
}
