import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearWish } from '../../../redux/features/wish/wishSlice';


const WishOrderSummary = () => {
  
  const products = useSelector((store) => store.wish.products);
  const {selectedItems,tax,taxRate,totalPrice,grandTotal, DELIVERY_FEE} = useSelector((store) => store.wish);
  const dispatch = useDispatch();
  
  const handleClearWish= () =>{
    dispatch(clearWish ());
  }
  return (
      <div className="w-full max-w-sm mx-auto lg:mx-0 lg:w-72 bg-white rounded-xl border border-gray-200 p-5 lg:sticky lg:top-24">
              <h2 className="text-base font-semibold text-gray-800 mb-4">Wish Order Summary</h2>

              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>SelectedItems ({selectedItems} item{selectedItems !== 1 ? "s" : ""})</span>
                <span className="text-gray-700">NPR {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Delivery Fee</span>
                <span className="text-gray-700">NPR {DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mb-3">
                <span>Tax (13%)</span>
                <span className="text-gray-700"> ({taxRate * 100}%): NPR{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-semibold text-gray-900 border-t border-gray-100 pt-3 mt-1">
                <span>Grand Total</span>
                <span>NPR {grandTotal.toFixed(2)}</span>
              </div>


<button
onClick={(e) => {
  e.stopPropagation();
handleClearWish();
}

}
className="mt-5 w-full bg-gray-900 cursor-pointer text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition">
               
                Clear Checkout
              </button>
              <button className="mt-5 w-full bg-gray-900 text-white text-sm font-medium py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-700 transition">
               
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
  )
}

export default WishOrderSummary;
