"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { headers } from "next/headers";

const token =localStorage.getItem('token');
console.log("Token from localstorage:",token);

interface Food {
  f_id: number;
  food_price: number;
  food_name: string;
  food_category: string;
  image: string | null;
}

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
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setFoodCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // Fetch food items on component load
  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      
      const response = await axios.get("http://localhost:8080/api/foods", {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'Application/json',
        },
      });
      setFoodItems(response.data); // Assuming response.data contains the food items
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  // Add or update food item
  const addFood = async () => {
    if (foodName && foodPrice && foodCategory) {
      const formData = new FormData();
      formData.append("food_name", foodName);
      formData.append("food_price", foodPrice);
      formData.append("food_category", foodCategory);
  
      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (imageInput && imageInput.files && imageInput.files[0]) {
      const imageFile = imageInput.files[0];
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/foods", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFoodItems([...foodItems, response.data]);
      clearInputs();
    } catch (error) {
      console.error("Error adding food item:", error);
    }
  }
};

// Update existing food item
const updateFood = async () => {
  if (editingIndex !== null && foodName && foodPrice && foodCategory) {
    const updatedFood: Partial<Food> = {
      food_name: foodName,
      food_price: parseFloat(foodPrice),
      food_category: foodCategory,
      // Only include the image if it's been updated
      ...(previewImage && { image: previewImage }), 
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/api/foods/${foodItems[editingIndex].f_id}`,
        updatedFood,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Ensure response.data is the updated food item
      const updatedFoodItems = [...foodItems];
      updatedFoodItems[editingIndex] = response.data; // Ensure the response has the updated data
      setFoodItems(updatedFoodItems);
      clearInputs();
      setEditingIndex(null);
    } catch (error) {
      console.error("Error updating food item:", error);
    }
  }
};


// Clear input fields
const clearInputs = () => {
  setFoodName("");
  setFoodPrice("");
  setFoodCategory("");
  setPreviewImage(null);
};

  // Delete a food item
  const deleteFoodItem = async (index: number) => {
    const foodId = foodItems[index].f_id;
    try {
      await axios.delete(`http://localhost:8080/api/foods/${foodId}`,{
        headers:{
          Authorization:`Bearer ${token}`,
        },
      });
      setFoodItems(foodItems.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  // Add new food category
  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  // Image handling
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Edit existing food item
  const editFoodItem = (index: number) => {
    const food = foodItems[index];
    setFoodName(food.food_name);
    setFoodPrice(food.food_price.toString());
    setFoodCategory(food.food_category);
    setPreviewImage(food.image);
    setEditingIndex(index);
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6 align-right">
        <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Food Menu</h3>
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder="Name" className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          <input type="text" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} placeholder="Price" className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          
          <div className="relative">
            <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full text-left p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300">
              {foodCategory ? foodCategory : "Select Food Category"}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100">
                    <span onClick={() => { setFoodCategory(item); setDropdownOpen(false); }} className="cursor-pointer">{item}</span>
                    <button onClick={() => deleteFoodItem(index)} className="text-red-500 font-bold hover:text-red-700">
                      <Image src="/delete.png" alt="delete" width={20} height={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

        <div className="flex flex-row items-center space-y-0 gap-x-4">
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new category" className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          <button onClick={addItem} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Add Category</button>
        </div>

        <div className="flex flex-col mt-6">
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 text-sm text-gray-700 border rounded-lg p-2" />
          {previewImage && <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />}
        </div>

        <div className="flex justify-end px-6 py-4">
          {editingIndex !== null ? (
            <button
              onClick={updateFood}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-serif"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addFood}
              className="bg-gray-900 text-white px-8 py-4 rounded-lg hover:bg-gray-700 text-xl flex items-center space-x-2 font-serif"
            >
              Add
            </button>
          )}
        </div>
      </div>

{/* Display added food items as cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {foodItems.map((food, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              {food.image && (
                <img
                  src={food.image}
                  alt={food.food_name}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />
              )}
              <h3 className="text-lg font-bold mb-2">{food.food_name}</h3>
              <p className="text-gray-700">Price: {food.food_price}</p>
              <p className="text-gray-700">Category: {food.food_category}</p>
              <button
                onClick={() => editFoodItem(index)}
                className="text-black font-bold hover:text-purple-300 mr-2"
              >
                Edit
              </button>
              <button className="text-red-500 font-bold hover:text-purple-300">
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
  );
}
