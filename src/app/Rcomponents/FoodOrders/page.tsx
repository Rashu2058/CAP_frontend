"use client";
import { useState } from "react";
import Image from "next/image";

export default function FoodManagement() {
  // Constant food item to add initially
  const INITIAL_FOOD_ITEM = "Pizza";

  // State to manage food items (explicitly typed as a string array)
  const [foodItems, setFoodItems] = useState<string[]>([INITIAL_FOOD_ITEM]);
  const [newFood, setNewFood] = useState<string>("");

  // Function to handle adding food items
  const addFoodItem = () => {
    if (newFood.trim()) {
      setFoodItems([...foodItems, newFood]);
      setNewFood(""); // Clear input after adding
    }
  };

  // Function to handle deleting food items
  const deleteFoodItem = (index: number) => {
    const updatedItems = foodItems.filter((_, i) => i !== index);
    setFoodItems(updatedItems);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 flex">
      <div className="border p-6 bg-gray-100 mr-4 rounded-lg shadow-lg flex-1">
        <h2 className="text-xl font-bold">Food Orders</h2>

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

        {/* Form for adding new food item */}
        <form
          className="grid grid-cols-2 gap-4 mb-4"
          onSubmit={(e) => {
            e.preventDefault(); // Prevent form submission
            addFoodItem(); // Add food item
          }}
        >
          {/* Room No */}
          <div className="flex flex-col">
            <label className="block text-sm font-semibold">Room No</label>
            <select
              name="room_no"
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
              defaultValue=""
            >
              <option value="" disabled>
                Select Room No
              </option>
              <option value="101">101</option>
              <option value="102">102</option>
              <option value="103">103</option>
            </select>
          </div>

{/* Customer Name */}
          <div className="flex flex-col">
            <label className="block text-sm font-semibold">Customer Name</label>
            <input
              type="text"
              placeholder="Robert Wilson"
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </form>

{/* Food Items List */}
        <div className="grid grid-cols-3 gap-4">
          {foodItems.map((item: string, index: number) => (
            <div key={index} className="border rounded-lg p-4 bg-white shadow-lg flex flex-col items-center">
              <h3 className="text-md font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </div>

{/* Right Side for Added Items */}
      <div className="w-1/3 border p-4 ml-4 bg-gray-200 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Added Food Items</h2>
        <div className="flex flex-col space-y-2">
          {foodItems.length === 0 ? (
            <p>No items added.</p>
          ) : (
            foodItems.map((item: string, index: number) => (
              <div key={index} className="flex justify-between items-center border-b py-2">
                <span>{item}</span>
                <button
                  onClick={() => deleteFoodItem(index)}
                  className="text-red-600 hover:text-red-800"
                >
                  Delete
                </button>
              </div>
            ))
          )}
          <button>Cancel</button>
          <button>Save</button>
        </div>
      </div>
    </div>
  );
}
