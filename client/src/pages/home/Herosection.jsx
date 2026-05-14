import React from 'react'
import Categories from './Categories'
import TrendingProducts from '../Shop/TrendingProducts'
import DealSection from '../home/DealSection';
import Blogs from './Blogs';
import FeaturesBrand from '../home/FeaturesBrand';
import Promotional from '../home/Promotional';


const Herosection = () => {
  return (
   <div className="grid grid-cols-7 gap-2">
  <div className="col-span-7 col-start-1">{<Categories/>}</div>
  <div className="col-start-1 col-span-4  "><TrendingProducts/></div>
  <div className="col-span-3 col-start-5 "><DealSection/></div>
  <div className="col-span-7 col-start-1"><Blogs/></div>
    <div className="col-span-7 col-start-1"><FeaturesBrand/></div>
  <div className="col-span-7 col-start-1"><Promotional/></div>
    <div className="col-span-7 col-start-1  bg-amber-500">07</div>


</div>
  )
}

export default Herosection;
