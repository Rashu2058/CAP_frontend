import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

interface FoodItems {
  f_id: number; // This is the ID for the food item
  food_name: string;
  food_price: number;
  imagePath: string; // Ensure this property is included
}

type orderItem = {
  o_id: number; // This is the ID for the order item
  food_name: string;
  food_price: number;
  quantity: number;
  image_path: string; // Ensure this property is included
};

type ConfirmedOrder = {
  o_id: number; // Ensure this property is included
  roomNo: string; // Ensure this is a string
  guestName: string;
  res_id: number; // Ensure this property is included
  items: orderItem[];
};

interface Room {
  roomNo: string;
  guestName: string;
  resId: number;
}

export default function FoodOrders() {
  const [order, setOrder] = useState<orderItem[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<ConfirmedOrder[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomNo, setRoomNo] = useState('');
  const [guestName, setGuestName] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [foodItems, setFoodItems] = useState<FoodItems[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [roomSearch, setRoomSearch] = useState('');
  const [foodOrders, setFoodOrders] = useState<any[]>([]); // Adjusted type if necessary

  const token = localStorage.getItem('token');

  // Fetch food items
  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/foods', {
          headers: {
            'Authorization': `Bearer ${token}`,
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

  // Fetch available rooms
  useEffect(() => {
    if (token) {
      axios
        .get('http://localhost:8080/api/reservations/reserved-rooms', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRooms(response.data);
        })
        .catch((error) => console.error('Error fetching rooms:', error));
    }
  }, [token]);

  // Fetch food orders
  const fetchFoodOrders = async () => {
    try {
      if (token) {
        const response = await axios.get('http://localhost:8080/api/v1/food-orders/get-orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFoodOrders(response.data);
      } else {
        setError('Authorization token not found');
      }
    } catch (err) {
      console.error('Error fetching food orders:', err);
      setError('Failed to fetch food orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodOrders(); // Call fetchFoodOrders when the component mounts
  }, [token]);

  const roomOptions = rooms.map((room) => ({
    value: room.roomNo,
    label: `Room ${room.roomNo}`,
  }));

  const addToOrder = (item: FoodItems) => {
    const existingItem = order.find((orderItem) => orderItem.o_id === item.f_id);
    if (existingItem) {
      setOrder(
        order.map((orderItem) =>
          orderItem.o_id === item.f_id
            ? { ...orderItem, quantity: orderItem.quantity + 1 }
            : orderItem
        )
      );
    } else {
      setOrder([...order, { 
        o_id: item.f_id, 
        food_name: item.food_name, 
        food_price: item.food_price, 
        quantity: 1, 
        image_path: item.imagePath // Ensure this is included
      } as orderItem]); // Cast the object to orderItem
    }
  };

  const increaseQuantity = (id: number) => {
    setOrder(
      order.map((item) =>
        item.o_id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setOrder(
      order.map((item) =>
        item.o_id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeFromOrder = (id: number) => {
    setOrder(order.filter((item) => item.o_id !== id));
  };

  const totalAmount = order.reduce(
    (total, item) => total + item.food_price * item.quantity,
    0
  );

  const onConfirmOrder = async () => {
    if (!roomNo || !guestName) {
      setError('Room number and Guest name are required');
      return;
    }

    const foodOrders = order.map((item) => ({
      resId: rooms.find((room) => room.roomNo === roomNo)?.resId,
      foodId: item.o_id,
      quantity: item.quantity,
    }));

    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/food-orders/create',
        foodOrders,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setOrder([]); // Clear the order
        setRoomNo(''); // Reset room number
        setGuestName(''); // Reset customer name
        setOrderConfirmed(true);
        setTimeout(() => setOrderConfirmed(false), 3000);
        // Fetch food orders again after confirming
        fetchFoodOrders();
      }
    } catch (error) {
      console.error('Error placing food order:', error);
      setError('Error placing order');
    }
  };

  const handleRoomChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      const selectedRoomData = rooms.find(room => room.roomNo === selectedOption.value);
      if (selectedRoomData) {
        setGuestName(selectedRoomData.guestName || ''); // Update guest name
        setRoomNo(selectedRoomData.roomNo); // Update room number
      }
    }
  };

  // Function to group food orders by room number and guest name
  const groupFoodOrders = () => {
    const groupedOrders: { [key: string]: ConfirmedOrder } = {};

    foodOrders.forEach(order => {
      const key = `${order.roomNo}-${order.guestName}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = {
          o_id: order.o_id, // Ensure this is included
          roomNo: order.roomNo,
          guestName: order.guestName,
          res_id: order.res_id, // Ensure this is included
          items: [],
        };
      }
      // Check if the food item already exists in the grouped order
      const existingItem = groupedOrders[key].items.find(item => item.food_name === order.foodName);
      if (existingItem) {
        existingItem.quantity += order.quantity; // Increment quantity if it exists
      } else {
        groupedOrders[key].items.push({
          o_id: order.o_id,
          food_name: order.foodName,
          food_price: order.foodPrice,
          quantity: order.quantity,
          image_path: order.imagePath // Ensure this is included if needed
        });
      }
    });

    return Object.values(groupedOrders);
  };

  const groupedConfirmedOrders = groupFoodOrders();

  return (
    <div className="p-4">
      <div className="flex">
        {/* Left Section - Menu */}
        <div className="w-2/3 p-4 bg-white rounded-lg mr-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>

          {/* Room No */}
          <div className="flex flex-col mb-4">
            <label className="block text-sm font-semibold">Room No</label>
            <Select
              value={roomOptions.find((option) => option.value === roomNo)}
              onChange={handleRoomChange}
              options={roomOptions.filter((option) =>
                option.label.toLowerCase().includes(roomSearch.toLowerCase())
              )}
              onInputChange={(value) => setRoomSearch(value)}
              placeholder="Select Room No"
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
              isSearchable
            />
          </div>

          {/* Guest Name */}
          <div className="flex flex-col mb-4">
            <label className="block text-sm font-semibold">Guest Name</label>
            <input
              type="text"
              value={guestName}
              readOnly
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

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
                  onClick={() => addToOrder(item)} // Pass the item directly
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
                      onClick={() => removeFromOrder(item.o_id)}
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
              onClick={() => setOrder([])} // Clear the order
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
      <div className="mt-8 bg-white rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Confirmed Orders</h2>
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="border px-4 py-2">Room No</th>
              <th className="border px-4 py-2">Guest Name</th>
              <th className="border px-4 py-2">Food Items</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {groupedConfirmedOrders.map((order, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{order.roomNo}</td>
                <td className="border px-4 py-2">{order.guestName}</td>
                <td className="border px-4 py-2">
                  {order.items.map(item => `${item.food_name} (x${item.quantity})`).join(', ')}
                </td>
                <td className="border px-4 py-2">
                  NPR {order.items.reduce((total, item) => total + item.food_price * item.quantity, 0)}
                </td>
                <td className="border px-4 py-2">
                  <a href="#" className="text-red-600 hover:text-red-700">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}