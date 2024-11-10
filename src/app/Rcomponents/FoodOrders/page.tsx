import { useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

type ConfirmedOrder = {
  roomNo: string;
  customerName: string;
  items: CartItem[];
};

export default function FoodOrders() {
  const foodItems: CartItem[] = [
    { id: 1, name: 'Pizza', price: 500, image: '/pizza.jpeg', quantity: 0 },
    { id: 2, name: 'Burger', price: 300, image: '/burger.jpg', quantity: 0 },
    { id: 3, name: 'Pasta', price: 400, image: '/pasta.jpeg', quantity: 0 },
  ];

  const [cart, setCart] = useState<CartItem[]>([]);
  const [confirmedOrders, setConfirmedOrders] = useState<ConfirmedOrder[]>([]);
  const [roomNo, setRoomNo] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: number) => {
    setCart(
      cart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const onConfirmOrder = () => {
    if (cart.length > 0 && roomNo && customerName) {
      // Check if an order with the same room number and customer name already exists
      const existingOrderIndex = confirmedOrders.findIndex(
        (order) => order.roomNo === roomNo && order.customerName === customerName
      );
  
      if (existingOrderIndex !== -1) {
        // Update the existing order's items
        const updatedOrders = [...confirmedOrders];
        updatedOrders[existingOrderIndex].items = cart;
        setConfirmedOrders(updatedOrders);
      } else {
        // Add a new order if no matching order is found
        setConfirmedOrders([
          ...confirmedOrders,
          { roomNo, customerName, items: cart },
        ]);
      }
  
      // Clear the cart and reset form fields
      setCart([]);
      setRoomNo('');
      setCustomerName('');
      setOrderConfirmed(true);
      setTimeout(() => setOrderConfirmed(false), 3000); // Hide message after 3 seconds
    }
  };
  
  const editOrder = (order: ConfirmedOrder) => {
    // Populate cart with items from the selected order
    setCart(order.items);
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
            <select
              name="roomNo"
              value={roomNo}
              onChange={(e) => setRoomNo(e.target.value)}
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
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
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Robert Wilson"
              className="w-full border rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring focus:ring-gray-300"
            />
          </div>
        </form>

{/* Display food items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodItems.map((item) => (
              <div
                key={item.id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-2"
                />
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Price: NPR {item.price}</p>
                <button
                  className="mt-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                  onClick={() => addToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

{/* Right Section - Cart */}
        <div className="w-1/3 p-4 bg-white rounded-lg">
          <h2 className="text-lg font-bold mb-4">Orders</h2>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your order is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Price: NPR {item.price} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="text-gray-900 px-2"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button
                      className="text-gray-900 px-2"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 ml-4"
                      onClick={() => removeFromCart(item.id)}
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
          <th className="border px-4 py-2">Order No</th>
          <th className="border px-4 py-2">Room No</th>
          <th className="border px-4 py-2">Customer Name</th>
          <th className="border px-4 py-2">Items with Quantity</th>
          <th className="border px-4 py-2">Total Price</th>
          <th className="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {confirmedOrders.map((order, index) => {
          // Calculate the total price for the entire order
          const totalOrderPrice = order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          // Generate a string for items and their quantities
          const itemsList = order.items
            .map((item) => `${item.name} (x${item.quantity})`)
            .join(', ');

          return (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{order.roomNo}</td>
              <td className="border px-4 py-2">{order.customerName}</td>
              <td className="border px-4 py-2">{itemsList}</td>
              <td className="border px-4 py-2">NPR {totalOrderPrice}</td>
              <td className="border px-4 py-2">
              <a href="#" className="text-gray-900 hover:text-gray-700 mr-2" 
              onClick={() => editOrder(order)}>Edit</a>
              <a href="#" className="text-red-600 hover:text-red-700 mr-2">Delete</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
)}
    </div>
  );
}
