import React from 'react'
<<<<<<< HEAD
import Categories from '../categoryPage/Categories'
=======
import Categories from './Categories'
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
import TrendingProducts from '../Shop/TrendingProducts'
import DealSection from '../home/DealSection';
import Blogs from './Blogs';
import FeaturesBrand from '../home/FeaturesBrand';
import Promotional from '../home/Promotional';

<<<<<<< HEAD
const Herosection = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-3 sm:px-6 lg:px-10 py-4 sm:py-6 lg:py-10 flex flex-col gap-4 sm:gap-5 lg:gap-6">
      
      {/* Categories - full width always */}
      <div className="w-full">
        <Categories />
      </div>

      {/* Trending + Deal - side by side on laptop, stacked on mobile */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-7 gap-4 sm:gap-5 lg:gap-6 lg:items-stretch">
        
        <div className="lg:col-span-5">
          <TrendingProducts />
        </div>

        <div className="lg:col-span-2">
          <DealSection />
        </div>

      </div>

      {/* Full width sections */}
      <div className="w-full">
        <Blogs />
      </div>

      <div className="w-full">
        <FeaturesBrand />
      </div>

      <div className="w-full">
        <Promotional />
      </div>

    </div>
  );
};

export default Herosection;
=======

const Herosection = () => {
  return (
   <div className="grid grid-cols-7 gap-2">
  <div className="col-span-7 col-start-1">{<Categories/>}</div>
  <div className="col-start-1 col-span-4  "><TrendingProducts/></div>
  <div className="col-span-3 col-start-5 "><DealSection/></div>
  <div className="col-span-7 col-start-1"><Blogs/></div>
    <div className="col-span-7 col-start-1"><FeaturesBrand/></div>
  <div className="col-span-7 col-start-1"><Promotional/></div>
</div>
  )
}

export default Herosection;
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
