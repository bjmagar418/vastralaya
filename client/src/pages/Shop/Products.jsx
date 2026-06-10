import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSkeleton from "../../components/ProductSkeleton";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

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
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Active Filter States
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);

  const location = useLocation();
  const dispatch = useDispatch();

  // Redux Sync
  const cartProducts = useSelector((state) => state.cart.products);
  const wishProducts = useSelector((state) => state.wish.products);
  
  const isInCart = (id) => cartProducts.some((item) => item._id === id);
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
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5005/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/products/categories");
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Parsing URL Search Query
  const params = new URLSearchParams(location.search);
  const searchQuery = (params.get("query") || "").toLowerCase().trim();

  // This runs automatically on every state change (clicking filters)
  const filteredProducts = products.filter((product) => {
    // 1. Navbar Search Bar Filter
    const searchMatch =
      searchQuery === "" ||
      product.name?.toLowerCase().includes(searchQuery) ||
      product.category?.toLowerCase().includes(searchQuery);

    // 2. Category Sidebar Filter
    const categoryMatch =
      selectedCategory === "" || product.category === selectedCategory;

    // 3. Color Sidebar Filter
    const colorMatch =
      selectedColor === "" || 
      product.color?.toLowerCase() === selectedColor.toLowerCase();

    // 4. Price Sidebar Filter (Ensuring values are compared as strict Numbers)
    const productPrice = Number(product.price);
    const priceMatch =
      !isNaN(productPrice) &&
      productPrice >= selectedPrice.min && 
      productPrice <= selectedPrice.max;

    return searchMatch && categoryMatch && colorMatch && priceMatch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      {/* LEFT FILTER SIDEBAR */}
      <div className="w-full lg:w-1/4 p-6 h-fit shadow-xl bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>

        {/* CATEGORY */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Category</h3>
          <label className="block mb-2 cursor-pointer flex items-center">
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
            <label key={cat.name} className="block mb-2 cursor-pointer flex items-center">
              <input
                type="radio"
                name="category"
                value={cat.name}
                checked={selectedCategory === cat.name}
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
          <label className="block mb-2 cursor-pointer flex items-center">
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
            <label key={color} className="block mb-2 cursor-pointer flex items-center">
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
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
            <label key={price.label} className="block mb-3 cursor-pointer flex items-center">
              <input
                type="radio"
                name="price"
                // Match checked state explicitly by label property string
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
      <div className="w-full lg:w-3/4">
        <p className="mb-6 text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {!loading && filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400 bg-gray-50 rounded-lg border border-dashed">
            <p className="text-lg font-medium">No items match your selected filter criteria.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
            : filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-4 shadow-xl relative hover:shadow-lg transition bg-white rounded-lg group"
                >
                  {/* CART BUTTON */}
                  <button
                    onClick={(e) => handleAddToCart(product, e)}
                    className={`cursor-pointer absolute top-5 right-5 p-2 rounded-full transition z-10 bg-white/80 shadow-sm ${
                      isInCart(product._id) ? "text-green-500" : "text-black hover:text-red-500"
                    }`}
                  >
                    <FaShoppingCart size={18} />
                  </button>

                  {/* WISHLIST BUTTON */}
                  <button
                    onClick={(e) => handleAddToWish(product, e)}
                    className={`cursor-pointer absolute top-5 left-5 p-2 rounded-full transition z-10 bg-white/80 shadow-sm ${
                      isInWish(product._id) ? "text-red-500" : "text-black hover:text-red-500"
                    }`}
                  >
                    {isInWish(product._id) ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
                  </button>

                  {/* PRODUCT CARD BODY */}
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-md group-hover:scale-[1.02] transition duration-200"
                    />
                    <h2 className="text-lg font-semibold mt-3 text-zinc-900 line-clamp-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-500 text-sm mt-0.5">{product.category}</p>
                    {product.color && (
                      <p className="text-xs text-gray-400 mt-0.5">Color: {product.color}</p>
                    )}
                    <p className="text-zinc-900 font-bold mt-2">NPR {product.price}</p>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Products;