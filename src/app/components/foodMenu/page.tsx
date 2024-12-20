"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import ErrorPopup from "../ErrorPopup";

interface Food {
  f_id: number;
  food_price: number;
  food_name: string;
  food_category: string;
  imagePath: string ;
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
  const[errorMessage,setErrorMessage]=useState("")
  
  {/*state and store added food items*/}
  const [newItem, setNewItem] = useState("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
 

{/* State to store added food items*/}
  const [foodItems, setFoodItems] = useState<Food[]>([]);
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodCategory, setfoodCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchFoodItems();
  }, []);

  {/* fetch food items from the database */}

  const fetchFoodItems = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/foods", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log("Fetched food items:",response.data);
      setFoodItems(response.data);
    } catch (error) {
      console.error("Error fetching food items:", error);
    }
  };

  // Add a new food item
  const addFood = async () => {
    if (foodName && foodPrice && foodCategory) {
      const formData = new FormData();
      formData.append("food_name", foodName);
      formData.append("food_price", foodPrice);
      formData.append("foodCategory", foodCategory);

      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (imageInput && imageInput.files && imageInput.files[0]) {
        const imageFile = imageInput.files[0];
        formData.append("image", imageFile);
      }

      try {
        const token = localStorage.getItem("token") || "";
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

  // Update an existing food item
  const updateFood = async () => {
    if (editingIndex !== null && foodName && foodPrice && foodCategory) {
      const formData = new FormData();
      formData.append("food_name", foodName);
      formData.append("food_price", foodPrice);
      formData.append("food_category", foodCategory);

      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (imageInput?.files?.[0]) {
        console.log("File added:", imageInput.files[0].name);
        formData.append("image", imageInput.files[0]);
      } else {
        console.error("No image file selected");
      }

      
      const url = editingIndex === null ? "http://localhost:8080/api/foods" : `http://localhost:8080/api/foods/${foodItems[editingIndex].f_id}`;
      const method = editingIndex === null ? "POST" : "PUT";

      try {
        const response = await axios({
          method,
          url,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        if (editingIndex === null) {
          setFoodItems([...foodItems, response.data]);
        } else {
          const updatedFoodItems = [...foodItems];
          updatedFoodItems[editingIndex] = response.data;
          setFoodItems(updatedFoodItems);
        }
        clearInputs();
        setErrorMessage("");
      } catch (error) {
        console.error("Error saving food item:", error);
      }
    
  };

  const clearInputs = () => {
    setFoodName("");
    setFoodPrice("");
    setfoodCategory("");
    setPreviewImage(null);
    setEditingIndex(null);
  };

  const deleteFoodItem = async (index: number) => {
    const foodId = foodItems[index].f_id;
    try {
      const token = localStorage.getItem("token") || "";
      await axios.delete(`http://localhost:8080/api/foods/${foodId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFoodItems(foodItems.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };


  {/* Function to delete a food category*/}
  const deleteCategory = (category: string) => {
    setItems(items.filter(item => item !== category));
    if (foodCategory === category) {
      setFoodCategory(""); // Clear the selected category if it's deleted
    }
  };

{/* Function to handle adding a new food category*/}
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

  const editFoodItem = (index: number) => {
    const food = foodItems[index];
    setFoodName(food.food_name);
    setFoodPrice(food.food_price.toString());
    setfoodCategory(food.food_category);
    setPreviewImage(food.imagePath);
    setEditingIndex(index);
  };

  const deleteCategory = (category: string) => {
    setItems(items.filter(item => item !== category));
    if (foodCategory === category) {
      setfoodCategory(""); // Clear selected category if deleted
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <div className="bg-white p-6 rounded-lg mb-6 align-right">
        <h3 className="text-2xl text-gray-900 font-bold mb-4 font-sans">Food Menu</h3>
        <form className="grid grid-cols-1 gap-4 mb-4" onSubmit={(e) => e.preventDefault()}>
          <input type="text" 
          value={foodName} 
          onChange={(e) => setFoodName(e.target.value)}
           placeholder="Name" 
           className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          <input type="number" 
          value={foodPrice}
           onChange={(e) => setFoodPrice(e.target.value)}
            placeholder="Price" 
            className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          
{/*Food Category*/}           
          <div className="relative">
            <button type="button" 
            onClick={() => setDropdownOpen(!dropdownOpen)} 
            className="w-full text-left p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300">
              {foodCategory ? foodCategory : "Select Food Category"}
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-100">
                    <span onClick={() => { setFoodCategory(item); setDropdownOpen(false); }} className="cursor-pointer">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </form>

    {/* Error Popup */}
        <ErrorPopup message={errorMessage} onClose={() => setErrorMessage("")} />

        <div className="flex flex-row items-center space-y-0 gap-x-4">
          <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add new category" className="p-2 border rounded-md focus:outline-none focus:ring focus:ring-gray-300" />
          <button onClick={addItem} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">Add Category</button>
        </div>

        <div className="flex flex-col mt-6">
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-4 text-sm text-gray-700 border rounded-lg p-2" />
          {previewImage && <img src={previewImage} alt="Preview" className="w-40 h-40 object-cover rounded-lg border" />}
        </div>

        <div className="flex justify-end px-6 py-4">
          <button onClick={handleFoodAction} className="bg-gray-900 text-white px-8 py-4 rounded-lg">
            {editingIndex !== null ? "Update" : "Add"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {foodItems.map((food, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
            {food.image && (
              <img
                src={food.image}
                alt={food.food_name}
                className="w-full h-40 object-cover rounded-lg"
              />
            )}
            <div className="mt-4">
              <h4 className="text-lg font-bold">{food.food_name}</h4>
              <p className="text-gray-700">Category: {food.food_category}</p>
              <p className="text-gray-900 font-semibold mt-1">Price: Rs.{food.food_price}</p>
              <div className="flex items-center justify-end mt-4 space-x-2">
                <button onClick={() => editFoodItem(index)} className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                  Edit
                </button>
                <button onClick={() => deleteFoodItem(index)} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
