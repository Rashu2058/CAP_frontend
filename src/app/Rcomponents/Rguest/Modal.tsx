import React from "react";
import type { Guest } from "../Rreservation/AddGuest";

interface ModalProps {
  isModalOpen: boolean;
  selectedGuest: Guest | null;
  formData: Guest;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleUpdate: (event: React.FormEvent) => void;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isModalOpen,
  selectedGuest,
  formData,
  handleInputChange,
  handleUpdate,
  closeModal,
}) => {
  if (!isModalOpen){
    console.log("Modal is not open");
    return null;    
  };
  console.log("Modal is open");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold font-sans mb-4">Update Customer Details</h2>

        {/* Current Details Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
          <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2 gap-2">
            <p><span className="font-semibold">ID Type:</span> {selectedGuest?.id_type}</p>
            <p><span className="font-semibold">ID No:</span> {selectedGuest?.id_no}</p>
            <p><span className="font-semibold">Name:</span> {selectedGuest?.name}</p>
            <p><span className="font-semibold">Phone No:</span> {selectedGuest?.phone_number}</p>
            <p><span className="font-semibold">Address:</span> {selectedGuest?.address}</p>
            <p><span className="font-semibold">Gender:</span> {selectedGuest?.gender_type}</p>
            <p><span className="font-semibold">Email:</span> {selectedGuest?.email}</p>
            <p><span className="font-semibold">Nationality:</span> {selectedGuest?.nationality}</p>
            <p><span className="font-semibold">Institution name:</span> {selectedGuest?.institutionName}</p>
            <p><span className="font-semibold">Purpose:</span> {selectedGuest?.purpose}</p>
          </div>
        </div>

        {/* New Update Section */}
        <form onSubmit={handleUpdate} className="space-y-4">
          <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
          <div className="grid grid-cols-2 gap-4">
            <select
              name="id_type"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.id_type}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select ID Type</option>
              <option value="CITIZENSHIP">Citizenship</option>
              <option value="PASSPORT">Passport</option>
              <option value="DRIVING_LICENSE">Driving License</option>
              <option value="NID_CARD">National ID Card</option>
            </select>
            <input
              type="text"
              name="id_no"
              placeholder="Enter ID No."
              maxLength={30}
              value={formData.id_no || ""}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              placeholder="Enter Name"
              maxLength={30}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="tel"
              name="phone_number"
              value={formData.phone_number || ""}
              placeholder="Enter Phone No."
              maxLength={14}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="address"
              value={formData.address || ""}
              placeholder="Enter Address"
              maxLength={20}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <select
              name="gender_type"
              className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              value={formData.gender_type || ""}
              onChange={handleInputChange}
            >
              <option value="" disabled>Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHERS">Others</option>
            </select>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              placeholder="Enter Email"
              maxLength={20}
              onChange={handleInputChange}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="nationality"
              value={formData.nationality || ""}
              onChange={handleInputChange}
              placeholder="Enter Nationality"
              maxLength={15}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="institutionName"
              value={formData.institutionName || ""}
              onChange={handleInputChange}
              placeholder="Enter Institution Name"
              maxLength={30}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="purpose"
              value={formData.purpose || ""}
              onChange={handleInputChange}
              placeholder="Enter Purpose"
              maxLength={30}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;