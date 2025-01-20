import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';


interface FoodItems{
  f_id:number,
  food_name:string,
  food_price:number,
  imagePath:string,
}

type orderItem = {
  o_id: number;
  food_name: string;
  food_price: number;
  quantity: number;
  image_path: string;
};

type ConfirmedOrder = {
  o_id:number;
  roomNo: string;
  customerName: string;
  res_id:number;
  items: orderItem[];
};

interface food_orders {
  o_id: number;
  room_no: number;
  food_name: string;
  quantity: number;
  food_price: number;
  total_price: number;
  customer_name: string;
}
interface Room{
  roomNo:string;
  customerName:string;
  resId:number;
};




export default function FoodOrders() {
//States for handling order items,rooms,food items and API responses
  const [order, setorder] = useState<orderItem[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<ConfirmedOrder[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomData, setSelectedRoom] = useState<string>('');
  const [roomNo, setRoomNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [roomSearch, setRoomSearch] = useState('');
  const [foodOrders, setFoodOrders] = useState<food_orders[]>([]);  
  
  const token = localStorage.getItem('token');

 //Fetch food orders
  
 useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.get('http://localhost:8080/api/v1/food-orders/get-orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Food Orders Response:', response.data);
      setFoodOrders(response.data);
    })
    .catch((error) => {
      console.error("Error fetching food orders:", error);
      setError("Error fetching data");
    });
  } else {
    setError("Authorization token not found");
  }
}, [token]);
  

  
//Fetch Food items 
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token
        const response = await fetch('http://localhost:8080/api/foods', {
          headers: {
            'Authorization': `Bearer ${token}`, // Send the token
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch food items');
        }
        const data = await response.json();
        setFoodItems(data);
      } catch (err) {
        setError('Error fetching food items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };    

    fetchFoodItems();
  }, [token]);

{/*fetch available rooms and customer names*/}
useEffect(() => {
  const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage
  if (token) {
    axios
      .get('http://localhost:8080/api/reservations/reserved-rooms', {
        headers: {
          Authorization: `Bearer ${token}`, // Send the token in the Authorization header
        },
      })
      .then((response) => {
        console.log('Rooms Respose:',response.data);
        setRooms(response.data)
      })
      .catch((error) => console.error('Error fetching rooms:', error));
  }
}, [token]);

//Prepare room options for dropdown
const roomOptions = rooms.map((room) => ({
  value: room.roomNo,
  label: `Room ${room.roomNo}`,
}));
//Add food item to the order
  const addToorder = (item: orderItem) => {
    const existingItem = order.find((orderItem) => orderItem.o_id === item.o_id);
    if (existingItem) {
      setorder(
        order.map((orderItem) =>
          orderItem.o_id === item.o_id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setorder([...order, { ...item, quantity: 1 }]);
    }
  };
//Incease quantity of a food item
  const increaseQuantity = (id: number) => {
    setorder(
      order.map((item) =>
        item.o_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
//decreaseQuantity of food item
  const decreaseQuantity = (id: number) => {
    setorder(
      order.map((item) =>
        item.o_id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };
//Remove food item from the order
  const removeFromorder = (id: number) => {
    setorder(order.filter((item) => item.o_id !== id));
  };

  const totalAmount = order.reduce(
    (total, item) => total + item.food_price * item.quantity,
    0
  );


  
  
  const onConfirmOrder = async () => {
  
    if (!roomNo || !customerName) {
      console.error('Validation Failed: Room number and customer name are required');
      setError('Room number and customer name are required');
      return;
    }
  
    const selectedRoomData = rooms.find((room) => room.roomNo.toString() === roomNo.toString());
    if (!selectedRoomData) {
      console.error('Validation Failed: No room found for this number');
      setError('No room found for this number');
      return;
    }
    console.log('Selected room data:', selectedRoomData);

    const foodOrders = order.map((item) => ({
      resId: selectedRoomData.resId, // Ensure res_id is fetched correctly
      foodId: item.o_id, // Ensure o_id is correct
      quantity: item.quantity,
    }));
  
    console.log('Payload to Submit:', foodOrders);
  
    if (foodOrders.length === 0) {
      console.error('Validation Failed: No items in the order');
      setError('No items in the order');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/food-orders/create',
        foodOrders,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
  
      if (response.status === 200) {
        console.log('Order confirmed:', response.data);
        setorder([]); // Clear the order
        setRoomNo(''); // Reset room number
        setCustomerName(''); // Reset customer name
        setOrderConfirmed(true);
        setTimeout(() => setOrderConfirmed(false), 3000);
      }
    } catch (error) {
      console.error('Error placing food order:', error);
      setError('Error placing order');
    }
  };
  
    
const handleroomChange = (selectedOption: { value: string; label: string } | null) => {
  if (selectedOption) {
    const selectedRoomData = rooms.find(room => room.roomNo === selectedOption.value);
    if (selectedRoomData) {
      setCustomerName(selectedRoomData.customerName || ''); // Update customer name
      setRoomNo(selectedRoomData.roomNo); // Update room number
      setSelectedRoom(selectedRoomData.resId.toString()); // Store `res_id` for submission
    } else {
      setError('Selected room does not exist. Please refresh and try again.');
    }
  }
};

  const filteredRooms = rooms.filter((room) =>
    room.roomNo.toString().toLowerCase().includes(roomSearch.toLowerCase())
);
   
  const handleRoomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const roomNo = event.target.value;
    setSelectedRoom(roomNo);
  
    // Find the customer name for the selected room number and its reservation ID
    const selectedRoomData = rooms.find((room) => room.roomNo.toString() === roomNo);
    
    if (selectedRoomData) {
      setCustomerName(selectedRoomData.customerName || ''); // Set customer name
      setRoomNo(selectedRoomData.roomNo); // Set the selected room number
      setSelectedRoom(roomNo); // Store full room data including reservation ID
    }else {
      setError('No room data found for the selected room number');
    }
  };

  
  const editOrder = (order: ConfirmedOrder) => {
     //Populate order with items from the selected order
  
     setRoomNo(order.roomNo);
     setCustomerName(order.customerName);
  };
  return (
    <div className="p-4">
      <div className="flex">

{/* Left Section - Menu */}
        <div className="w-2/3 p-4 bg-white rounded-lg mr-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>

{/* Search bar */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              />
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
          }}
        >


{/* Room No */}
          <div className="flex flex-col">
            <label className="block text-sm font-semibold">Room No</label>
            <Select
  value={roomOptions.find((option) => option.value === roomNo)}
  onChange={(selectedOption) => {
    const selectedRoomData = rooms.find(
      (room) => room.roomNo === selectedOption?.value
    );
    if (selectedRoomData) {
      setCustomerName(selectedRoomData.customerName || "");
      setRoomNo(selectedRoomData.roomNo || "");
      setSelectedRoom(selectedOption?.value || "");
    } else {
      setError("Selected room does not exist. Please refresh and try again.");
    }
  }}
  options={roomOptions.filter((option) =>
    option.label.toLowerCase().includes(roomSearch.toLowerCase())
  )}
  onInputChange={(value) => setRoomSearch(value)}
  placeholder="Select Room No"
  className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
  isSearchable
/>


            </div>

{/* Customer Name */}
          <div className="flex flex-col">
            <label className="block text-sm font-semibold">Customer Name</label>
            <input
              type="text"
              value={customerName}
              placeholder="Robert Wilson"
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </form>

{/* Display food items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div
                key={item.f_id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={`http://localhost:8080/api/files/${item.imagePath}`}
                  alt={item.food_name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold">{item.food_name}</h3>
                <p className="text-gray-600">Price: NPR {item.food_price}</p>
                <button
                  className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                   onClick={() => addToorder({ 
                      o_id: item.f_id, 
                      food_name: item.food_name, 
                      food_price: item.food_price, 
                      quantity: 1, 
                      image_path: item.imagePath 
                  })}
                >
                  Add to order
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Cart */}
        <div className="w-1/3 p-4 bg-white rounded-lg">
          <h2 className="text-lg font-bold mb-4">Orders</h2>
          {order.length === 0 ? (
            <p className="text-gray-500">Your order is empty.</p>
          ) : (
            <>
              {order.map((item) => (
                <div
                  key={item.o_id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h3 className="font-medium">{item.food_name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: NPR {item.food_price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="text-gray-900 px-2"
                      onClick={() => decreaseQuantity(item.o_id)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="text-gray-900 px-2"
                      onClick={() => increaseQuantity(item.o_id)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => removeFromorder(item.o_id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-lg font-bold">
                Total Amount: NPR {totalAmount}
              </div>
            </>
          )}
          <div className="flex justify-between mt-4">
            <button
              type="button"
              className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              onClick={onConfirmOrder}
            >
              Confirm
            </button>
          </div>
          {orderConfirmed && (
            <div className="mt-4 text-green-600 font-semibold">
              Order confirmed!
            </div>
          )}
        </div>
      </div>

{/* Confirmed Orders Table */}
  {confirmedOrders.length > 0 && (
  <div className="mt-8 bg-white rounded-lg p-4">
    <h2 className="text-lg font-bold mb-4">Confirmed Orders</h2>
    
{/* Search bar */}
          <div className="flex justify-center mb-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-transparent"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <img
                  src="/search.png"
                  alt="Search"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
            </div>
          </div>
          <table className="min-w-full bg-white border rounded-lg">
  <thead>
  <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Room Number</th>
            <th className="py-2 px-4 border-b">Food Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Food Price</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Customer Name</th>
          </tr>
        </thead>
        <tbody>
  {foodOrders.length > 0 ? (
    foodOrders.map((order) => (
      <tr key={order.o_id}>
        <td className="py-2 px-4 border-b">{order.o_id}</td>
        <td className="py-2 px-4 border-b">{order.room_no}</td>
        <td className="py-2 px-4 border-b">{order.food_name}</td>
        <td className="py-2 px-4 border-b">{order.quantity}</td>
        <td className="py-2 px-4 border-b">{order.food_price}</td>
        <td className="py-2 px-4 border-b">{order.total_price}</td>
        <td className="py-2 px-4 border-b">{order.customer_name}</td>
      </tr>
    ))
  ) : (
    <tr>
      console.error("No food order");
      
    </tr>
  )}
</tbody>
      </table>
  </div>
)}
</div>
);
}
