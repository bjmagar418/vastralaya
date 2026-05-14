import React from "react";
import { Link } from "react-router";
import logo from "../assets/logo.jpeg";

const Navbar = () => {
  return (
    <>
      <header>
        {/*upper*/}
        <div className=" flex justify-between  bg-primary text-sm font-light">
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
       
       <nav className="flex items-center justify-between px-4 py-2">

  {/* LOGO */}
  <div className="flex items-center gap-2">
    <img src={logo} alt="logo" className="h-[48px] w-auto object-contain" />
    <Link to="/" className="flex flex-col leading-none font-bold text-2xl">
      VASTRALAYA
      <span className="text-sm font-normal self-center">
        Redefine your style
      </span>
    </Link>
  </div>

  {/* NAV LINKS (CENTER - STRETCH FIX) */}
  <ul className="flex flex-1 flex-wrap justify-center items-center gap-6 text-base font-medium">
    <li><Link to="/" className="link">Home</Link></li>
    <li><Link to="/shop"  className="link">Shop</Link></li>
    <li><Link to="/pages"  className="link">Category</Link></li>

    {/* stretched items */}
    <li className=" text-center">
      <Link to="/pages"  className="link">New Arrivals</Link>
    </li>

    <li><Link to="/pages"  className="link">Offer</Link></li>

    <li className=" text-center">
      <Link to="/pages"  className="link">About us</Link>
    </li>

    <li><Link to="/pages"  className="link">Contact</Link></li>
  </ul>

  {/* ICONS */}
  <div className="flex items-center gap-4">

    {/* search */}
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

    {/* wishlist */}
    <button className="relative link cursor-pointer">
      <i className="ri-heart-line"></i>
      <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center text-black rounded-full">
        0
      </sup>
    </button>

    {/* cart */}
    <button className="relative link cursor-pointer">
      <i className="ri-restaurant-line"></i>
      <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center text-black rounded-full">
        0
      </sup>
    </button>

    {/* login */}
    <Link to="/login" className="link text-sm font-medium">
      <i className="ri-user-line"></i> Login/Register
    </Link>
  </div>

</nav>
      </header>
    </>
  );
};

export default Navbar;
