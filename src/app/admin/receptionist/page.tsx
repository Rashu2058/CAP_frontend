import Image from "next/image";

export default function ReceptionistManagement() {
  return (
    <div className="min-h-screen bg-gray-200">

{/* Navigation bar */}
      <nav className="bg-gray-300 p-2 flex justify-between items-center">

{/* Logo Section */}
        <div className="flex items-center space-x-0 font-serif font-bold text-purple-800 text-xl">
          <Image src="/Logo GraceInn.png" alt="Logo" width={65} height={65} />
          <h1>Grace Inn</h1>
        </div>

{/* Navigation and User Section */}
        <div className="flex items-center space-x-8">

{/* Navigation bar for desktop screen */}
<div className="hidden lg:flex space-x-4 justify-items-end font-serif">
            <a href="#" className="text-purple-800 hover:text-gray-200">Dashboard</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Rooms</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Receptionists</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Food Menu</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Reports</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Settings</a>
          </div>

{/* User Section */}
          <div className="flex justify-end sm:justify-end px-3 py-2">
            <button
              type="button"
              className="bg-gray-300 text-purple-800 font-serif px-3 py-2 rounded-lg flex items-center space-x-3"
            >
              <Image src="/admin.png" alt="Admin" width={25} height={25} className="rounded-full" />
              <span>Admin</span>
            </button>
          </div>

{/* Navigation bar for small screen menu */}
          <div className="lg:hidden">
            <input id="menu-toggle" type="checkbox" className="hidden" />
            <label htmlFor="menu-toggle" className="cursor-pointer block lg:hidden">
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </label>

{/* Small screen menu */}
            <div className="hidden lg:flex" id="mobile-menu">
              <ul className="flex flex-col space-y-4 bg-gray-300 p-4">
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Dashboard</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Rooms</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Receptionists</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Food Menu</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Reports</a></li>
                <li><a href="#" className="block text-purple-800 hover:text-gray-200">Settings</a></li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

{/* Receptionist Management Section */}
      <div className="max-w-5xl mx-auto p-20">
        <h2 className="text-2xl font-bold mb-6 font-serif">Receptionist Management</h2>

{/* Add New Receptionists Section */}
        <div className="bg-purple-400 p-6 rounded-lg mb-6 align-right">
          <h3 className="text-lg text-black font-bold mb-4 font-serif"><u>Add New Receptionist</u></h3>
          <form className="grid grid-cols-2 gap-4 mb-4" action="/add-receptionist" method="POST">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="phoneNo"
              placeholder="Phone No"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="password"
              placeholder="Password"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
          </form>
          <div className="flex justify-end sm:justify-end px-6 py-4">
            <button
              type="button"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 text-xl flex items-center space-x-2 font-serif"
            >
              <Image src="/add.png" alt="Delete" width={26} height={26} className="rounded-full" />
            <span>Add</span> 
            </button>
          </div>
        </div>

{/* Delete Section */}
        <div className="flex justify-end sm:justify-end px-6 py-4">
          <button
            type="button"
            className="bg-red-600 text-white font-serif px-8 py-4 rounded-lg hover:bg-red-700 text-xl flex items-center space-x-2"
          >
            <Image src="/delete.png" alt="Delete" width={26} height={26} className="rounded-full" />
            <span>Delete</span>
          </button>
        </div>

{/* Receptionist Details */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg text-black font-bold mb-8 font-serif bg-purple-300 p-3 px-6">
            Receptionist Details</h3>

{/* Table Header */}
          <table className="min-w-full bg-white border border-gray-300">
            <thead className="bg-purple-500 text-white">
              <tr>
                <th className="py-3 px-6 text-center border border-gray-300">Name</th>
                <th className="py-3 px-6 text-center border border-gray-300 ">Phone No</th>
                <th className="py-3 px-6 text-center border border-gray-300">Address</th>
                <th className="py-3 px-6 text-center border border-gray-300">Email</th>
                <th className="py-3 px-6 text-center border border-gray-300">Username</th>
                <th className="py-3 px-6 text-center border border-gray-300">Password</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-purple-100">
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
              </tr>
              <tr className="hover:bg-purple-100">
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
              </tr>
              <tr className="hover:bg-purple-100">
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
                <td className="py-3 px-6 border border-gray-300 text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

{/* Footer */}
      <footer className="bg-purple-500 text-white text-center py-4 font-serif text-2xl">
        Hotel Grace Inn 2024
      </footer>

{/* Logout Section */}
      <div className="flex justify-end sm:justify-end px-6 py-4">
        <button
          type="button"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
