import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/products/category/${category}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  return (
    <div>
      <h1 className="text-center text-md font-bold mb-2 p-4">
        Featured Category
      </h1>
      <h2 className="text-center text-xl font-semibold mb-6 capitalize">
        {category}
      </h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4    md:p-5">     
     {products.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg shadow p-8 flex flex-col gap-2  "
          >
            {/* Cart button fixed inside relative card */}
            <button
              className="absolute top-3 right-3 text-black p- rounded-full hover:text-red-500 cursor-pointer transition sm:active:text-red-500"
            >
              <FaShoppingCart size={18} />
            </button>

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 sm:h-48 md:h-52 object-cover rounded"
            />
            <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base">NPR. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;