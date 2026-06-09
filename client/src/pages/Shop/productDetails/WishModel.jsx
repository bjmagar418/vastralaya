
import React from "react";
import { MdLock } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {useSelector} from 'react-redux';
import WishOrderSummary from '../../Shop/productDetails/WishOrderSummary';
import { removeFromWish,  updateWishQuantity } from "../../../redux/features/wish/wishSlice";
import { FaHeart } from "react-icons/fa";

const WishModel = ({products,isOpen, onClose }) => {
 
const dispatch = useDispatch();

const handleQuantity = (type,id) =>{
const payload = {type,id};
dispatch( updateWishQuantity(payload));
}

const handelRemove = (e,id) =>{
  e.preventDefault();
  dispatch( removeFromWish({id}))
}
  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">

      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="hover:text-gray-600 cursor-pointer" onClick={onClose}>Shop</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">Your Wislist</span>
        </div>
        <button
          onClick={onClose}
          className="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition text-gray-500 text-base"
        >
          ✕
        </button>
      </div>

      {/* PAGE CONTENT — centered on all screen sizes */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">

        <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Your Wishlist ({products.length} Item{products.length !== 1 ? "s" : ""})
        </h1>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
           <FaHeart  className="h-24 w-24 opacity-20" />
            <p className="text-base">Your cart is empty</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* LEFT — CART TABLE */}
            <div className="w-full lg:flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">

              {/* TABLE HEADER — desktop only */}
              <div className="hidden sm:grid grid-cols-12 px-5 py-3 border-b border-gray-100 bg-gray-50">
                <span className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Product</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Price</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Quantity</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Total</span>
                <span className="col-span-1 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Action</span>
              </div>

              {products.map((item,index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">

                  {/* DESKTOP ROW */}
                  <div className="hidden sm:grid grid-cols-12 px-5 py-4 items-center">
                    <div className="col-span-5 flex items-center gap-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.color && <>Color: {item.color} &nbsp;|&nbsp;</>}{item.category}
                        </p>
                        <span className="inline-block mt-2 text-xs bg-green-50 text-green-700 rounded px-2 py-0.5">In Stock</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-gray-700 text-center">
                      NPR {item.price.toFixed(2)}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => handleQuantity('decrement',item._id)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">−</button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold border-l border-r border-gray-200">{item.quantity}</span>
                        <button onClick={() => handleQuantity('increment',item._id)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">+</button>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm font-semibold text-gray-800 text-center">
                      NPR {(item.price * item.quantity).toFixed(2)}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button onClick={(e) =>  handelRemove(e,item._id)} className="text-gray-400 hover:text-red-500 transition p-1">
                        <FaTrash size={15}  className= "cursor-pointer"/>
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* RIGHT — ORDER SUMMARY */}
                  {products.length > 0 && <WishOrderSummary/>}

          </div>
        )}
      </div>
    </div>
  );
};

export default WishModel;