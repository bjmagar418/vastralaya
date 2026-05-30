import React, { useState } from "react";

export default function ProductCard({ product, isLoading }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // --- SKELETON LOADER VERSION ---
  if (isLoading) {
    return (
      <div className="border border-gray-100 rounded-xl overflow-hidden shadow-xs bg-white animate-pulse">
        <div className="aspect-[4/5] bg-gray-200 w-full" />
        <div className="p-4 flex flex-col gap-3">
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-200 rounded w-12" />
            <div className="h-3 bg-gray-200 rounded w-16" />
          </div>
          <div className="h-4 bg-gray-200 rounded w-5/6" />
          <div className="h-5 bg-gray-200 rounded w-1/3 mt-1" />
        </div>
      </div>
    );
  }

  // --- STANDARD INTERACTIVE CARD ---
  return (
    <div className="group relative bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      
      {/* Visual Asset Wrapper */}
      <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-gray-800 px-2.5 py-1 rounded-md shadow-xs pointer-events-none capitalize">
          {product.subcategory}
        </span>

        {/* Wishlist Heart Icon Toggle */}
        <button
          type="button"
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-xs text-gray-400 hover:text-rose-500 transition-colors duration-200 focus:outline-none z-10"
        >
          <i
            className={`${
              isWishlisted ? "ri-heart-fill text-rose-500" : "ri-heart-line"
            } text-lg`}
          ></i>
        </button>
      </div>

      {/* Product Information Body */}
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
            {product.gender}
          </span>
          
          {/* Stock Status Label */}
          <span
            className={`text-[11px] font-medium ${
              product.inStock 
                ? "text-emerald-600 bg-emerald-50/50 px-1.5 py-0.5 rounded" 
                : "text-rose-500 bg-rose-50 px-1.5 py-0.5 rounded"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <h3 className="font-medium text-gray-800 text-sm line-clamp-1 group-hover:text-gray-900 transition-colors">
          {product.name}
        </h3>

        <p className="text-base font-bold text-gray-900">
          NPR {product.price.toLocaleString()}
        </p>
      </div>
    </div>
  );
}