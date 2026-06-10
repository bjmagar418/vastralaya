import React from 'react'
import { Link } from 'react-router'
import bannerImg from '../../assets/header2.jpg'

const Banner = () => {
  return (
    <div
      /* Changed min-h-[80vh] to min-h-[50vh] on mobile, returning to md:min-h-[80vh] on desktops */
      className="relative flex flex-col md:flex-row items-center justify-center md:justify-between 
                 min-h-[50vh] md:min-h-[80vh] px-8 md:px-12 lg:px-20 py-10 gap-8 
                 bg-primary rounded-2xl mx-3 md:mx-6 my-3 overflow-hidden"
    >
      {/* BACKGROUND IMAGE FOR MOBILE ONLY */}
      <div
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {/* Dark overlay for mobile readability */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      {/* UNIFIED CONTENT BLOCK (Adapts beautifully from Mobile to Desktop) */}
      <div className="relative z-10 flex flex-col gap-4 md:gap-5 flex-1 text-center md:text-left w-full">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white md:text-gray-900 drop-shadow-md md:drop-shadow-none">
          Redefine your <br />
          Style With{' '}
          <span className="text-amber-400 md:text-amber-700 italic">Vastralaya</span>
        </h1>
        
        <h4 className="tracking-wide text-sm md:text-lg text-white/90 md:text-gray-800 font-semibold">
          Premium fashion for Man, Woman, Kids
        </h4>
        
        <p className="text-sm md:text-base text-white/80 md:text-gray-700 max-w-xs md:max-w-md mx-auto md:mx-0">
          Discover the latest trends, timeless style, and exclusive collections crafted for you.
        </p>

        {/* Buttons */}
        <div className="flex flex-row gap-3 md:gap-4 justify-center md:justify-start mt-3 md:mt-2 flex-wrap">
          <Link
            to="/shop"
            className="bg-black text-white px-6 md:px-7 py-3 rounded-md text-sm 
                       font-bold hover:bg-gray-800 transition-colors duration-200"
          >
            Shop Now
          </Link>
          
          <Link
            to="/category"
            className="border-2 border-white md:border-black text-white md:text-black bg-transparent px-5 md:px-6 py-3 
                       rounded-md text-sm font-semibold hover:bg-white hover:text-black md:hover:bg-black md:hover:text-white 
                       transition-colors duration-200"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* LAPTOP IMAGE CONTAINER (Hidden on mobile, flex on desktop) */}
      <div className="hidden md:flex flex-1 items-center justify-center">
        <img
          src={bannerImg}
          alt="banner"
          className="max-h-[380px] w-auto object-contain rounded-2xl shadow-md"
        />
      </div>
    </div>
  )
}

export default Banner;