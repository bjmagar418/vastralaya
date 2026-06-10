// import React from 'react'
// import Categories from '../categoryPage/Categories'
// import TrendingProducts from '../Shop/TrendingProducts'
// import DealSection from '../home/DealSection';
// import Blogs from './Blogs';
// import FeaturesBrand from '../home/FeaturesBrand';
// import Promotional from '../home/Promotional';
// const Herosection = () => {
//   return (
//    <div className="grid grid-cols-7 gap-2">
//   <div className="col-span-7 col-start-1">{<Categories/>}</div>
//   <div className="col-start-1 col-span-4  "><TrendingProducts/></div>
//   <div className="col-span-3 col-start-5 "><DealSection/></div>
//   <div className="col-span-7 col-start-1"><Blogs/></div>
//     <div className="col-span-7 col-start-1"><FeaturesBrand/></div>
//   <div className="col-span-7 col-start-1"><Promotional/></div>
// </div>
//   )
// }
// export default Herosection;

import React from 'react'
import Categories from '../categoryPage/Categories'
import TrendingProducts from '../Shop/TrendingProducts'
import DealSection from '../home/DealSection';
import Blogs from './Blogs';
import FeaturesBrand from '../home/FeaturesBrand';
import Promotional from '../home/Promotional';

const Herosection = () => {
  return (
    /* 1. Default layout (mobile): 1 single column stack with a clean gap
      2. Desktop layout (lg): Swaps to your original 7-column grid layout
    */
    <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 lg:gap-2">
      
      {/* Categories - Spans full width on mobile, all 7 columns on laptop */}
      <div className="col-span-1 lg:col-span-7 lg:col-start-1">
        <Categories />
      </div>

      {/* Trending Products - Full width on mobile, 4 columns on laptop */}
      <div className="col-span-1 lg:col-span-4 lg:col-start-1">
        <TrendingProducts />
      </div>

      {/* Flash Sale / Deal Section - Full width on mobile, 3 columns on laptop */}
      <div className="col-span-1 lg:col-span-3 lg:col-start-5">
        <DealSection />
      </div>

      {/* Blogs - Full width everywhere */}
      <div className="col-span-1 lg:col-span-7 lg:col-start-1">
        <Blogs />
      </div>

      {/* Features Brand - Full width everywhere */}
      <div className="col-span-1 lg:col-span-7 lg:col-start-1">
        <FeaturesBrand />
      </div>

      {/* Promotional - Full width everywhere */}
      <div className="col-span-1 lg:col-span-7 lg:col-start-1">
        <Promotional />
      </div>

    </div>
  )
}

export default Herosection;
