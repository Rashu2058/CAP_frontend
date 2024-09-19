import Image from "next/image";

export default function FoodManagement() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation bar */}
      <nav className="bg-gray-200 p-4 flex justify-between items-center shadow-md">
        {/* Logo Section */}
        <div className="flex items-center space-x-0 font-serif font-bold font-xl text-purple-800">
          <Image src="/Logo GraceInn.png" alt="Logo" width={65} height={65} />
          <h1 className="text-2xl font-bold">Grace Inn</h1>
        </div>

        {/* Navigation and Admin Section */}
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

      {/* Food Management Section */}
      <div className="max-w-5xl mx-auto p-20">
        <h2 className="text-3xl font-bold mb-6 font-serif">Food Management</h2>

        {/* Add New Food Section */}
        <div className="bg-purple-400 p-6 rounded-lg mb-6 align-right">
          <h3 className="text-lg text-black font-bold mb-4 font-serif"><u>Add Food</u></h3>
          <form className="grid grid-cols-1 gap-4 mb-4" action="/add-food" method="POST">
            <select
              name="foodCategory"
              className="p-2 border rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </select>
            <input
              type="text"
              name="foodName"
              placeholder="Food Name"
              className="p-2 border rounded-lg"
            />
            <input
              type="text"
              name="foodPrice"
              placeholder="Food Price"
              className="p-2 border rounded-lg"
            />
          </form>
          <div className="flex justify-end sm:justify-end px-6 py-4">
            <button
              type="button"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 text-xl flex items-center space-x-2 font-serif"
            >
              <span>Add</span>
            </button>
          </div>
        </div>

      
{/* Food Details */}
<div className="bg-white p-6 rounded-lg">
  <h3 className="text-lg text-black font-bold mb-8 font-serif bg-purple-300 p-3 px-6">
    Food Details</h3>

  {/* Table Header */}
  <table className="min-w-full bg-white border border-gray-300">
    <thead className="bg-purple-500 text-white">
      <tr>
        <th className="py-3 px-6 text-center border border-gray-300">Food Category</th>
        <th className="py-3 px-6 text-center border border-gray-300 ">Food Name</th>
        <th className="py-3 px-6 text-center border border-gray-300">Food Price</th>
        <th className="py-3 px-6 text-center border border-gray-300">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr className="hover:bg-purple-100">
        <td className="py-3 px-6 border border-gray-300 text-center">Veg</td>
        <td className="py-3 px-6 border border-gray-300 text-center">Food 1</td>
        <td className="py-3 px-6 border border-gray-300 text-center">99</td>
        <td className="py-3 px-6 border border-gray-300 text-center">
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">View</a>
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">Edit</a>
          <a href="#" className="text-purple-800 hover:text-gray-200">Delete</a>
        </td>
      </tr>
      <tr className="hover:bg-purple-100">
        <td className="py-3 px-6 border border-gray-300 text-center">Non-Veg</td>
        <td className="py-3 px-6 border border-gray-300 text-center">Food 2</td>
        <td className="py-3 px-6 border border-gray-300 text-center">120</td>
        <td className="py-3 px-6 border border-gray-300 text-center">
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">View</a>
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">Edit</a>
          <a href="#" className="text-purple-800 hover:text-gray-200">Delete</a>
        </td>
      </tr>
      <tr className="hover:bg-purple-100">
        <td className="py-3 px-6 border border-gray-300 text-center">Veg</td>
        <td className="py-3 px-6 border border-gray-300 text-center">Food 3</td>
        <td className="py-3 px-6 border border-gray-300 text-center">100</td>
        <td className="py-3 px-6 border border-gray-300 text-center">
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">View</a>
          <a href="#" className="text-purple-800 hover:text-gray-200 mr-2">Edit</a>
          <a href="#" className="text-purple-800 hover:text-gray-200">Delete</a>
        </td>
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