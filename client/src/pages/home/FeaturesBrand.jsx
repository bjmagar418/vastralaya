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
    <div className=" px-2 py-6 sm:px-0 lg:px-8">
      <h1 className="font-bold text-xl sm:text-xl mb-6">
        Features Brand
      </h1>

      {/* Main layout: stacked on mobile, side-by-side on lg+ */}
      <div className=" flex flex-col lg:grid lg:grid-cols-3 gap-6">

        {/* Brand logos — full width on mobile, 1 col on lg */}
        <div className="grid grid-cols-5 gap-4 lg:col-span-1 lg:h-32 lg:content-end ">
          {brandsData.map((brand, index) => (
            <div key={index} className="w-full">
              <img
                src={brand.imageUrl}
                className="w-full h-10 object-contain"
                alt={`brand-${index}`}
              />
            </div>
          ))}
        </div>

        {/* Reviews section — full width on mobile, 2 cols on lg */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          <h1 className="text-lg sm:text-xl font-semibold">
            What our customers say
          </h1>

          {/* Cards: 1 col mobile → 3 cols on md+ */}
          <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-9">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="brand_card shadow-lg rounded-xl p-4 flex flex-col items-center text-center gap-2"
              >
                <img
                  src={image1}
                  alt={review.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-sm sm:text-base">
                    {review.name}
                  </h2>
                  <RatingStar />
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    {review.text}
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