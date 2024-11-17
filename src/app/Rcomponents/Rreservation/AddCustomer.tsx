import axios from "axios";

// Define the base URL for customer-related requests
const BASE_URL = "http://localhost:8080/api/customers";

// Define a type for Customer data
export interface Customer {
  c_id: number;
  id_type: string;
  id_no: number|null;
  name: string;
  phone_number: number|null;
  address: string;
  gender_type: string;
  email: string;
  nationality: string;
}

// Add Customer Function
export const addCustomer = async (customerData: Customer): Promise<Customer> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.post(`${BASE_URL}/add`, customerData, { headers });
    localStorage.setItem("customer_idno", response.data.id_no);
    console.log("Customer added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to add customer:", error);
    throw error;
  }
};

export const deleteCustomer = async (id_no: number|null): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    await axios.delete(`${BASE_URL}/delete/${id_no}`, { headers });
    console.log("Customer deleted successfully");
  } catch (error) {
    console.error("Error deleting customer:", error);
  }
};

// Update Customer Function
export const updateCustomer = async (id_no: number|null, updatedCustomerData: Customer): Promise<Customer> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const response = await axios.put(`${BASE_URL}/update/${id_no}`, updatedCustomerData, { headers });
    console.log("Customer updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const fetchCustomers = async (): Promise<Customer[]> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.get(`${BASE_URL}`, { headers });
    console.log("Fetched customers:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch customers:", error);
    throw error;
  }
};

