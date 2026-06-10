import React from "react";
import brandsData from "../../data/brands.json";
import image1 from "../../assets/admin.png";
import RatingStar from "../../components/RatingStar";

const reviews = [
  {
    name: "Aarav Shrestha",
    text: "Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion",
  },
  {
    name: "Suman Shrestha",
    text: "Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion",
  },
  {
    name: "Prabha Joshi",
    text: "Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion",
  },
];

const FeaturesBrand = () => {
  return (
    <div className="px-4 py-1 sm:px-6 lg:px-16 max-w-[1400px] mx-auto">
      <h1 className="font-extrabold text-xl lg:text-2xl mb-6 text-gray-900">
        Featured Brands
      </h1>

      {/* Main layout: stacked on mobile, grid side-by-side on lg+ */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 items-center">

        {/* Brand logos — grid layout */}
        <div className="grid grid-cols-5 gap-4 w-full lg:col-span-1 lg:pt-12">
          {brandsData.map((brand, index) => (
            <div key={index} className="w-full flex items-center justify-center">
              <img
                src={brand.imageUrl}
                className="w-full h-10 object-contain filter grayscale hover:grayscale-0 transition-all duration-200"
                alt={`brand-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Reviews section — full width on mobile, 2 cols wide on desktop */}
        <div className="flex flex-col gap-5 w-full lg:col-span-2">
          <h1 className="text-lg lg:text-xl font-bold text-gray-900">
            What our customers say
          </h1>

          {/* Cards: 1 col mobile → 2 cols tablet → 3 cols desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="brand_card bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center text-center gap-4 border border-gray-100"
              >
                {/* Image centered using mx-auto */}
                <img
                  src={image1}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-100 mx-auto"
                />
                
                <div className="flex flex-col items-center justify-center gap-1 w-full">
                  <h2 className="font-bold text-sm sm:text-base text-gray-800">
                    {review.name}
                  </h2>
                  <RatingStar />
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesBrand;