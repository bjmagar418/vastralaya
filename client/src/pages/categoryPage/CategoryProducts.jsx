import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaRegHeart } from "react-icons/fa"; 
import { useDispatch } from "react-redux";
// Import your Redux actions here
// import { addToCart } from "../../redux/features/cart/cartSlice";
// import { addToWishlist } from "../../redux/features/wishlist/wishlistSlice";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

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

  const handleAddToCart = (product) => {
    // dispatch(addToCart(product));
    console.log("Added to cart:", product.name);
  };

  const handleAddToWishlist = (product) => {
    // dispatch(addToWishlist(product));
    console.log("Added to wishlist:", product.name);
  };

  return (
    <div>
      <h1 className="text-center text-md font-bold mb-2 p-4">
        Featured Category
      </h1>
      <h2 className="text-center text-xl font-semibold mb-6 capitalize">
        {category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-5"> 
        {products.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg shadow p-4 flex flex-col gap-2 bg-white group hover:shadow-md transition"
          >
            
            {/* Heart / Wishlist Button (Top Left Corner) */}
            <button
              onClick={() => handleAddToWishlist(product)}
              className="absolute top-5 left-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-black hover:text-red-500 shadow-sm cursor-pointer transition"
              title="Add to Wishlist"
            >
              <FaRegHeart size={18} />
            </button>

            {/* Cart Button (Top Right Corner) */}
            <button
              onClick={() => handleAddToCart(product)}
              className="absolute top-5 right-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-black hover:text-blue-600 shadow-sm cursor-pointer transition"
              title="Add to Cart"
            >
              <FaShoppingCart size={18} />
            </button>

            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 sm:h-48 md:h-52 object-cover rounded hover:scale-102 transition duration-300"
            />
            
            {/* Product Info */}
            <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
              {product.name}
            </h3>
            <p className="text-sm sm:text-base font-bold text-gray-700">NPR. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;