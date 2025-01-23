import axios from "axios";

// Define the base URL for guest-related requests
const BASE_URL = "http://localhost:8080/api/guests";

// Define a type for guest data
export interface Guest {
  g_id: number;
  id_type: string;
  id_no: number|null;
  name: string;
  phone_number: number|null;
  address: string;
  gender_type: string;
  email: string;
  nationality: string;
  check_in_date:string,
  check_out_date:string,
  room_no:string,
  room_type:string,
  receptionist_name:string,
  institutionName:string,
  purpose:string,
}

// Add guest Function
export const addGuest = async (guestData: Guest): Promise<Guest> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.post(`${BASE_URL}/add`, guestData, { headers });
    localStorage.setItem("guest_idno", response.data.id_no);
    console.log("Guest added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add guest", error);
    throw error;
  }
};

export const deleteGuest = async (id_no: number|null): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    await axios.delete(`${BASE_URL}/delete/${id_no}`, { headers });
    console.log("Guest deleted successfully");
  } catch (error) {
    console.error("Error deleting guest:", error);
  }
};

// Update guest Function
export const updateGuest = async (id_no: number|null, updatedguestData: Guest): Promise<Guest> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await axios.put(`${BASE_URL}/update/${id_no}`, updatedguestData, { headers });
    console.log("Guest updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating guest:", error);
    throw error;
  }
};

export const fetchGuest = async (): Promise<Guest[]> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.get(`${BASE_URL}`, { headers });
    console.log("Fetched guests:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch guests:", error);
    throw error;
  }
};

