import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/food-orders";

export const createFoodOrder = async (foodOrderRequest: {
  resId: number;
  foodId: number;
  quantity: number;
}) => {
  return axios.post(`${API_URL}/create`, foodOrderRequest);
};

export const updateFoodOrder = async (oId: number, updatedOrder: any) => {
  return axios.put(`${API_URL}/update/${oId}`, updatedOrder);
};

export const deleteFoodOrder = async (oId: number) => {
  return axios.delete(`${API_URL}/delete/${oId}`);
};

export const fetchReservedRooms = async () => {
  return axios.get(`${API_URL}/reserved-rooms`);
};
