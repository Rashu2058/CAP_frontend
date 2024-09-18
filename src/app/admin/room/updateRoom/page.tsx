export default function UpdateRoom() {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-purple-100 p-4 sm:p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-center text-xl font-bold mb-6 font-serif bg-purple-300 py-3">Edit Room Info</h2>
  
{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-serif">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-semibold font-serif">Room No:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Room Type:</span> 
              </p>
              <p>
                <span className="font-semibold font-serif">Room Price:</span> 
              </p>
            </div>
          </div>
  
{/* New Options Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-serif">New Options</h3>
            <form>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Room No"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Room type"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Room Price"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-purple-500"
                />
              </div>
            </form>
          </div>
  
          {/* Action Buttons */}
          <div className="flex justify-between space-x-2">
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Close
            </button>
            <button className="w-full bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Save
            </button>
          </div>
        </div>
      </div>
    );
  }
  