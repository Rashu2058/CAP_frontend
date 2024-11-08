import axios from "axios";

// Define the base URL for customer-related requests
const BASE_URL = "http://localhost:8080/api/customers";

// Define a type for Customer data
interface Customer {
  c_id: number;
  id_type: string;
  id_no: string;
  name: string;
  phone_number: number;
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

// Update Customer Function
export const updateCustomer = async (customerId: string, updatedData: Customer): Promise<Customer> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.put(`${BASE_URL}/update/${customerId}`, updatedData, { headers });
    console.log("Customer updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to update customer:", error);
    throw error;
  }
};

// Delete Customer Function
export const deleteCustomer = async (customerId: string): Promise<void> => {
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const response = await axios.delete(`${BASE_URL}/delete/${customerId}`, { headers });
    console.log("Customer deleted successfully:", response.data);
  } catch (error) {
    console.error("Failed to delete customer:", error);
    throw error;
  }
};
