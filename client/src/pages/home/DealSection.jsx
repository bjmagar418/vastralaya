import React from 'react'
import dealsImg from '../../assets/deals.png'
import { Link } from 'react-router';
const DealSection = () => {
  return (
    <section className=' deals__container rounded-lg bg-pink-300'>
      <div className='deals__content'>
        <h4>Flash Sale</h4>
    <h5>Up To 20% Discount</h5>
    <p>Limited Time Offer</p>
     <div className='deals__countdown  grid grid-cols-4 gap-2 flex-wrap '>
     <div className='deals__countdown__card radius-md'>
     <h4>14</h4>
     <p>Days</p>
     </div>
      <div className='deals__countdown__card'>
     <h4>20</h4>
     <p>Hours</p>
     </div> 
     <div className='deals__countdown__card'>
     <h4>15</h4>
     <p>Mins</p>
     </div>
      <div className='deals__countdown__card'>
     <h4>05</h4>
     <p>Sec</p>
     </div>
     </div>
       <button className=' bg-black text-white w-32 rounded-md hover:bg-red-600 p-2'><Link to='/shop'>Shop Now</Link></button>
      </div>
      <div className='deals__image'>
        <img src={dealsImg} alt=''/>
      </div>
    </section>
  )
}

export default DealSection