"use client"; // For client-side rendering
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

interface Room{
  room_no:string;
  room_type:string;
  room_price:string;
  new_room_no?: string; // Optional property for new room number
  new_room_type?: string; // Optional property for new room type
  new_room_price?: string; // Optional property for new room price
}

export default function RoomManagement() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomDetails, setRoomDetails] = useState<Room>({
    room_no: "", 
    room_type: "",
    room_price: "",
    new_room_no: "", // Initialize for new room number
    new_room_type: "", // Initialize for new room type
    new_room_price: "", // Initialize for new room price
  });
  const[errorMessage,setErrorMessage]=useState<string>("");
  const [rooms, setRooms] = useState<Room[]>([]); // Store room details
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>("");

  const openModal = (room:Room) => {
    setRoomDetails(room);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
    if (name === "room_no"|| name=="room_price") {
      const isValidRoomNo = /^\d+$/.test(value); // Only allows positive integers
      if (!isValidRoomNo && value !== "") {
        setErrorMessage("Please enter valid data");
        return;
      }
    }
  
    
    setErrorMessage(""); // Clear error message
    setRoomDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const checkRoomExists=async(room_no:string)=>{
    try{
      const response=await axios.get(`http://localhost:8080/api/rooms/${room_no}`);
      return response.status==200;
    }catch(error){
      return false;
    }
  };

  {/*validate form*/}
  const validateForm = () => {
  const newErrors: { [key: string]: string } = {};

    if (!roomDetails.room_type) newErrors.room_type = "Room Type is required.";
    if (!roomDetails.room_no) newErrors.room_no = "Room no is required.";
    if (!roomDetails.room_price) newErrors.room_price = "Room price is required";
   
  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleAddRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    if(!validateForm()) return;
    if(await checkRoomExists(roomDetails.room_no)){

      setErrorMessage("Room already exist. Please enter a different one.");
      return;
    }
    try {
      const token =localStorage.getItem('token');
      console.log("Token from localstorage:",token);

      if(!token){
        console.error("Token is missing");
        console.log("You must be logged in as a admin to add rooms ");
        return;
      }
      const response = await axios.post("http://localhost:8080/api/rooms", roomDetails, {
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
        withCredentials:true
      });
      fetchRooms();
      setRoomDetails({room_no:"",room_type:"",room_price:""})
      console.log("Room added successfully:", response.data);
      setSuccessMessage("Room Added Successfully")
      setRoomDetails({ room_no: "", room_type: "", room_price: "" });
    } catch (error) {
      console.error("Error adding room:", error);
      setErrorMessage("Error adding Room")
    }
  };

  const fetchRooms=async()=>{
    try{
      const token =localStorage.getItem('token');
      if(!token){
        setErrorMessage("You must be logged in to fetch rooms");
      }
      const response =await axios.get("http://localhost:8080/api/rooms",{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      });
      console.log("Fetched rooms:",response.data);
      setRooms(response.data);
    }catch(error){
        console.error("Error Fetcching room data:",error);
        if(axios.isAxiosError(error)){
        setErrorMessage("An error occured while fetching room data."); 
      }else{
        setErrorMessage("An unknown error occured.");
      }
  }
  };
  useEffect(()=>{
    fetchRooms();
  },[]);

  const handleUpdateRoom = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const updatedRoomDetails: Room = {
        room_no: roomDetails.new_room_no || roomDetails.room_no,  // Check room number (new or existing)
        room_type: roomDetails.new_room_type || roomDetails.room_type,  // Check room type
        room_price: roomDetails.new_room_price || roomDetails.room_price  // Check room price
    };

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            setErrorMessage("You must be logged in as admin to update rooms.");
            return;
        }

        const response = await axios.put(`http://localhost:8080/api/rooms/update/${roomDetails.room_no}`, updatedRoomDetails, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
        });

        console.log("Room updated successfully:", response.data);
        setSuccessMessage("Room Updated Successfully")
        // Refresh room list and close modal
        await fetchRooms();
        closeModal();

        setRoomDetails({
            room_no: "",
            room_type: "",
            room_price: "",
            new_room_no: "",
            new_room_type: "",
            new_room_price: "",
        });
    } catch (error) {
        console.error("Error updating room:", error);
        setErrorMessage("Error updating room details.");
    }
};

  // Function to set room details for editing
  const handleEditRoom = (room: Room) => {
    openModal(room); // Open the modal
  };

  const handleDeleteRoom = async (room_no: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return; // Exit if the user cancels

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage("You must be logged in to delete rooms");
        return;
      }

      // Send delete request to the API
      await axios.delete(`http://localhost:8080/api/rooms/${room_no}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        },
        withCredentials: true
      });

      // Refresh the room list after deletion
      fetchRooms();
      console.log("Room deleted successfully");
      setSuccessMessage("Room Deleted Successfully");
    } catch (error) {
      console.error("Error deleting room:", error);
      setErrorMessage("Error deleting room.");
    }
  };



  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6">
        <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Room</h3>
        
{/* Form for Adding Room */}
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleAddRoom}>
          <input
            type="number"
            name="room_no"
            placeholder="Room No"
            maxLength={3}
            value={roomDetails.room_no}
            onChange={handleInputChange}
            min="1"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.room_no && <p className="text-red-500 text-sm">{errors.room_no}</p>}
          
          <input
            type="text"
            name="room_type"
            placeholder="Room Type"
            value={roomDetails.room_type}
            onChange={handleInputChange}
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.room_type && <p className="text-red-500 text-sm">{errors.room_type}</p>}
          
          <input
            type="number"
            name="room_price"
            placeholder="Room Price"
            value={roomDetails.room_price}
            onChange={handleInputChange}
            min="1"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          {errors.room_price && <p className="text-red-500 text-sm">{errors.room_price}</p>}
          
          <button
            type="submit"
            className="bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-700 text-xl "
          >
            Add
          </button>
        </form>
        </div>

       {/* Error Popup */}
       <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />  
        {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />} 

{/* Room Details Section */}
        <div className="bg-white p-6 rounded-lg">
          <h3 className="text-lg text-black font-bold mb-8 bg-gray-200 p-3 px-8">Room Details</h3>

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

{/*Table */}
<div id="" className="overflow-x-auto shadow-md rounded-lg mb-6">
            <table className="w-full border-collapse bg-white">
              <thead className="bg-gray-200 text-white">
            <tr>
                <th className="p-3 text-center border ">Room No</th>
                <th className="py-3 px-6 text-center border ">Room Type</th>
                <th className="p-3 px-6 text-center border ">Room Price</th>
                <th className="p-3 text-center border ">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index)=>(
              <tr className="hover:bg-purple-100">
                <td className="py-3 px-6  text-center">{room.room_no}</td>
                <td className="py-3 px-6  text-center">{room.room_type}</td>
                <td className="py-3 px-6  text-center">NPR. {room.room_price}</td>
                <td className="py-3 px-6  text-center">
                  <a href="#" className="text-gray-600 hover:text-gray-700 mr-2" onClick={()=> handleEditRoom(room)}>Edit</a>
                  <a href="#" className="text-red-600 hover:text-red-700 mr-2" onClick={()=>handleDeleteRoom(room.room_no)}>Delete</a>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
      </div>
      </div>

      {isModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold font-sans mb-4">Update Room Details</h2>
      <form className="space-y-4" onSubmit={handleUpdateRoom}>
        
{/* Current Room Details - Read-Only */}
        <div className="p-2 border rounded-md bg-gray-200">
          <strong>Current Room No:</strong> {roomDetails.room_no}
        </div>
        <div className="p-2 border rounded-md bg-gray-200">
          <strong>Current Room Type:</strong> {roomDetails.room_type}
        </div>
        <div className="p-2 border rounded-md bg-gray-200">
          <strong>Current Room Price:</strong> NPR. {roomDetails.room_price}
        </div>

{/* New Details for Updating */}
        <input
          type="text"
          name="new_room_no"
          placeholder="New Room No" // Separate input for the new room number
          value={roomDetails.new_room_no || ""} // State for new room number
          onChange={handleInputChange} // Update state on change
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />
        <input
          type="text"
          name="new_room_type"
          placeholder="New Room Type"
          value={roomDetails.new_room_type || ""} // State for new room type
          onChange={handleInputChange} // Update state on change
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />
        <input
          type="text"
          name="new_room_price"
          placeholder="New Room Price"
          value={roomDetails.new_room_price || ""} // State for new room price
          onChange={handleInputChange} // Update state on change
          className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
        />

        <div className="flex justify-end gap-x-4">
        <button
          type="submit"
          className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 "
        >
          Update
        </button>
        <button
          type="button"
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
          onClick={closeModal}
        >
          Cancel
        </button>
        </div>
      </form>
    </div>
  </div>
)}
</div>
  );
}
