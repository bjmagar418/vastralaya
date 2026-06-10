import React from 'react';
import { Link } from 'react-router';
import RatingStar from '../../components/RatingStar';
//import {useDispatch} from 'react-redux';
//import { addToCart } from '../../redux/features/cart/cartSlice';


const ProductCards = ({products}) => {
// const dispatch =useDispatch();
// const handleAddToCart = (product)=>{
//  dispatch(addToCart(product));
// }


  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2'>
      {
      products.map((product,index)=>(
        <div key={index}>
            <div className='relative'>
      <Link to={`/shop/${product._id}`}>
            <img src={product.image} alt='product image' className='max-h-25 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300 rounded-md'/>
      </Link>
      <div className='hover:block absolute top-1 right-1'>
        <button
        onClick={(e)=>{
          e.stopPropagation();
          handleAddToCart(product)
        }}
        >
            <i className="ri-shopping-cart-2-line text-black hover:text-red-600 cursor-pointer"></i>
        </button>
        </div>
            </div>
            {/*products description*/}
            <div className=' w-full'>
   <h4 className='w-full'>{product.name}</h4>
    <p>NPR{product.price} {product.oldPrice ? <s>NPR{product?.oldPrice}</s>:null}</p>
   <RatingStar rating={product.rating}/>
            </div>
        </div>
      ))
      }
    </div>
  )
}

export default ProductCards;