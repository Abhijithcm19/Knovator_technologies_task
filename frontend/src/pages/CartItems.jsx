import React, { useState, useEffect } from "react";

const CartItems = () => {
  const [cartItems, setCartItems] = useState([]);
  const [allTotalAmount, setAllTotalAmount] = useState("");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [orderMessage, setOrderMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:4000/store/cart");
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        setCartItems(data.cartItems);
        setAllTotalAmount(data.allTotalAmount);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch cart items");
      }
    };
  
    fetchCartItems();
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError(null);
    if (!firstName || !lastName || !address) {
      setError("Please fill out all fields");
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/store/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          address,
          totalAmount: allTotalAmount, 
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to place order");
      }
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");    }
  };

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="flex flex-col">
        <div className="flex justify-between border-b border-gray-300 py-2 gap-1">
          <div className="flex-1">Product</div>
          <div className="w-16 text-right">Price</div>
          <div className="w-16 text-right">Quantity</div>
        </div>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex justify-between items-center border-b border-gray-300 py-2"
          >
            <div className="flex-1 flex items-center">
              <img
                src={item.productId.image}
                alt={item.productId.name}
                className="mr-2 w-16 h-16"
              />
              <div>
                <p className="font-bold text-sm">{item.productId.name}</p>
                <p className="text-gray-500 text-xs">
                  {item.productId.description}
                </p>
              </div>
            </div>
            <div className="w-16 text-right">${item.productId.price}</div>

            <div className="w-16 text-right">${item.quantity}</div>
          </div>
        ))}
      </div>

      <div className="text-end">
       
        <h1 className="text-2xl py-4">Total Price{allTotalAmount}</h1>
      </div>

      <div className="mt-1">
        <h2 className="text-lg font-bold mb-2">Checkout</h2>
        <form onSubmit={handlePlaceOrder}>
          <div className="mb-2">
            <label htmlFor="firstName" className="block text-sm font-bold mb-1">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Enter your first name"
              className="w-full p-1 border border-gray-300 rounded"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="lastName" className="block text-sm font-bold mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Enter your last name"
              className="w-full p-1 border border-gray-300 rounded"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="block text-sm font-bold mb-1">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              className="w-full p-1 border border-gray-300 rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-1 px-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartItems;
