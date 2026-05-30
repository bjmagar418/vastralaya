import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const navigate = useNavigate();

  const handleGenderSelect = (e, gender) => {
    e.preventDefault();
    // FIXED: Changed route path string targeting from '/pages' to '/shop'
    navigate(`/shop?gender=${gender}&subcategory=all`);
    setIsShopOpen(false); 
  };

  return (
    <>
      <header className="relative z-50 bg-white">
        <div className="flex justify-between bg-primary text-sm font-light">
          <div className="flex justify-evenly items-center">
            <div className="flex gap-2">
              <i className="ri-caravan-line"></i>
              <span>Free Shipping on Orders Above NPR 1999</span>
            </div>
            <div className="flex gap-2">
              <i className="ri-exchange-dollar-line"></i>
              <span>Easy Returns</span>
            </div>
            <div className="flex gap-2">
              <i className="ri-git-repository-private-line"></i>
              <span>Secure Payments</span>
            </div>
          </div>
          <div className="flex gap-3">
            <i className="ri-discount-percent-line"></i>{" "}
            <span>Get 100% discount first order</span>
          </div>
        </div>

        <nav className="flex items-center justify-between px-4 py-2 relative z-50">
          <div className="flex items-center gap-2">
            <img src={logo} alt="logo" className="h-[48px] w-auto object-contain" />
            <Link to="/" className="flex flex-col leading-none font-bold text-2xl">
              VASTRALAYA
              <span className="text-sm font-normal self-center">
                Redefine your style
              </span>
            </Link>
          </div>

          <ul className="flex flex-1 flex-wrap justify-center items-center gap-6 text-base font-medium relative z-50">
            <li><Link to="/" className="link">Home</Link></li>
            
            <li className="relative py-2 z-50">
              <button 
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setIsShopOpen(!isShopOpen);
                }}
                className="link cursor-pointer bg-transparent border-none text-base font-medium p-0 inline-block focus:outline-none"
              >
                Shop
              </button>

              {isShopOpen && (
                <div className="absolute left-0 top-full mt-2 bg-white border border-gray-200 rounded shadow-md py-1 w-40 z-50 pointer-events-auto">
                  {["men", "women", "kids"].map((gender) => (
                    <div key={gender} className="relative z-50">
                      <button
                        type="button"
                        onClick={(e) => handleGenderSelect(e, gender)}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 font-medium text-gray-700 capitalize flex justify-between items-center focus:outline-none"
                      >
                        {gender}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </li>

            {/* FIXED ALL BELOW COMPONENT LINKS FROM '/pages' TO '/shop' */}
            <li><Link to="/shop" className="link">Category</Link></li>
            <li className="text-center"><Link to="/login" className="link">Login</Link></li>
            <li><Link to="/signup" className="link">Signup</Link></li>
            <li className="text-center"><Link to="/shop" className="link">About us</Link></li>
            <li><Link to="/shop" className="link">Contact</Link></li>
          </ul>

          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
              <input
                type="text"
                placeholder="Search products"
                className="text-sm bg-transparent focus:outline-none w-32"
              />
              <Link to="/search">
                <i className="ri-search-line cursor-pointer"></i>
              </Link>
            </div>

            <button className="relative link cursor-pointer bg-transparent border-none">
              <i className="ri-heart-line"></i>
              <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center text-black rounded-full">0</sup>
            </button>

            <button className="relative link cursor-pointer bg-transparent border-none">
              <i className="ri-shopping-bag-line"></i>
              <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center text-black rounded-full">0</sup>
            </button>

            <div className="flex items-center gap-4">
              <Link to="/login" className="px-5 py-2 text-gray-700 font-medium hover:text-gray-900 transition">Log In</Link>
              <Link to="/signup" className="px-5 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">Sign Up</Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;