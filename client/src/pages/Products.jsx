import React from "react";

import ProductCard from "../components/ProductCard";

import coat from "../assets/instagram-6.jpg";
import hoodie from "../assets/header.png";
import kurta from "../assets/instagram-4.jpg";
import shirt from "../assets/instagram-1.jpg";
import shoes  from "../assets/instagram-5.jpg";
import shorts from "../assets/instagram-3.jpg";
import tshirt from "../assets/category-1.jpg";
import dress from "../assets/category-2.jpg";

const Products = () => {

  const products = [
    { id: 1, image: coat, title: "Men Coat", price: 1999 },
    { id: 2, image: hoodie, title: "Oversized Hoodie", price: 2999 },
    { id: 3, image: kurta, title: "Traditional Kurta", price: 2499 },
    { id: 4, image: shirt, title: "Casual Shirt", price: 1799 },
    { id: 5, image: shoes, title: "Sports Shoes", price: 2599 },
    { id: 6, image: shorts, title: "summer dress", price: 3499 },
    { id: 7, image: tshirt, title: "Printed T-Shirt", price: 1299 },
    { id: 8, image: dress, title: "Women Summer Dress", price: 2199 },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* Heading */}
      <h1 className="text-3xl md:text-3xl font-bold text-center mb-10  tracking-wide ">
        🛍 Welcome to Vastralaya Shop
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10">

        {products.map((product) => (
          <ProductCard
            key={product.id}
            image={product.image}
            title={product.title}
            price={product.price}
          />
        ))}

      </div>

    </div>
  );
};

export default Products;

