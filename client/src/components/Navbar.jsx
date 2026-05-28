import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";
import CartModel from "../pages/Shop/productDetails/CartModel";
import WishModel from "../pages/Shop/productDetails/WishModel";
import { useCart } from "../pages/Shop/productDetails/CartContext";
import { useWish } from "../pages/Shop/productDetails/WishContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isWishOpen, setisWishOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");

  const { totalItems } = useCart();

  const { totalItems: totalWishItems } = useWish();

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
              VASTRALAYA
              <span className="text-sm font-normal self-center">
                Redefine your style
              </span>
            </Link>
          </div>

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
              {totalWishItems > 0 && (
                <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {totalWishItems}
                </sup>
              )}
            </button>

            {/* Cart — badge now shows real count from useCart */}
            <button
              onClick={handleCartToggle}
              className="relative cursor-pointer"
            >
              <i className="ri-shopping-cart-line hover:text-red-500 text-xl active:text-red-500"></i>
              {totalItems > 0 && (
                <sup className="absolute -top-2 -right-2 text-xs w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full">
                  {totalItems}
                </sup>
              )}
            </button>

            {/* Log In / Sign Up */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-1 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                Sign Up
              </Link>
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
            <div className="flex items-center border border-gray-300 rounded-md px-3 py-1">
              <input
                type="text"
                placeholder="Search products"
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
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="flex-1 text-center px-4 py-2 text-base font-medium text-gray-700 border border-gray-400 rounded hover:bg-red-500 hover:text-white hover:border-transparent transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
      </nav>

      {isCartOpen && <CartModel onClose={handleCartToggle} />}
{isWishOpen && <WishModel onClose={handleWishToggle} />}    </>
  );
};

export default Navbar;
