import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductSkeleton from "../../components/ProductSkeleton";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../Shop/productDetails/CartContext";
import { useWish } from "../Shop/productDetails/WishContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";

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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(priceOptions[0]);

  const { addToWish, removeFromWish, wish } = useWish();
  const isInWish = (id) => wish.some((item) => item._id === id);

  const { addToCart,removeFromCart, cart } = useCart();

  const isInCart = (id) => cart.some((item) => item._id === id);

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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/products/categories",
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategory === "" || product.category === selectedCategory;
    const colorMatch = selectedColor === "" || product.color === selectedColor;
    const priceMatch =
      product.price >= selectedPrice.min && product.price <= selectedPrice.max;
    return categoryMatch && colorMatch && priceMatch;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-8">
      {/* LEFT FILTER SECTION */}
      <div className="w-full lg:w-1/4 p-6 h-fit shadow-xl">
        <h2 className="text-xl font-semibold mb-6">Filters</h2>

        {/* CATEGORY FILTER */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Category</h3>
          <label className="block mb-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ""}
              onChange={() => setSelectedCategory("")}
              className="mr-2"
            />
            All
          </label>
          {categories.map((cat) => (
            <label key={cat.name} className="block mb-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={cat.name}
                checked={selectedCategory === cat.name}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mr-2"
              />
              {cat.name}
            </label>
          ))}
        </div>

        {/* COLOR FILTER */}
        <div className="mb-8">
          <h3 className="font-semibold mb-4">Color</h3>
          <label className="block mb-2 cursor-pointer">
            <input
              type="radio"
              name="color"
              checked={selectedColor === ""}
              onChange={() => setSelectedColor("")}
              className="mr-2"
            />
            All
          </label>
          {colorOptions.map((color) => (
            <label key={color} className="block mb-2 cursor-pointer">
              <input
                type="radio"
                name="color"
                value={color}
                checked={selectedColor === color}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="mr-2"
              />
              {color}
            </label>
          ))}
        </div>

        {/* PRICE FILTER */}
        <div>
          <h3 className="font-semibold mb-4">Price Range</h3>
          {priceOptions.map((price) => (
            <label key={price.label} className="block mb-3 cursor-pointer">
              <input
                type="radio"
                name="price"
                checked={selectedPrice.label === price.label}
                onChange={() => setSelectedPrice(price)}
                className="mr-2"
              />
              {price.label}
            </label>
          ))}
        </div>
      </div>

      {/* RIGHT PRODUCT SECTION */}
      <div className="w-full lg:w-3/4">
        <p className="mb-6 text-gray-600">
          Showing {filteredProducts.length} of {products.length} products
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))
            : filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="p-4 shadow-xl relative hover:shadow-lg transition"
                >
                  {/* CART BUTTON — clicking adds to cart, turns green when already added */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                       isInCart(product._id)
                        ? removeFromCart(product._id)
                        : addToCart(product);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition z-10 ${
                      isInCart(product._id)
                        ? "text-green-500"
                        : "text-black hover:text-red-500"
                    }`}
                    title={
                      isInCart(product._id) ? "Added to cart" : "Add to cart"
                    }
                  >
                    <FaShoppingCart size={18} />
                  </button>

                  {/*wish list */}

                  {/* WISHLIST BUTTON — top left */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      isInWish(product._id)
                        ? removeFromWish(product._id)
                        : addToWish(product);
                    }}
                    className={`absolute top-3 left-3 p-2 rounded-full transition z-10 ${
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
                      <FaHeart size={18} />
                    ) : (
                      <FaRegHeart size={18} />
                    )}
                  </button>
                  {/* PRODUCT LINK */}
                  <Link to={`/products/${product._id}`}>
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-md"
                    />
                    <h2 className="text-lg font-semibold mt-3">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 mt-1">{product.category}</p>
                    {product.color && (
                      <p className="text-sm text-gray-500 mt-1">
                        Color: {product.color}
                      </p>
                    )}
                    <p className="text-gray-800 font-medium mt-1">
                      NPR {product.price}
                    </p>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
