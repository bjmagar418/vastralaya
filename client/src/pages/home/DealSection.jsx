import React from 'react';
import { Link } from 'react-router-dom'; // Keeping router targets standardized
import dealsImg from '../../assets/deals.png';

const DealSection = () => {
  const countdownData = [
    { value: "14", label: "Days" },
    { value: "20", label: "Hours" },
    { value: "15", label: "Mins" },
    { value: "05", label: "Sec" }
  ];

  return (
    <section className="w-full h-full bg-pink-300 rounded-lg p-5 lg:p-8 flex flex-col gap-4 items-center lg:items-start">
      <h4 className="text-xl sm:text-2xl font-extrabold text-red-600 text-center lg:text-left tracking-wide">
        Flash Sale
      </h4>
      <h5 className="text-base sm:text-lg font-bold text-gray-900 text-center lg:text-left">
        Up To 20% Discount
      </h5>
      <p className="text-xs sm:text-sm text-gray-700 text-center lg:text-left font-medium">
        Limited Time Offer
      </p>

      {/* Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 mt-2 w-full max-w-sm">
        {countdownData.map((item, i) => (
          <div key={i} className="bg-white rounded-md shadow p-2 text-center border border-pink-100">
            <h4 className="text-base sm:text-lg font-extrabold text-red-600">
              {item.value}
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500 font-semibold uppercase tracking-wider">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Action Button */}
      <Link 
        to="/shop" 
        className="mt-2 text-center cursor-pointer bg-black text-white font-bold text-sm sm:text-base 
                   w-32 py-2.5 rounded-md transition-all duration-200 
                   hover:bg-red-600 active:scale-95 shadow-md block"
      >
        Shop Now
      </Link>

      {/* Image Container */}
      <div className="flex justify-center mt-4 w-full">
        <img
          src={dealsImg}
          alt="Flash Sale Promo Deals"
          className="w-48 sm:w-56 lg:w-72 object-contain"
        />
      </div>
    </section>
  );
};

export default DealSection;