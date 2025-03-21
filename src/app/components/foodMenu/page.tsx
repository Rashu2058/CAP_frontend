"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

interface Food {
  f_id: number;
  food_price: number;
  food_name: string;
  foodCategory: string;
  imagePath: string;
}

export default function FoodManagement() {
  const [items, setItems] = useState([
    "Main Courses",
    "Breakfast & Snacks",
    "Salads",
    "Drinks",
    "Desserts",
  ]);

  const token = localStorage.getItem("token") || "";
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const [newItem, setNewItem] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setfoodCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false); // For main form
  const [dropdownOpenInModal, setDropdownOpenInModal] = useState(false); // For modal
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/foods", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Fetched food items:", response.data);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
      setErrorMessage("Error fetching food items");
    }
  };

  const handleAddFood = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!foodName || !foodPrice || !foodCategory) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (isNaN(Number(foodPrice)) || Number(foodPrice) <= 0) {
      setErrorMessage("Please enter valid data ");
      return;
    }
    if (!selectedFile) {
      setErrorMessage("Please upload an image");
      return;
    }

    const duplicate = foodItems.some(
      (food) => food.food_name.toLowerCase() === foodName.toLowerCase()
    );
    if (duplicate) {
      setErrorMessage("Food item already exists.");
      clearInputs();
      return;
    }

    const formData = new FormData();
    formData.append("food_name", foodName);
    formData.append("food_price", foodPrice);
    formData.append("food_category", foodCategory);
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("http://localhost:8080/api/foods", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setFoodItems([...foodItems, response.data]);
      setSuccessMessage("Food added successfully");
      clearInputs();
      setErrorMessage("");
    } catch (error) {
      console.error("Error saving food item:", error);
      setErrorMessage("Error Saving Food items");
    }
  };

  const handleUpdateFood = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior

    if (!foodName || !foodPrice || !foodCategory) {
      setErrorMessage("Please fill all fields");
      return;
    }
    if (isNaN(Number(foodPrice)) || Number(foodPrice) <= 0) {
      setErrorMessage("Please enter valid data ");
      return;
    }

    const formData = new FormData();
    formData.append("food_name", foodName);
    formData.append("food_price", foodPrice);
    formData.append("food_category", foodCategory);

    if (selectedFile) {
      console.log("File added:", selectedFile.name);
      formData.append("image", selectedFile);
    } else {
      console.log("No image file selected, skipping image update");
    }

    const url = `http://localhost:8080/api/foods/${foodItems[editingIndex!].f_id}`;

    try {
      const response = await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const updatedFoodItems = [...foodItems];
      updatedFoodItems[editingIndex!] = response.data;
      setFoodItems(updatedFoodItems);
      console.log("Updated food items:", updatedFoodItems);
      setSuccessMessage("Food item updated successfully");
      clearInputs();
      setErrorMessage("");
      setIsModalOpen(false); // Close the modal after saving
    } catch (error) {
      console.error("Error saving food item:", error);
      setErrorMessage("Error Saving Food items");
    }
  };

  const clearInputs = () => {
    setFoodName("");
    setFoodPrice("");
    setfoodCategory("");
    setPreviewImage(null);
    setSelectedFile(null);
    setEditingIndex(null);
    const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (imageInput) {
      imageInput.value = "";
    }
  };

  const deleteFoodItem = async (index: number) => {
    const foodId = foodItems[index].f_id;
    try {
      const token = localStorage.getItem("token") || "";
      await axios.delete(`http://localhost:8080/api/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoodItems(foodItems.filter((_, i) => i !== index));
      setSuccessMessage("Food item deleted Successfully");
    } catch (error) {
      console.error("Error deleting food item:", error);
      setErrorMessage("Error deleting food item");
    }
  };

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem)) {
      setItems([...items, newItem]);
      setNewItem("");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
      setSelectedFile(file);
    }
  };

  const editFoodItem = (index: number) => {
    const food = foodItems[index];
    setFoodName(food.food_name);
    setFoodPrice(food.food_price.toString());
    setfoodCategory(food.foodCategory);
    setPreviewImage(`http://localhost:8080/api/files/${food.imagePath}`);
    setEditingIndex(index);
    setIsModalOpen(true); // Open the modal when editing
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    clearInputs();
  };

{/*Search Query*/}
const filteredFoods = foodItems.filter((food) => {
  const query = searchQuery.toLowerCase();
  return (
    food.food_name.toLowerCase().includes(query) ||
    food.foodCategory.toLowerCase().includes(query) ||
    String(food.food_price).toLowerCase().includes(query)
  );
});

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6 align-right">
        <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Food Menu</h3>
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={handleAddFood}>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Name"
            maxLength={40}
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
          <input
            type="tel"
            value={foodPrice}
            maxLength={4}
            onChange={(e) => setFoodPrice(e.target.value)}
            placeholder="Price"
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />

          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full text-left p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            >
              {foodCategory ? foodCategory : "Select Food Category"}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100">
                    <span
                      onClick={() => {
                        setfoodCategory(item);
                        setDropdownOpen(false);
                      }}
                      className="cursor-pointer"
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-row items-center space-y-0 gap-x-4">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Add new category"
              maxLength={20}
              className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
            />
            <button onClick={addItem} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
              Add Category
            </button>
          </div>
          <div className="flex flex-col mt-6">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 text-sm text-gray-700 border rounded-lg p-2"
            />
            {previewImage && (
              <div>
                <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />
              </div>
            )}
          </div>

          <div className="flex justify-end px-6 py-4">
            <button type="submit" className="bg-gray-900 text-white px-8 py-4 rounded-lg">
              Add food
            </button>
          </div>
        </form>
      </div>

{/* Search bar*/}
<div className="flex justify-center mb-4 bg-white p-3 rounded-lg">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            maxLength={15}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by food name, category or price..."
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

      <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />
      {successMessage && <SuccessBox message={successMessage} onClose={() => setSuccessMessage("")} />}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-1/3">
            <h3 className="text-2xl font-bold mb-4">Edit Food Item</h3>
            <form className="grid grid-cols-1 gap-4" onSubmit={handleUpdateFood}>
              <input
                type="text"
                value={foodName}
                onChange={(e) => setFoodName(e.target.value)}
                placeholder="Name"
                className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              />
              <input
                type="tel"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
                placeholder="Price"
                className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
              />
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpenInModal(!dropdownOpenInModal)}
                  className="w-full text-left p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300"
                >
                  {foodCategory ? foodCategory : "Select Food Category"}
                </button>
                {dropdownOpenInModal && (
                  <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                    {items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100">
                        <span
                          onClick={() => {
                            setfoodCategory(item);
                            setDropdownOpenInModal(false);
                          }}
                          className="cursor-pointer"
                        >
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex flex-col mt-6">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mb-4 text-sm text-gray-700 border rounded-lg p-2"
                />
                {previewImage && (
                  <div>
                    <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />
                  </div>
                )}
              </div>
              <div className="flex justify-end space-x-4">
                <button type="submit" className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-500">
                  Save
                </button>
                <button type="button" onClick={closeModal} className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-500">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredFoods.length === 0 && searchQuery ? (
          <div className="col-span-full text-center py-8">
            <div className="text-gray-500 text-lg font-medium">
              No food items found matching "{searchQuery}"
            </div>
            <div className="mt-2 text-sm text-gray-400">
              Try searching for a different item or check the spelling
            </div>
          </div>
        ) : (
          filteredFoods.map((food, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
              {food.imagePath ? (
                <img
                  src={`http://localhost:8080/api/files/${food.imagePath}`}
                  alt={food.food_name}
                  className="w-full h-40 object-cover rounded-lg"
                />
              ) : (
                <img
                  src="/placeholder-image.jpg"
                  alt="No Image Available"
                  className="w-full h-40 object-cover rounded-lg"
                />
              )}
              <div className="mt-4">
                <h4 className="text-lg font-bold">{food.food_name}</h4>
                <p className="text-gray-700">
                  Category: {food.foodCategory || "No category specified"}
                </p>
                <p className="text-gray-900 font-semibold mt-1">Price: NPR.{food.food_price}</p>
                <div className="flex items-center justify-end mt-4 space-x-2">
                  <button
                    onClick={() => editFoodItem(index)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteFoodItem(index)} 
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}