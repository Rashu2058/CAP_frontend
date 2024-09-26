"use client";
import { useState } from "react";
import Image from "next/image";

export default function FoodManagement() {

  const [items, setItems] = useState([
    "Main Courses",
    "Breakfast & Snacks",
    "Salads",
    "Drinks",
    "Desserts",
  ]);
  const [newItem, setNewItem] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

{/*State to store added food items*/}
  const [foodItems, setFoodItems] = useState<{ name: string; price: string; category: string; image: string | null }[]>([]);

  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");

{/*Function to handle adding a new food category*/}
  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem(""); // Clear the input field after adding
    }
  };

  {/*Function to handle the file for uploading a photo*/}
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      setPreviewImage(URL.createObjectURL(file)); // Set image preview
    }
  };

{/*Function to add food item*/}
  const addFoodItem = () => {
    if (foodName && foodPrice && foodCategory) {
      const newFood = {
        name: foodName,
        price: foodPrice,
        category: foodCategory,
        image: previewImage,
      };
      setFoodItems([...foodItems, newFood]); // Add new food item to the list
      setFoodName("");
      setFoodPrice("");
      setFoodCategory("");
      setPreviewImage(null); // Reset after adding
    }
  };

  return (
    <div>
      
{/* Food Menu Management Section */}
      <div className="max-w-5xl mx-auto p-4">

{/* Add New Food Menu Section */}
        <div className="bg-white p-6 rounded-lg mb-6 align-right">
          <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Food Menu</h3>
          <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Name"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <input
              type="text"
              name="price"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              placeholder="Price"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <select
              name="category"
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            >
              <option value="" disabled>Select Food Category</option>
              {items.map((item, index) => (
                <option key={index} value={item}>{item}</option>
              ))}
            </select>
          </form>

{/* Add new category input */}
          <div className="flex flex-row items-center space-y-0 gap-x-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new category"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button
              onClick={addItem}
              className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Add Category
            </button>
          </div>

{/* Add Food Photo */}
          <div className="flex flex-col mt-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 text-sm text-gray-700 border rounded-lg p-2"
            />
            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-40 h-40 object-cover rounded-lg border"
              />
            )}
          </div>

{/* Add Button */}
          <div className="flex justify-end sm:justify-end px-6 py-4">
            <button
              onClick={addFoodItem}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-serif"
            >
              Add
            </button>
          </div>
        </div>

{/* Display added food items as cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foodItems.map((food, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              {food.image && (
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
                
              )}
              <h3 className="text-lg font-bold mb-2">{food.name}</h3>
              <p className="text-gray-700">Price: {food.price}</p>
              <p className="text-gray-700">Category: {food.category}</p>
              <a href="#" className="text-black font-bold hover:text-purple-300 mr-2">Edit</a>
              <a href="#" className="text-red-500 font-bold hover:text-purple-300 mr-2">Delete</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
