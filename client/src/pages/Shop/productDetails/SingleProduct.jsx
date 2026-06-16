import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaStar, FaRegUser, FaEnvelope, FaRegHeart } from "react-icons/fa"; // Added heart icon
import { useDispatch } from "react-redux";

// Redux Core Hook Implementations
import { useFetchProductsByIdQuery } from "../../../redux/features/products/productsApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { addToWish } from "../../../redux/features/wish/wishSlice"; // 👈 Ensure this file path and slice name match your project

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // 1. RTK Query hook handles loading, error, and caching automatically
  const { data, error, isLoading } = useFetchProductsByIdQuery(id);

  // 2. Maps directly to your backend response object
  const singleProduct = data || {}; 

  // Local Review/Modal States
  const [showModal, setShowModal] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(4);
  const [comment, setComment] = useState("");

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  // 3. New Wishlist handler
  const handleAddToWishlist = (product, e) => {
    e.stopPropagation();
    dispatch(addToWish(product));
  };

  // State feedback handling
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-500 font-medium animate-pulse">Loading Product Details...</div>
      </div>
    );
  }

  if (error || !data || !singleProduct._id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500 font-medium">Product Not Found or Error loading details</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8">
      {/* BREADCRUMB HERO SECTION */}
      <div className="bg-gray-100 min-h-[180px] flex flex-col items-center justify-center py-8 rounded-xl mb-8 shadow-sm">
        <h2 className="mb-2 text-2xl md:text-4xl font-extrabold font-serif text-gray-900 px-4 capitalize">
          {singleProduct.name}
        </h2>
        <div className="flex items-center gap-2 text-sm md:text-base text-gray-600">
          <Link to="/" className="hover:text-red-500 transition">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-red-500 transition">Shop</Link>
          <span>/</span>
          <span className="font-medium text-gray-800 truncate max-w-[200px]">
            {singleProduct.name}
          </span>
        </div>
      </div>

      {/* MAIN PRODUCT DETAIL GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-4">
        {/* IMAGE SECTION */}
        <div className="flex justify-center items-start">
          <img
            src={singleProduct.imageUrl}
            alt={singleProduct.name}
            className="w-full max-h-[500px] object-cover rounded-xl shadow-lg border border-gray-100"
          />
        </div>

        {/* DETAILS INFO PANEL */}
        <div className="flex flex-col justify-between">
          <div>
            {/* Brand Accent */}
            {singleProduct.brand && (
              <span className="inline-block bg-red-50 text-red-600 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-3">
                {singleProduct.brand}
              </span>
            )}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{singleProduct.name}</h1>

            {/* Rating Metric */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-yellow-400 gap-0.5">
                <FaStar />
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {singleProduct.rating ? singleProduct.rating.toFixed(1) : "0.0"}
              </span>
              <span className="text-xs text-gray-400">Rating</span>
            </div>

            {/* Price Display */}
            <p className="text-3xl text-red-500 font-bold mb-6">
              NPR {singleProduct.price?.toLocaleString()}
            </p>

            <hr className="border-gray-200 mb-6" />

            {/* Description */}
            <h3 className="text-sm font-semibold uppercase text-gray-400 tracking-wider mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed mb-6">{singleProduct.description}</p>

            {/* Meta Attributes */}
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
              {singleProduct.category && (
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Category:</span>{" "}
                  <span className="capitalize">{singleProduct.category}</span>
                </div>
              )}

              {singleProduct.color && (
                <div className="text-sm text-gray-700">
                  <span className="font-semibold text-gray-900">Color:</span>{" "}
                  <span className="capitalize">{singleProduct.color}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Trigger Buttons Container */}
          <div className="flex flex-col gap-3">
            {/* Add To Cart Button */}
            <button
              onClick={(e) => handleAddToCart(singleProduct, e)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] cursor-pointer text-center"
            >
              Add To Cart
            </button>

            {/* Add To Wishlist Button */}
            <button
              onClick={(e) => handleAddToWishlist(singleProduct, e)}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all transform active:scale-[0.98] cursor-pointer text-center"

>
              Add To Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;