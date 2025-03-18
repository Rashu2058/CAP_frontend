import { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import ErrorPopup from "@/app/popup.tsx/ErrorPopup";
import SuccessBox from "@/app/popup.tsx/SuccessBox";

interface FoodItems {
  f_id: number;
  food_name: string;
  food_price: number;
  imagePath: string;
}

type orderItem = {
  o_id: number;
  food_name: string;
  food_price: number;
  quantity: number;
  image_path: string;
};

type ConfirmedOrder = {
  o_id: number;
  roomNo: string;
  guestName: string;
  res_id: BigInt;
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
  const [foodOrders, setFoodOrders] = useState<any[]>([]);
  const [editingOrder, setEditingOrder] = useState<ConfirmedOrder | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const token = localStorage.getItem('token');

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
        setShowErrorPopup(true);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoodItems();
  }, [token]);

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
        setShowErrorPopup(true);
      }
    } catch (err) {
      console.error('Error fetching food orders:', err);
      setError('Failed to fetch food orders');
      setShowErrorPopup(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoodOrders();
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
        image_path: item.imagePath 
      } as orderItem]);
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
      setShowErrorPopup(true);
      return;
    }
    const selectedRoom = rooms.find((room) => room.roomNo === roomNo);
    if (!selectedRoom || !selectedRoom.resId) {
      console.error('Room reservation ID (resId) is missing:', selectedRoom);
      setError('Reservation ID is missing');
      setShowErrorPopup(true);
      return;
    }

    const foodOrders = order.map((item) => ({
      resId: selectedRoom.resId,
      oId: item.o_id,
      quantity: item.quantity,
    }));
    console.log('Food orders:', foodOrders);

    const dataOrders = order.map((item) => ({
      resId: selectedRoom.resId,
      foodId: item.o_id,
      quantity: item.quantity,
    }));
    console.log('Food orders:', dataOrders);

    try {
      if (isEditing) {
        const response = await axios.put(
          `http://localhost:8080/api/v1/food-orders/update/by-room/${selectedRoom.roomNo}`, 
          foodOrders, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setEditingOrder(null);
          setIsEditing(false);
          setOrder([]);
          setRoomNo('');
          setGuestName('');
          setOrderConfirmed(true);
          setShowSuccessBox(true);
          setSuccessMessage("Order updated successfully!");
          setTimeout(() => setOrderConfirmed(false), 3000);
        }
      } else {
        const response = await axios.post(
          'http://localhost:8080/api/v1/food-orders/create',
          dataOrders, 
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          setOrder([]);
          setRoomNo('');
          setGuestName('');
          setOrderConfirmed(true);
          setShowSuccessBox(true);
          setSuccessMessage("Order confirmed successfully!");
          setTimeout(() => setOrderConfirmed(false), 3000);
        }
      }

      fetchFoodOrders();
    } catch (error) {
      console.error('Error placing food order:', error);
      setError('Error placing order');
      setShowErrorPopup(true);
    }
  };

  const handleRoomChange = (selectedOption: { value: string; label: string } | null) => {
    if (selectedOption) {
      const selectedRoomData = rooms.find(room => room.roomNo === selectedOption.value);
      if (selectedRoomData) {
        setGuestName(selectedRoomData.guestName || '');
        setRoomNo(selectedRoomData.roomNo);
      }
    }
  };

  const groupFoodOrders = () => {
    const groupedOrders: { [key: string]: ConfirmedOrder } = {};

    foodOrders.forEach(order => {
      const key = `${order.roomNo}-${order.guestName}`;
      if (!groupedOrders[key]) {
        groupedOrders[key] = {
          o_id: order.o_id,
          roomNo: order.roomNo,
          guestName: order.guestName,
          res_id: order.res_id,
          items: [],
        };
      }
      const existingItem = groupedOrders[key].items.find(item => item.food_name === order.foodName);
      if (existingItem) {
        existingItem.quantity += order.quantity;
      } else {
        groupedOrders[key].items.push({
          o_id: order.o_id,
          food_name: order.foodName,
          food_price: order.foodPrice,
          quantity: order.quantity,
          image_path: order.imagePath
        });
      }
    });

    return Object.values(groupedOrders);
  };

  const groupedConfirmedOrders = groupFoodOrders();

  const handleEditOrder = (order: ConfirmedOrder) => {
    setEditingOrder(order);
    setOrder(order.items.map(item => ({
      o_id: item.o_id,
      food_name: item.food_name,
      food_price: item.food_price,
      quantity: item.quantity,
      image_path: item.image_path,
    })));
    setRoomNo(order.roomNo);
    setGuestName(order.guestName);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setOrder([]);
    setRoomNo('');
    setGuestName('');
    setIsEditing(false);
  };

  const deleteFoodOrder = async (oId: number) => {
    try {
      await axios.delete(`http://localhost:8080/api/v1/food-orders/delete/${oId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFoodOrders();
      setShowSuccessBox(true);
      setSuccessMessage("Order deleted successfully!");
      setTimeout(() => setShowSuccessBox(false), 3000);
    } catch (error) {
      console.error('Error deleting food order:', error);
      setError('Error deleting order');
      setShowErrorPopup(true);
    }
  };

{/*Search Query*/}
const filteredOrders = groupedConfirmedOrders.filter((order) => {
  const query = searchQuery.toLowerCase();
  return (
    order.roomNo.toLowerCase().includes(query) ||
    order.guestName.toLowerCase().includes(query)
  );
});

  return (
    <div className="p-4">
      <div className="flex">
        <div className="w-2/3 p-4 bg-white rounded-lg mr-4">
          <h2 className="text-lg font-bold mb-4">Menu</h2>

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

          <div className="flex flex-col mb-4">
            <label className="block text-sm font-semibold">Guest Name</label>
            <input
              type="text"
              value={guestName}
              readOnly
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>

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
                  onClick={() => addToOrder(item)}
                >
                  Add to order
                </button>
              </div>
            ))}
          </div>
        </div>

{/*Right Section*/}
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
              onClick={handleCancelEdit}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
              onClick={onConfirmOrder}
            >
              {isEditing ? 'Save' : 'Confirm'}
            </button>
          </div>
        </div>
      </div>

{/*Confirmed Orders*/}
      <div className="mt-8 bg-white rounded-lg p-4">
        <h2 className="text-lg font-bold mb-4">Confirmed Orders</h2>

{/* Search bar*/}
      <div className="flex justify-center mb-4 bg-white p-3 rounded-lg">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            maxLength={15}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by room number or guest name..."
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

{/*Table*/}
    <div id="" className="overflow-x-auto shadow-md rounded-lg mb-5">
        <table className="w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2">Room No</th>
              <th className="border px-4 py-2">Guest Name</th>
              <th className="border px-4 py-2">Food Items</th>
              <th className="border px-4 py-2">Total Price</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
    {filteredOrders.length > 0 ? (
      filteredOrders.map((order, index) => (
      <tr key={index} className="hover:bg-purple-100">
      <td className="border px-4 py-2">{order.roomNo}</td>
      <td className="border px-4 py-2">{order.guestName}</td>
      <td className="border px-4 py-2">
        {order.items.map(item => `${item.food_name} (x${item.quantity})`).join(', ')}
      </td>
      <td className="border px-4 py-2">
        NPR {order.items.reduce((total, item) => total + item.food_price * item.quantity, 0)}
      </td>
      <td className="border px-4 py-2">
        <button
          className="text-blue-600 hover:text-blue-700"
          onClick={() => handleEditOrder(order)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:text-red-700 ml-2"
          onClick={() => deleteFoodOrder(order.o_id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan={7} className="text-center py-3 text-gray-500">
    No order found matching "{searchQuery}"
      <div className="mt-2 text-sm text-gray-400">
       Try searching for a different order.
      </div>
    </td>
  </tr>
    )}
      </tbody>
        </table>
      </div>

      {showErrorPopup && <ErrorPopup message={errorMessage} onClose={() => setShowErrorPopup(false)} />}
      {showSuccessBox && <SuccessBox message={successMessage} onClose={() => setShowSuccessBox(false)} />}
    </div>
    </div>
  );
}