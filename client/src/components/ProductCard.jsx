import React from "react";

const ProductCard = ({ image, title, price }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">

      {/* Product Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-72 object-cover"
      />

      {/* Product Info */}
      <div className="p-4">

        {/* Title */}
        <h2 className="text-lg font-semibold">
          {title}
        </h2>

        {/* Price */}
        <p className="text-xl font-bold mt-2">
          Rs. {price}
        </p>

        {/* Button */}
        <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition">
          Add to Cart
        </button>

      </div>
    </div>
  );
};

export default ProductCard;

