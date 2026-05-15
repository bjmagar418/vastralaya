import React from 'react'
import {Link} from 'react-router';
import bannerImg from '../../assets/header1.jpeg';

const Banner = () => {
  return (
    <div className=' header__container'>
      <div className='header__content z-30'>
        <h1 className='text-sm '>Redefine your <br/>Style With  <span className='decoration-amber-600'>Vastralaya</span> </h1>
        <h4 className='tracking-wide'>Premium fashion for Man,Woman,Kids</h4>
  <p>Discover the latest trend,timeless style and exclusive collection creafted for you.</p>
    <div className='flex gap-8'>
  <button className='btn bg-black text-white'><Link to='/shop'>Shop Now</Link></button>
          <button className='btn1'><Link to='/shop'>Explore Collection</Link></button>
    </div>
   

      </div>
      <div className='header__image '>
        <img src={bannerImg} alt='bannerimage1'/>
      </div>
    </div>
  )
}

export default Banner;