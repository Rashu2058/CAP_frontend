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
    <div className="min-h-screen bg-gray-200">
      
{/* Navigation bar */}
      <nav className="bg-gray-300 p-2 flex justify-between items-center">
        
{/* Logo Section */}
        <div className="flex items-center space-x-0 font-serif font-bold text-purple-800 text-xl">
          <Image src="/Logo GraceInn.png" alt="Logo" width={65} height={65} />
          <h1>Grace Inn</h1>
        </div>

{/* Navigation and User Section */}
        <div className="flex items-center space-x-8">

{/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-4 justify-items-end font-serif">
            <a href="#" className="text-purple-800 hover:text-gray-200">Dashboard</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Rooms</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Receptionists</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Food Menu</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Reports</a>
            <a href="#" className="text-purple-800 hover:text-gray-200">Settings</a>
          </div>

{/* User Section */}
          <div className="flex justify-end sm:justify-end px-3 py-2">
            <button
              type="button"
              className="bg-gray-300 text-purple-800 font-serif px-3 py-2 rounded-lg flex items-center space-x-3"
            >
              <Image src="/admin.png" alt="Admin" width={25} height={25} className="rounded-full" />
              <span>Admin</span>
            </button>
          </div>
        </div>
      </nav>

{/* Food Menu Management Section */}
      <div className="max-w-5xl mx-auto p-20">
        <h2 className="text-2xl font-bold mb-6 font-serif">Food Menu Management</h2>

{/* Add New Food Menu Section */}
        <div className="bg-purple-400 p-6 rounded-lg mb-6">
          <h3 className="text-lg text-black font-bold mb-4 font-serif"><u>Add Food Menu</u></h3>
          <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              name="name"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="Name"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <input
              type="text"
              name="price"
              value={foodPrice}
              onChange={(e) => setFoodPrice(e.target.value)}
              placeholder="Price"
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <select
              name="category"
              value={foodCategory}
              onChange={(e) => setFoodCategory(e.target.value)}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
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
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-purple-500"
            />
            <button
              onClick={addItem}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
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
              className="bg-purple-600 text-white px-8 py-4 rounded-lg hover:bg-purple-700 text-xl flex items-center space-x-2 font-serif"
            >
              <Image src="/add.png" alt="Add" width={26} height={26} className="rounded-full" />
              <span>Add</span>
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

{/* Footer */}
      <footer className="bg-purple-500 text-white text-center py-4 font-serif text-2xl">
        Hotel Grace Inn 2024
      </footer>

{/* Logout Section */}
      <div className="flex justify-end sm:justify-end px-6 py-4">
        <button
          type="button"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
