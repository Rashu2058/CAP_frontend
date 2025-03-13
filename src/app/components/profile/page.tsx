import { useState, useEffect } from "react";
import axios from "axios";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

export default function UserProfile() {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Retrieve token
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await axios.get("http://localhost:8080/api/v1/admin", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });

        console.log("API Response Data:", response.data.data); // Log the data
        setProfileData(response.data.data); // Extract and set the data
        setLoading(false);
      } catch (err: any) {
        console.error("Error:", err);
        setError(err.response?.data?.message || err.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found. Please log in.");
      }

      const updatedData = { ...profileData };
      if (newPassword) {
        updatedData.password = newPassword;
      }

      const response = await axios.put("http://localhost:8080/api/v1/admin/updateAdmin", updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfileData(response.data.data); // Update local state with saved data
      setIsEditing(false); // Exit editing mode
      setError(null); // Clear any previous errors
      setNewPassword(""); // Clear new password field
      setConfirmPassword(""); // Clear confirm password field
      setSuccess("Profile updated successfully");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.response?.data?.message || err.message || "An error occurred");
    }
  };

  if (loading) {
    return <div className="text-center text-white">Loading...</div>;
  }

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
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={profileData?.name || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
                {profileData?.name || "N/A"}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block font-medium text-white">Username</label>
            {isEditing ? (
              <input
                type="text"
                name="username"
                value={profileData?.username || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
                {profileData?.username || "N/A"}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-white">Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={profileData?.email || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
                {profileData?.email || "N/A"}
              </p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label className="block font-medium text-white">Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phoneno"
                value={profileData?.phoneno || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
                {profileData?.phoneno || "N/A"}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-white">Gender</label>
            {isEditing ? (
              <select
                name="gender"
                value={profileData?.gender || ""}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            ) : (
              <p className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-white">
                {profileData?.gender || "N/A"}
              </p>
            )}
          </div>

          {/* New Password */}
          {isEditing && (
            <div>
              <label className="block font-medium text-white">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            </div>
          )}

          {/* Confirm Password */}
          {isEditing && (
            <div>
              <label className="block font-medium text-white">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              />
            </div>
          )}
        </div>

        {/* Edit and Save Buttons */}
        <div className="flex justify-center">
          {isEditing ? (
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Save changes
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Edit
            </button>
          )}
        </div>

        {/* Error and Success Messages */}
        {error && <ErrorPopup message={error} onClose={() => setError(null)} />}
        {success && <SuccessBox message={success} onClose={() => setSuccess(null)} />}
      </div>
    </div>
  );
}