export default function UserProfile() {
  const profileData = {
    fullName: "Admin",
    username: "admin123",
    email: "admin123@gmail.com",
    phoneNumber: "9800000000",
    gender: "Male",
  };

  return (
    <div className="min-h-screen bg-gray-300 rounded-lg shadow-md flex justify-center items-center">
      <div className="bg-gray-900 rounded-lg shadow-md p-8 w-full max-w-4xl">
        <h1 className="text-2xl font-semibold mb-6 text-center text-white">User Profile</h1>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              className="w-24 h-24 rounded-full object-cover"
              src="/admin.png"
              alt="Profile"
            />
          </div>
        </div>

        {/* Profile Information Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {/* Full Name */}
          <div>
            <label className="block font-medium text-white">Full Name</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {profileData.fullName}
            </p>
          </div>

           {/* Username */}
           <div>
            <label className="block font-medium text-white">Username</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {profileData.username}
            </p>
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-white">Email</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {profileData.email}
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium text-white">Phone Number</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {profileData.phoneNumber}
            </p>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-white">Gender</label>
            <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
              {profileData.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
