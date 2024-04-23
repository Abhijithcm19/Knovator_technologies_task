import React, { useState } from "react";
import { FiThumbsUp } from "react-icons/fi";

const Card = ({ product }) => {
  const [addToCartMessage, setAddToCartMessage] = useState("");

  const handleAddToCart = async () => {
    try {
      const response = await fetch("http://localhost:4000/store/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1, 
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }
      const data = await response.json();
      alert(data.message); 
    } catch (error) {
      console.error(error);
      alert("Failed to add product to cart");
    }
  };
  
  return (
    <div className="group cursor-pointer hover:shadow-slate-400 shadow-md rounded-lg border border-slate-400 m-2 transition-shadow duration-200" style={{ width: "300px" }}>
      <img src={product.image} alt={product.name} className="rounded-t-lg group-hover:opacity-75 transition-opacity duration-300" style={{ width: "300px", height: "200px" }} />
      <div className="p-2">
        <h2 className="text-lg font-bold truncate">{product.name}</h2>
        <p className="text-md mb-2">{product.description}</p>
        <p className="text-lg font-bold">${product.price}</p>
        <button onClick={handleAddToCart} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2">Add to Cart</button>
        {addToCartMessage && <p>{addToCartMessage}</p>}
      </div>
    </div>
  );
};

export default Card;
