import React from "react";
import brandsData from "../../data/brands.json";
import image1 from "../../assets/admin.png";
import RatingStar from "../../components/RatingStar";

const FeaturesBrand = () => {
  return (
    <div className="featuresBrand grid grid-cols-3">
      <h1 className="col-span-3 font-extrabold">Features Brand</h1>
      <div className=" grid grid-cols-5 gap-1 col-span-1 h-32  content-end">
        {brandsData.map((brand, index) => (
          <div key={index} className=" w-full">
            <img src={brand.imageUrl} className="w-full h-10 object-contain align-middle" />
          </div>
        ))}
      </div>
      <div className="featuuresBrand2 flex flex-col col-span-2 ">
        <h1>What our customer says</h1>
        <div className="flex gap-2">
          <div className="brand_card shadow-xl/30 ">
            <img src={image1} alt={image1} />
            <div>
              <h1>Aarav Shrestha</h1>
              <RatingStar/>
              <p>Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion</p>
            </div>
          </div>
          <div className="brand_card shadow-xl/30 ">
            <img src={image1} alt={image1} />
            <div>
              <h1>suman Shrestha</h1>
              <RatingStar/>
              <p>Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion</p>
            </div>
          </div>
          <div className="brand_card shadow-xl/30 ">
            <img src={image1} alt={image1} />
            <div>
              <h1>PRabha joshi</h1>
              <RatingStar/>
              <p>Amazing quality and fast delivery! Vastralaya has the best collection of trendy fashion</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesBrand;
