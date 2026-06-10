import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(7);
  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.products);
  const isInCart = (id) => cartProducts.some((item) => item._id === id);

  const wishProducts = useSelector((state) => state.wish.products);
  const isInWish = (id) => wishProducts.some((item) => item._id === id);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    isInCart(product._id)
      ? dispatch(removeFromCart({ id: product._id }))
      : dispatch(addToCart(product));
  };

  const handleAddToWish = (product, e) => {
    e.preventDefault();
    isInWish(product._id)
      ? dispatch(removeFromWish({ id: product._id }))
      : dispatch(addToWish(product));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/products?limit=8",
        );
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="w-full block rounded-lg px-4 sm:px-6 md:px-10 lg:px-12 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-black">
          Trending Products
        </h2>
        <Link
          to="/shop"
          className="text-sm sm:text-base text-black hover:text-red-400"
        >
          View All →
        </Link>
      </div>

      {/* PRODUCTS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.slice(0, 8).map((product) => (
              <div
                key={product._id}
                className="bg-white  p-3 shadow-sm relative w-full flex flex-col justify-between"
              >
                <div>
                  {/* CART BUTTON */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`absolute top-5 right-5 p-3 sm:p-2 rounded-full bg-white/80 backdrop-blur-xs shadow-xs transition z-10 ${
                      isInCart(product._id)
                        ? "text-green-500"
                        : "text-black hover:text-red-500"
                    }`}
                    title={
                      isInCart(product._id) ? "Added to cart" : "Add to cart"
                    }
                  >
                    <FaShoppingCart className="cursor-pointer text-xl sm:text-[18px]" />
                  </button>

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={(e) => handleAddToWish(product, e)}
                    className={`cursor-pointer absolute top-5 left-5 p-3 sm:p-2 rounded-full bg-white/80 backdrop-blur-xs shadow-xs transition z-10 ${
                      isInWish(product._id)
                        ? "text-red-500"
                        : "text-black hover:text-red-500"
                    }`}
                    title={
                      isInWish(product._id)
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                  >
                    {isInWish(product._id) ? (
                      <FaHeart className="cursor-pointer text-xl sm:text-[18px]" />
                    ) : (
                      <FaRegHeart className="cursor-pointer text-xl sm:text-[18px]" />
                    )}
                  </button>
                  
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 sm:h-36 lg:h-44 object-cover rounded-md"
                  />
                  <h2 className="text-base sm:text-lg font-semibold mt-2 line-clamp-1">
                    {product.name}
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500">
                    {product.category}
                  </p>
                </div>
                <p className="text-sm sm:text-base font-bold text-gray-800 mt-1">
                  NPR {product.price}
                </p>
              </div>
            ))}
      </div>
    </section>
  );
};

export default TrendingProducts;