import React, { useState, useEffect } from "react";
import ProductSkeleton from "../../components/ProductSkeleton";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

// Import your RTK Query hooks
import { 
  useFetchAllProductsQuery, 
  useFetchCategoriesQuery 
} from "../../redux/features/products/productsApi"; 

const colorOptions = [
  "Black",
  "White",
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Gray",
  "Brown",
];

const priceOptions = [
  { label: "All", min: 0, max: Infinity },
  { label: "Under NPR 500", min: 0, max: 500 },
  { label: "NPR 500 - 1000", min: 500, max: 1000 },
  { label: "NPR 1000 - 2000", min: 1000, max: 2000 },
  { label: "NPR 2000 & Above", min: 2000, max: Infinity },
];

const Products = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  // Active Filter & Pagination States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; 

  // Parse Navbar Search Query from URL
  const params = new URLSearchParams(location.search);
  const searchQuery = (params.get("query") || "").toLowerCase().trim();

  // Reset page to 1 whenever any filter or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedColor, selectedPrice, searchQuery]);

  // 1. Fetch your main paginated & filtered products
  const { data, isLoading, error } = useFetchAllProductsQuery({
    name: searchQuery,
    category: selectedCategory,
    color: selectedColor,
    min: selectedPrice.min === 0 ? "" : selectedPrice.min,
    max: selectedPrice.max === Infinity ? "" : selectedPrice.max,
    page: currentPage,
    limit: productsPerPage,
  });

  // 2. Fetch ALL global categories from the backend independently
  const { data: globalCategoriesData } = useFetchCategoriesQuery();

  // --- SAFE DATA PARSING ---
  const products = Array.isArray(data?.products) ? data.products : [];

  // Parse, capitalize, and remove duplicate categories dynamically
  const categories = (() => {
    // Backend returns: { success: true, categories: [...] }
    const rawCategories =
      globalCategoriesData?.categories && Array.isArray(globalCategoriesData.categories)
        ? globalCategoriesData.categories
        : Array.isArray(globalCategoriesData)
          ? globalCategoriesData
          : [];

    const cleanedCategories = rawCategories
      .map((cat) => {
        if (typeof cat === "string") return cat.trim();
        if (cat && typeof cat === "object") return (cat.name || "").trim();
        return "";
      })
      .filter(Boolean);

    const uniqueCategoryNames = [...new Set(cleanedCategories)];

    return uniqueCategoryNames.map((name) => ({
      name,
      id: name.toLowerCase(),
    }));
  })();

  // Redux Sync
  const cartProducts = useSelector((state) => state.cart?.products || []);
  const wishProducts = useSelector((state) => state.wish?.products || []);
  
  const isInCart = (id) => cartProducts.some((item) => item?._id === id);
  const isInWish = (id) => wishProducts.some((item) => item?._id === id);

  // Early Error Handler Return
  if (error) {
    console.error("Products API Error:", error);
    return (
      <div className="flex items-center justify-center py-16 text-red-500">
        <p className="text-lg font-medium">Failed to load products. Please try again later.</p>
        <p className="text-sm mt-2">Error: {error?.status || 'Unknown'} - {error?.data?.message || error?.error || 'Check console for details'}</p>
      </div>
    );
  }

  // Backend tracking variables
  const totalProductsCount = data?.totalProducts || products.length; 
  const totalPages = data?.totalPages || Math.ceil(totalProductsCount / productsPerPage);

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

  // Frontend matching safety layout check
  const displayedProducts = products.filter((product) => {
    if (!product) return false;
    return (
      searchQuery === "" ||
      product.name?.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery)
    );
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-8">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-full lg:w-1/4 p-6 h-fit shadow-xl bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>

        {/* CATEGORY */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Category</h3>
          <label className="block mb-2 cursor-pointer  items-center">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => setSelectedCategory("")}
              className="mr-2 accent-red-600"
            />
            All
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="block mb-2 cursor-pointer  items-center">
              <input
                type="radio"
                name="category"
                value={cat.name.toLowerCase()} 
                checked={selectedCategory === cat.name.toLowerCase()} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2 accent-red-600"
              />
              {cat.name}
            </label>
          ))}
        </div>

        {/* COLOR */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Color</h3>
          <label className="block mb-2 cursor-pointer  items-center">
            <input
              type="radio"
              name="color"
              checked={selectedColor === ""}
              onChange={() => setSelectedColor("")}
              className="mr-2 accent-red-600"
            />
            All
          </label>
          {colorOptions.map((color) => (
            <label key={color} className="block mb-2 cursor-pointer  items-center">
              <input
                type="radio"
                name="color"
                value={color.toLowerCase()}
                checked={selectedColor === color.toLowerCase()}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mr-2 accent-red-600"
              />
              {color}
            </label>
          ))}
        </div>

        {/* PRICE RANGE */}
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          {priceOptions.map((price) => (
            <label key={price.label} className="block mb-3 cursor-pointer  items-center">
              <input
                type="radio"
                name="price"
                checked={selectedPrice.label === price.label}
                onChange={() => setSelectedPrice(price)}
                className="mr-2 accent-red-600"
              />
              {price.label}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCT SECTION GRID */}
      <div className="w-full lg:w-3/4  flex-col justify-between">
        <div>
          <p className="mb-6 text-gray-600">
            Showing {isLoading ? 0 : displayedProducts.length} items of page {currentPage}
          </p>

          {!isLoading && displayedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-gray-50 rounded-lg border border-dashed">
              <p className="text-lg font-medium">No items match your selected filter criteria.</p>
            </div>
          )}

          {/* GRID LAYOUT */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {isLoading
              ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
              : displayedProducts.map((product) => (
                  <div
                    key={product._id}
                    className="p-3 sm:p-4 shadow-xl relative hover:shadow-lg transition bg-white rounded-lg group"
                  >
                    {/* CART BUTTON */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className={`cursor-pointer absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full transition z-10 bg-white/80 shadow-sm ${
                        isInCart(product._id) ? "text-green-500" : "text-black hover:text-red-500"
                      }`}
                    >
                      <FaShoppingCart size={16} />
                    </button>

                    {/* WISHLIST BUTTON */}
                    <button
                      onClick={(e) => handleAddToWish(product, e)}
                      className={`cursor-pointer absolute top-3 left-3 sm:top-5 sm:left-5 p-2 rounded-full transition z-10 bg-white/80 shadow-sm ${
                        isInWish(product._id) ? "text-red-500" : "text-black hover:text-red-500"
                      }`}
                    >
                      {isInWish(product._id) ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                    </button>

                    {/* PRODUCT CARD BODY */}
                    <Link to={`/products/${product._id}`}>
                        <img
                        src={product.imageUrl ? (
                          product.imageUrl.startsWith("http")
                            ? product.imageUrl
                            : product.imageUrl.startsWith("/")
                              ? `${import.meta.env.VITE_API_BASE_URL || ""}${product.imageUrl}`
                              : product.imageUrl
                        ) : undefined}
                        alt={product.name}
                        loading="lazy"
                        onError={(e) => {
                          // Fallback for bad/relative image URLs
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = "data:image/svg+xml;charset=utf-8," +
                            encodeURIComponent(
                              `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
                                 <rect width="600" height="600" fill="#f3f4f6"/>
                                 <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="28" fill="#111827">No Image</text>
                               </svg>`
                            );
                        }}
                        className="w-full h-36 sm:h-52 object-cover rounded-md group-hover:scale-[1.02] transition duration-200"
                      />
                      <h2 className="text-sm sm:text-lg font-semibold mt-3 text-zinc-900 line-clamp-1">
                        {product.name}
                      </h2>
                      <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
                        {/* Dynamic category text transformation formatting */}
                        {product.category ? product.category.charAt(0).toUpperCase() + product.category.slice(1) : ""}
                      </p>
                      {product.color && (
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">
                          Color: {product.color.charAt(0).toUpperCase() + product.color.slice(1)}
                        </p>
                      )}
                      <p className="text-zinc-900 font-bold mt-2 text-sm sm:text-base">NPR {product.price}</p>
                    </Link>
                  </div>
                ))}
          </div>
        </div>

        {/* --- DYNAMIC PAGINATION SECTION --- */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 py-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 border rounded-md text-sm font-medium transition ${
                    currentPage === pageNum
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md text-sm bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;