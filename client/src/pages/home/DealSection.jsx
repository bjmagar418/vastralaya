import React from "react";
import dealsImg from "../../assets/deals.png";
import { Link } from "react-router";

const DealSection = () => {
  return (
    <section className="w-full h-full bg-pink-300 rounded-lg p-4 sm:p-5 lg:p-6 flex flex-col gap-3 items-center lg:items-start">
      <h4 className="text-xl sm:text-2xl font-bold text-red-600 text-center lg:text-left">Flash Sale</h4>
      <h5 className="text-sm sm:text-base font-semibold text-center lg:text-left">Up To 20% Discount</h5>
      <p className="text-xs sm:text-sm text-gray-700 text-center lg:text-left">Limited Time Offer</p>
      <div className="grid grid-cols-4 gap-2 mt-2 w-full">
        {["Days", "Hours", "Mins", "Sec"].map((label, i) => (
          <div key={i} className="bg-white rounded-md shadow p-1 sm:p-2 text-center">
            <h4 className="text-sm sm:text-lg font-bold text-red-600">
              {["14", "20", "15", "05"][i]}
            </h4>
            <p className="text-[10px] sm:text-xs">{label}</p>
          </div>
        ))}
      </div>
      <button className="cursor-pointer bg-black text-white w-28 sm:w-32 rounded-md hover:bg-red-600 p-2 mt-2 text-sm sm:text-base active:bg-red-600 active:scale-95">
        <Link to="/shop">Shop Now</Link>
      </button>

      {/* mt-2 instead of mt-auto — keeps image close to button */}
      <div className="flex justify-center mt-2 w-full">
        <img
          src={dealsImg}
          className="w-55 sm:w-55 lg:w-100  object-contain"
        />
      </div>
    </section>
  );
};

export default DealSection;