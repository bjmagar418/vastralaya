import React from 'react'
import { Link } from 'react-router'
import bannerImg from '../../assets/header2.jpg'

const Banner = () => {
  return (
    /* header__container */
    <div
      className="relative flex flex-col md:flex-row items-center justify-center md:justify-between 
                  min-h-[88vh] px-8 md:px-12 lg:px-20 py-10 gap-8 
                  bg-primary rounded-2xl mx-3 md:mx-6 my-3 overflow-hidden"
    >

      {/* MOBILE ONLY: full background image — covers entire banner container */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* MOBILE content — shown on mobile only */}
      <div className="relative z-10 md:hidden flex flex-col gap-4 text-center w-full">
        <h1 className="text-4xl font-extrabold leading-tight text-white drop-shadow-md">
          Redefine your <br />
          Style With{' '}
          <span className="text-amber-400 italic">Vastralaya</span>
        </h1>
        <h4 className="tracking-wide text-sm text-white/90 font-semibold">
          Premium fashion for Man,Woman,Kids
        </h4>
        <p className="text-sm text-white/80 max-w-xs mx-auto">
          Discover the latest trend, timeless style and exclusive collection crafted for you.
        </p>
        {/* banner_btn */}
        <div className="flex flex-row gap-3 justify-center mt-3 flex-wrap">
          {/* btn */}
          <Link
            to="/shop"
            className="bg-black text-white px-6 py-3 rounded-md text-sm 
                       font-bold hover:bg-gray-800 transition-colors duration-200"
          >
            Shop Now
          </Link>
          {/* btn1 */}
          <Link
            to="/category"
            className="border-2 border-white text-white bg-transparent px-5 py-3 
                       rounded-md text-sm font-semibold hover:bg-white hover:text-black 
                       transition-colors duration-200"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* LAPTOP: left content — hidden on mobile */}
      <div className="hidden md:flex flex-col gap-5 flex-1 text-left z-10">
        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-gray-900">
          Redefine your <br />
          Style With{' '}
          <span className="text-amber-700 italic">Vastralaya</span>
        </h1>
        <h4 className="tracking-wide text-lg text-gray-800 font-semibold">
          Premium fashion for Man,Woman,Kids
        </h4>
        <p className="text-base text-gray-700 max-w-md">
          Discover the latest trend, timeless style and exclusive collection crafted for you.
        </p>
        {/* banner_btn */}
        <div className="flex flex-row gap-4 mt-2 flex-wrap">
          {/* btn */}
          <Link
            to="/shop"
            className="bg-black text-white px-7 py-3 rounded-md text-sm 
                       font-bold hover:bg-gray-800 transition-colors duration-200"
          >
            Shop Now
          </Link>
          {/* btn1 */}
          <Link
            to="/category"
            className="border-2 border-black text-black bg-transparent px-6 py-3 
                       rounded-md text-sm font-semibold hover:bg-black hover:text-white 
                       transition-colors duration-200"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* header__image — laptop only */}
 {/* header__image — laptop only */}
<div className="hidden md:flex flex-1 items-center justify-center self-stretch">
  <img
    src={bannerImg}
    alt="bannerimage1"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>

    </div>
  )
}

export default Banner;