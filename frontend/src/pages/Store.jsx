import React, { useState, useEffect } from "react";
import Card from "../components/Card";

const Store = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/store/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);
  console.log("products : ", products);
  return (
    <div className="text-center">
      <h1 className="mb-8 my-6 text-3xl font-bold">Products</h1>

      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Store;
