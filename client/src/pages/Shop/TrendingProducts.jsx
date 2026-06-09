<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import axios from "axios";
import { FaShoppingCart } from "react-icons/fa";
import ProductSkeleton from "../../components/ProductSkeleton";
import { useDispatch, useSelector } from "react-redux";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { addToWish,removeFromWish } from "../../redux/features/wish/wishSlice";





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

const handleAddToWish = (product, e) =>{
  e.preventDefault();
  isInWish(product._id)
    ? dispatch( removeFromWish({ id: product._id }))
    : dispatch( addToWish(product));
}
  


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
                                       {/* CART BUTTON */}
                                                     <button
                                                      onClick={(e) => handleAddToCart(product, e)}
                                                       className={`absolute top-3 right-3 p-2 rounded-full transition z-10 ${
                                                         isInCart(product._id)
                                                           ? "text-green-500"
                                                           : "text-black hover:text-red-500"
                                                       }`}
                                                       title={
                                                         isInCart(product._id) ? "Added to cart" : "Add to cart"
                                                       }
                                                     >
                                                       <FaShoppingCart size={18} className="cursor-pointer" />
                                                     </button>

                                    {/* WISHLIST BUTTON — top left */}
                                                  {/* WISHLIST BUTTON */}
                                                                  <button
                                                                   onClick={(e) => handleAddToWish(product, e)}
                                                                    className={`cursor-pointer absolute top-3 left-3 p-2 rounded-full transition z-10 ${
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
                                                                      <FaHeart size={18} className="cursor-pointer" />
                                                                    ) : (
                                                                      <FaRegHeart size={18} className="cursor-pointer" />
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
=======
import React, { useState } from 'react';
import ProductCards from '../../pages/Shop/ProductCards';
import products from '../../data/product.json';


const TrendingProducts = () => {
  const [visibleProducts,setVisibleProducts]=useState(7);
  const loadMoreProducts =()=>{
  setVisibleProducts(prevCount => prevCount + 4);
  }

  return (
    <section className='w- full section__container  grid  grid-cols-3 '>
      <h2 className='section__header col-span-2'>Trending Products</h2>
    {/*products card*/}
    <div className='col-span-3 row-span-3 row-start-2'>
    <ProductCards products={products.slice(0,visibleProducts)}/>
    </div>
          {/*load more products btn*/}
   <div className='product__btn  '>
  {
    visibleProducts <products.length &&(
      <button className='cursor-pointer ' onClick={loadMoreProducts}><span className='hover:text-red-500'>View All <i className="ri-arrow-right-line"></i></span></button>
    )
  }
   </div>

    </section>
  )
}

export default TrendingProducts;
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
