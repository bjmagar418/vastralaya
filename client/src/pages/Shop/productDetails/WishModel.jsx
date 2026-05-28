import { useWish } from "./WishContext";
import { MdLock } from "react-icons/md";
import { FaTrash } from "react-icons/fa";

const DELIVERY_FEE = 129;
const TAX_RATE = 0.13;

const WishModel = ({ onClose }) => {
  const { wish, removeFromWish, changeQty, totalItems } = useWish();

  const subtotal = wish.reduce((s, c) => s + c.price * c.qty, 0);
  const tax = Math.round(subtotal * TAX_RATE);
  const grandTotal = subtotal + DELIVERY_FEE + tax;

  return (
    <div className="fixed inset-0 bg-gray-50 z-50 overflow-y-auto">

      {/* TOP BAR */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span className="hover:text-gray-600 cursor-pointer" onClick={onClose}>Home</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">Wishlist</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-100 transition text-gray-500 text-base"
        >
          ✕
        </button>
      </div>

      {/* PAGE CONTENT */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6">

        <h1 className="text-xl font-semibold text-gray-800 mb-6 text-center sm:text-left">
          Your Wishlist ({totalItems} Item{totalItems !== 1 ? "s" : ""})
        </h1>

        {wish.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-base">Your wishlist is empty</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 items-start">

            {/* LEFT — WISH TABLE */}
            <div className="w-full lg:flex-1 bg-white rounded-xl border border-gray-200 overflow-hidden">

              {/* TABLE HEADER — desktop only */}
              <div className="hidden sm:grid grid-cols-12 px-5 py-3 border-b border-gray-100 bg-gray-50">
                <span className="col-span-5 text-xs font-semibold text-gray-400 uppercase tracking-wide">Product</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Price</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Quantity</span>
                <span className="col-span-2 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Total</span>
                <span className="col-span-1 text-xs font-semibold text-gray-400 uppercase tracking-wide text-center">Action</span>
              </div>

              {wish.map((item) => (
                <div key={item._id} className="border-b border-gray-100 last:border-b-0">

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
                        <span className="inline-block mt-2 text-xs bg-pink-50 text-pink-600 rounded px-2 py-0.5">Wishlisted</span>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm text-gray-700 text-center">
                      NPR {item.price.toLocaleString()}
                    </div>
                    <div className="col-span-2 flex justify-center">
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                        <button onClick={() => changeQty(item._id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">−</button>
                        <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold border-l border-r border-gray-200">{item.qty}</span>
                        <button onClick={() => changeQty(item._id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">+</button>
                      </div>
                    </div>
                    <div className="col-span-2 text-sm font-semibold text-gray-800 text-center">
                      NPR {(item.price * item.qty).toLocaleString()}
                    </div>
                    <div className="col-span-1 flex justify-center">
                      <button onClick={() => removeFromWish(item._id)} className="text-gray-400 hover:text-red-500 transition p-1">
                        <FaTrash size={15} />
                      </button>
                    </div>
                  </div>

                  {/* MOBILE ROW */}
                  <div className="sm:hidden px-4 py-4">
                    <div className="flex items-start gap-4 max-w-sm mx-auto">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-20 h-20 rounded-lg object-cover border border-gray-100 bg-gray-50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                            {item.color && (
                              <p className="text-xs text-gray-400 mt-0.5">Color: {item.color}</p>
                            )}
                            <span className="inline-block mt-1 text-xs bg-pink-50 text-pink-600 rounded px-2 py-0.5">Wishlisted</span>
                          </div>
                          <button onClick={() => removeFromWish(item._id)} className="text-gray-300 hover:text-red-500 transition flex-shrink-0 mt-0.5">
                            <FaTrash size={14} />
                          </button>
                        </div>

                        <p className="text-sm text-green-600 font-medium mt-2">
                          NPR {item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button onClick={() => changeQty(item._id, -1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">−</button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-semibold border-l border-r border-gray-200">{item.qty}</span>
                            <button onClick={() => changeQty(item._id, 1)} className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition">+</button>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">
                            NPR {(item.price * item.qty).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>

            {/* RIGHT — ORDER SUMMARY */}
            <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-72 bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Order Summary</h2>

              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span className="text-gray-700">NPR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Delivery Fee</span>
                <span className="text-gray-700">NPR {DELIVERY_FEE}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Tax (13%)</span>
                <span className="text-gray-700">NPR {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 border-t border-gray-100 pt-3 mt-1">
                <span>Grand Total</span>
                <span>NPR {grandTotal.toLocaleString()}</span>
              </div>

              <button className="mt-5 w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition">
                <MdLock size={16} />
                Proceed to Checkout
              </button>

              <p className="text-xs text-gray-400 mt-4 mb-2">We Accept</p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs border border-green-600 text-green-700 rounded px-2 py-1">eSewa</span>
                <span className="text-xs border border-purple-600 text-purple-700 rounded px-2 py-1">Khalti</span>
                <span className="text-xs border border-indigo-500 text-indigo-600 rounded px-2 py-1">Stripe</span>
                <span className="text-xs border border-gray-300 text-gray-500 rounded px-2 py-1">COD</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default WishModel;