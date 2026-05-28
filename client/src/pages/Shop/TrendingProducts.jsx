import React, { useEffect, useState } from "react";
// import products from '../../data/product.json';
import { Link } from "react-router";

import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import ProductSkeleton from "../../components/ProductSkeleton";

import { useCart } from "../Shop/productDetails/CartContext";
import { useWish } from "../Shop/productDetails/WishContext";
import { FaHeart, FaRegHeart } from "react-icons/fa";




const TrendingProducts = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

  const [visibleProducts, setVisibleProducts] = useState(7);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

    const { addToWish, removeFromWish, wish } = useWish();
    const isInWish = (id) => wish.some((item) => item._id === id);

    const { addToCart, removeFromCart,cart } = useCart();
  
    const isInCart = (id) => cart.some((item) => item._id === id);

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
  <section className="w-full rounded-lg p-4 sm:p-5 lg:p-6 flex flex-col">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-4 sm:mb-6">
      <h2 className="text-base sm:text-lg lg:text-xl font-semibold text-black">
        Trending Products
      </h2>
      <Link to="/shop" className="text-sm sm:text-base text-black hover:text-red-400">
        View All →
      </Link>
    </div>

    {/* PRODUCTS GRID - 2 cols mobile, 3 tablet, 4 laptop */}
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 ">
      {loading
        ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
        : products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              className="bg-white border rounded-lg p-2 shadow-sm relative w-full "
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
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-28 sm:h-36 lg:h-44 object-cover rounded-md"
              />
              <h2 className="text-base sm:text-lg  font-semibold mt-2 line-clamp-1">
                {product.name}
              </h2>
              <p className="text-[16px] sm:text-lg text-gray-500">{product.category}</p>
              <p className="text-xs sm:text-sm font-bold text-gray-800">NPR{product.price}</p>
            </div>
          ))}
    </div>
  </section>
);
};

export default TrendingProducts;
