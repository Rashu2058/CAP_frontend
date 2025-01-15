"use client";
import React, { useState,useEffect } from "react";
import { fetchCustomers,deleteCustomer,updateCustomer } from "../Rreservation/AddCustomer";
import type { Customer } from "../Rreservation/AddCustomer";

export default function Customer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [formData, setFormData] = useState<Customer>({
    c_id: 0,
    id_type: "",
    id_no: null,
    name: "",
    phone_number: null,
    address: "",
    gender_type: "",
    email: "",
    nationality: "",
    check_in_date:"",
    check_out_date:"",
    room_no:"",
    room_type:"",
    receptionist_name:"",
  });


  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const customerData = await fetchCustomers();
        setCustomers(customerData);
      } catch (error) {
        console.error("Error loading customers:", error);
      }
    };
    loadCustomers();
  }, []);


  const handleDelete = async (id_no: number) => {
    try {
      await deleteCustomer(id_no);
      // Fetch the updated customer list after deletion
      const updatedCustomers = await fetchCustomers();
      setCustomers(updatedCustomers); // Update state with the new customer list
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Open and close modal
  const openModal = (customer:Customer) => {
    setSelectedCustomer(customer);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);


  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedCustomer) return;
  
    const updatedCustomer = { ...selectedCustomer };
    const formElements = event.target as HTMLFormElement;
  
    updatedCustomer.id_type = formElements["id_type"].value;
    updatedCustomer.phone_number = formElements["phone_number"].value;
    updatedCustomer.address = formElements["address"].value;
    updatedCustomer.gender_type = formElements["gender_type"].value;
    updatedCustomer.email = formElements["email"].value;
    updatedCustomer.nationality = formElements["nationality"].value;
  
    if (!updatedCustomer.phone_number || !updatedCustomer.email) {
      alert("Please fill in all required fields!");
      return;
    }
  
    const { id_no } = selectedCustomer;  // Ensure this is correct
    console.log("Updating customer with id_no:", id_no);
    console.log("Updated customer:", updatedCustomer);
  
    try {
      await updateCustomer(id_no, updatedCustomer);  // Pass id_no and updated data
      const updatedCustomers = await fetchCustomers();
      setCustomers(updatedCustomers);
      closeModal();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };
    
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (selectedCustomer) {
      const { name, value } = event.target;
    setSelectedCustomer((prevCustomer) => ({
      ...prevCustomer!,
      [name]: value,
    }));
  }
};
   
  // Modal Component
  const Modal = () => (
    isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold font-sans mb-4">Update Customer Details</h2>

{/* Current Details Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 font-sans">Current Details</h3>
            <div className="text-sm text-gray-600 space-y-1 grid grid-cols-2 gap-2">
              <p>
                <span className="font-semibold">ID Type:</span>{selectedCustomer?.id_type}</p> 
              <p>
                <span className="font-semibold">ID No:</span>{selectedCustomer?.id_no}</p> 
              <p>
                <span className="font-semibold">Name:</span> {selectedCustomer?.name}</p>
              <p>
                <span className="font-semibold">Phone No:</span>{selectedCustomer?.phone_number}</p> 
              <p>
                <span className="font-semibold">Address:</span>{selectedCustomer?.address}</p> 
              <p>
                <span className="font-semibold">Gender:</span>{selectedCustomer?.gender_type}</p> 
              <p>
                <span className="font-semibold">Email:</span>{selectedCustomer?.email}</p> 
              <p>
                <span className="font-semibold">Nationality:</span>{selectedCustomer?.nationality}</p>
            </div>
          </div>

{/* New Update Section */} 
          <form onSubmit={handleUpdate}className="space-y-4">
            <h3 className="text-lg font-semibold mb-3 font-sans">Update Here</h3>
            <div className="grid grid-cols-2 gap-4">
              <select
                name="id_type"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
                value={selectedCustomer?.id_type}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select ID Type
                </option>
                <option value="CITIZENSHIP">Citizenship</option>
                <option value="PASSPORT">Passport</option>
                <option value="DRIVING_LICENSE">Driving Liscense</option>
                <option value="NID_CARD">National ID Card</option>
              </select>
              <input
                type="text"
                name="id_no"
                placeholder="Enter ID No."
                value={selectedCustomer?.id_no||""}
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="name"
                value={selectedCustomer?.name||""}
                placeholder="Enter Name"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="phone_number"
                value={selectedCustomer?.phone_number||""}
                placeholder="Enter Phone No."
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="address"
                value={selectedCustomer?.address||""}
                placeholder="Enter Address"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <select
                name="gender_type"
                className="p-2 border rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
               value={selectedCustomer?.gender_type||""}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHERS">Others</option>
              </select>
              <input
                type="email"
                name="email"
                value={selectedCustomer?.email||""}
                placeholder="Enter Email"
                onChange={handleInputChange}
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="text"
                name="nationality"
                value={selectedCustomer?.nationality||""}
                onChange={handleInputChange}
                placeholder="Enter Nationality"
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
    )
  );

{/* Customer Details Component*/}
  const CustomerDetails = () => (
    <div className="bg-white p-6 rounded-lg">
      <h1 className="text-xl font-bold">Customer Details</h1>
      {/* Search bar with custom icon inside */}
      <div className="flex justify-center mb-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
          />
          
          {/* Search Icon */}
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <img
              src="/search.png"
              alt="Search"
              className="h-5 w-5 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/*Table*/}
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-6 text-center border border-gray-300">ID Type</th>
            <th className="py-3 px-6 text-center border border-gray-300">ID No.</th>
            <th className="py-3 px-6 text-center border border-gray-300">Name</th>
            <th className="py-3 px-6 text-center border border-gray-300">Phone No</th>
            <th className="py-3 px-6 text-center border border-gray-300">Address</th>
            <th className="py-3 px-6 text-center border border-gray-300">Gender</th>
            <th className="py-3 px-6 text-center border border-gray-300">Email</th>
            <th className="py-3 px-6 text-center border border-gray-300">Nationality</th>
            <th className="py-3 px-6 text-center border border-gray-300">Check In Date</th>
            <th className="py-3 px-6 text-center border border-gray-300">Check Out Date</th>
            <th className="py-3 px-6 text-center border border-gray-300">Entered By</th>
            <th className="py-3 px-6 text-center border border-gray-300">Action</th>
          </tr>
        </thead>
         <tbody>
          {customers.map((customer) => (
            <tr key={customer.c_id} className="hover:bg-purple-100">
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.id_type}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.id_no}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.name}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.phone_number}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.address}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.gender_type}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.email}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.nationality}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.check_in_date}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.check_out_date}</td>
              <td className="py-3 px-6 border border-gray-300 text-center">{customer.receptionist_name}</td>              
              <td className="py-3 px-6 border border-gray-300 text-center">
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-700 mr-2"
                  onClick={()=>openModal(customer)}
                >
                  Edit
                </a>
                <a href="#" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(customer.id_no??0)}>
                  Delete
                </a>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      {/* Render Customer Details */}
      <CustomerDetails />

      {/* Modal */}
      <Modal />
    </div>
  );
}
