import React, { useState } from 'react';
import ProductCards from '../../pages/Shop/ProductCards';
import products from '../../data/product.json';


const TrendingProducts = () => {
  const [visibleProducts,setVisibleProducts]=useState(7);
  const loadMoreProducts =()=>{
  setVisibleProducts(prevCount => prevCount + 4);
  }

  return (
    <section className='w- full section__container  grid  grid-cols-3 '>
      <h2 className='section__header col-span-2'>Trending Products</h2>
    {/*products card*/}
    <div className='col-span-3 row-span-3 row-start-2'>
    <ProductCards products={products.slice(0,visibleProducts)}/>
    </div>
          {/*load more products btn*/}
   <div className='product__btn  '>
  {
    visibleProducts <products.length &&(
      <button className='cursor-pointer ' onClick={loadMoreProducts}><span className='hover:text-red-500'>View All <i className="ri-arrow-right-line"></i></span></button>
    )
  }
   </div>

    </section>
  )
}

export default TrendingProducts;