<<<<<<< HEAD
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import CartModel from "../pages/Shop/productDetails/CartModel";
import WishModel from "../pages/Shop/productDetails/WishModel";
import avatarImg from '../../src/assets/avatar.png';


import { useDispatch, useSelector } from "react-redux";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
const products = useSelector((state) => state.cart.products)
const wishProducts = useSelector((state) => state.wish.products);
console.log(products);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isWishOpen, setisWishOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");



  const navigate = useNavigate();

  const handleWishToggle = () => setisWishOpen(!isWishOpen);
  const handleCartToggle = () => setisCartOpen(!isCartOpen);

  const handleNavSearch = () => {
    if (navSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(navSearchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };
  
  // show user if logged in or not
  const dispatch = useDispatch();
  const {user} = useSelector((state)=> state.auth);
//console.log(user);
const [logoutUser] = useLogoutUserMutation();

//dropdown menus
const [isDropDownOpen,setIsDropDownOpen] = useState(false);
const handleDropDownToggle =  () =>{
  setIsDropDownOpen(!isDropDownOpen);
}

// admin dropdown menus
const adminDropDownMenus = [
  {label: "Dashboard",path:"/dashboard/admin"},
    {label: "Manage Items",path:"/dashboard/manage-products"},
  {label: "All Orders",path:"/dashboard/manage-orders"},
  {label: "Add New Post",path:"/dashboard/add-new-post"},
]

//user dropdown menus
const userDropDownMenus = [
  {label: "Dashboard",path:"/dashboard/admin"},
    {label: "Profile",path:"/dashboard/profile"},
  {label: "Payments",path:"/dashboard/payments"},
  {label: "Orders",path:"/dashboard/orders"},
]

const dropdownMenus = user?.role === "admin" ? [...adminDropDownMenus]: [...userDropDownMenus];

const handleLogout = async() =>{
  try {
    await logoutUser().unwrap();
  dispatch(logout());
  navigate("/")
  } catch (error) {
  console.error("Failed to logout");
  }

}
  return (
    <>
      <nav className="px-4 py-2">
        {/* TOP ROW: Logo + Icons + Hamburger */}
        <div className="flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center gap-2">
            <img
              src={logo}
              alt="logo"
              className="h-[48px] w-auto object-contain"
            />
            <Link
              to="/"
              className="flex flex-col leading-none font-bold text-2xl"
            >
=======
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
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
              VASTRALAYA
              <span className="text-sm font-normal self-center">
                Redefine your style
              </span>
            </Link>
          </div>

<<<<<<< HEAD
          {/* NAV LINKS */}
          <ul className="hidden lg:flex flex-1 flex-wrap justify-center items-center gap-6 text-base font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/category", label: "Category" },
              { to: "/about", label: "About us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className="hover:text-red-500 text-xl font-semibold"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ICONS + BUTTONS */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden lg:flex items-center border border-gray-300 rounded-md px-3 py-1">
              <input
                type="text"
                placeholder="Search products"
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
                className="text-sm bg-transparent focus:outline-none w-32"
              />
              <i
                className="ri-search-line cursor-pointer"
                onClick={handleNavSearch}
              ></i>
            </div>

            {/* Wishlist */}
            {/* Wishlist */}
            <button
              onClick={handleWishToggle}
              className="relative cursor-pointer"
            >
              <i className="ri-heart-line hover:text-red-500 text-xl active:text-red-500"></i>
              {wishProducts.length> 0 && (
                <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {wishProducts.length}
                </sup>
              )}
            </button>

            {/* Cart — badge now shows real count from useCart */}
            <button
              onClick={handleCartToggle}
              className="relative cursor-pointer"
            >
              <i className="ri-shopping-cart-line hover:text-red-500 text-xl active:text-red-500"></i>
              {products.length > 0 && (
                <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {products.length}
                </sup>
              )}
            </button>

            {/* Log In / Sign Up */}
          <div className="hidden lg:flex items-center gap-3">
  {user && user ? (
    <>
      <div className="relative">
        <img
          onClick={handleDropDownToggle}
          src={user?.profileImageUrl || avatarImg}
          alt="profile or avatar image"
          className="size-8 rounded-full object-cover cursor-pointer ring-2 ring-transparent hover:ring-red-400 transition-all duration-200"
        />
        {isDropDownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg z-50">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-medium text-gray-800 truncate">{user?.name || "My Account"}</p>
            </div>
            <ul className="py-1">
              {dropdownMenus.map((menu, index) => (
                <li key={index}>
                  <Link
                    to={menu.path}
                    onClick={() => setIsDropDownOpen(false)}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-150"
                  >
                    {menu.label}
                  </Link>
                </li>
              ))}

  <button
  onClick={handleLogout}
  className="cursor-pointer flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-500 transition-colors duration-150"
>
  Logout
</button>
            </ul>
          </div>
        )}
      </div>
    </>
  ) : (
    <Link
      to="/login"
      className="px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
    >
      Log In
    </Link>
  )}

 
{
  user && user ? (
 <Link
    to="/signup"
    className=" hidden px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
  >
    Sign Up
  </Link>
  ):(
  <Link
    to="/signup"
    className="px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
  >
    Sign Up
  </Link>
  )
}
 
</div>

            {/* Hamburger */}
            <button
              className="lg:hidden text-2xl cursor-pointer active:text-red-500"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="lg:hidden mt-3 flex flex-col gap-4 border-t pt-4 pb-2">
=======
          {/* NAV LINKS (CENTER - STRETCH FIX) */}
          <ul className="flex flex-1 flex-wrap justify-center items-center gap-6 text-base font-medium">
            <li><Link to="/" className="link">Home</Link></li>
            <li><Link to="shop" className="link">Shop</Link></li>
            <li><Link to="/pages" className="link">Category</Link></li>

            {/* stretched items */}
            <li className=" text-center">
              <Link to="/login" className="link">Login</Link>
            </li>

            <li><Link to="/signup" className="link">Signup</Link></li>

            <li className=" text-center">
              <Link to="/pages" className="link">About us</Link>
            </li>

            <li><Link to="/pages" className="link">Contact</Link></li>
          </ul>

          {/* ICONS */}
          <div className="flex items-center gap-4">

            {/* search */}
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
              <input
                type="text"
                placeholder="Search products"
<<<<<<< HEAD
                className="text-sm bg-transparent focus:outline-none flex-1"
              />
              <Link to="/search" onClick={() => setMenuOpen(false)}>
                <i className="ri-search-line cursor-pointer"></i>
              </Link>
            </div>
            <ul className="flex flex-col gap-3 text-base font-semibold">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/category", label: "Category" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="block hover:text-red-500 transition active:text-red-500"
                    onClick={() => setMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-3 mt-1">

              {
                 user && user? (<>
              <img src= {user?.profileImageUrl ||avatarImg} alt= "profile or avataimage" className="size-13 cursor-pointer" />
              </>) :(
               <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                Log In
              </Link>
              )
              }
           
          {
  user && user ? (
 <Link
    to="/signup"
    className=" hidden px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
  >
    Sign Up
  </Link>
  ):(
  <Link
    to="/signup"
    className="px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
  >
    Sign Up
  </Link>
  )
}
            </div>
          </div>
        )}
      </nav>

{isCartOpen && <CartModel products={products} isOpen={isCartOpen} onClose={handleCartToggle} />}
{isWishOpen && <WishModel products={wishProducts} isOpen={isWishOpen} onClose={handleWishToggle} />}    </>
=======
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
            <div className="flex items-center gap-4">
              <Link to="/login" className="px-5 py-2 text-gray-700 font-medium hover:text-gray-900 transition">
                Log In
              </Link>
              <Link to="/signup" className="px-5 py-2 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition">
                Sign Up
              </Link>
            </div>
          </div>

        </nav>
      </header>
    </>
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
  );
};

export default Navbar;
<<<<<<< HEAD
=======

>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
