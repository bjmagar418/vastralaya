import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpeg";
import avatarImg from "../../src/assets/avatar.png";
import CartModel from "../pages/Shop/productDetails/CartModel";
import WishModel from "../pages/Shop/productDetails/WishModel";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.cart.products);
  const wishProducts = useSelector((state) => state.wish.products);
  const { user } = useSelector((state) => state.auth);

  const [logoutUser] = useLogoutUserMutation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isCartOpen, setisCartOpen] = useState(false);
  const [isWishOpen, setisWishOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [navSearchQuery, setNavSearchQuery] = useState("");

  const handleWishToggle = () => setisWishOpen(!isWishOpen);
  const handleCartToggle = () => setisCartOpen(!isCartOpen);
  const handleDropDownToggle = () => setIsDropDownOpen(!isDropDownOpen);

  const handleNavSearch = () => {
    if (navSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(navSearchQuery.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      setIsDropDownOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  };

  const adminDropDownMenus = [
    { label: "Dashboard", path: "/admin/dashboard" },
    { label: "Manage Items", path: "/admin/manage-items" },
    { label: "All Orders", path: "/admin/manage-orders" },
    { label: "Add New Post", path: "/admin/add-product" },
  ];

  const userDropDownMenus = [
    { label: "Dashboard", path: "/user/dashboard" },
    { label: "Profile", path: "/user/profile" },
    { label: "Payments", path: "/user/payments" },
    { label: "Orders", path: "/user/orders" },
  ];

  const dropdownMenus =
    user?.role === "admin" ? adminDropDownMenus : userDropDownMenus;

  return (
    <>
      {/* Sticky top wrapper with controlled layout bounds */}
      <nav className="sticky top-0 z-50 bg-white shadow-md px-4 sm:px-6 lg:px-8 py-4 lg:py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 pr-6 md:pr-12 xl:pr-16">
          
          {/* LOGO SECTION - Added right margin to separate brand text from Home links */}
          <div className="flex items-center gap-4 mr-6 md:mr-12 xl:mr-20">
            <img
              src={logo}
              alt="Vastralaya logo"
              className="h-10 w-auto md:h-12 object-contain rounded-md"
            />
            <Link
              to="/"
              className="flex flex-col leading-none font-bold text-xl md:text-2xl text-zinc-900 tracking-tight"
            >
              VASTRALAYA
              <span className="text-[10px] md:text-xs font-normal tracking-normal text-zinc-800 mt-0.5">
                Redefine your style
              </span>
            </Link>
          </div>

          {/* DESKTOP NAV LINKS */}
          <ul className="hidden xl:flex flex-1 items-center justify-start gap-6 xl:gap-8 text-base font-semibold">
            {[
              { to: "/", label: "Home" },
              { to: "/shop", label: "Shop" },
              { to: "/category", label: "Category" },
              { to: "/about", label: "About us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `text-lg font-bold whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? "text-red-600"
                        : "text-zinc-900 hover:text-red-600"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* DESKTOP SEARCH BAR */}
          <div className="hidden lg:flex items-center bg-white/20 hover:bg-white/30 focus-within:bg-white/40 border border-zinc-900/10 rounded-lg max-w-xs xl:max-w-sm w-full px-3 py-1.5 transition-all">
            <input
              type="text"
              placeholder="Search products..."
              value={navSearchQuery}
              onChange={(e) => setNavSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleNavSearch()}
              className="text-sm bg-transparent focus:outline-none flex-1 text-zinc-900 placeholder-zinc-700 font-medium"
            />
            <button
              onClick={handleNavSearch}
              aria-label="Search"
              className="pl-2 border-l border-zinc-900/20 text-zinc-900 hover:text-red-600 transition-colors"
            >
              <i className="ri-search-line cursor-pointer text-lg"></i>
            </button>
          </div>

          {/* INTERACTION CONTROLS & UTILITIES */}
          <div className="flex items-center gap-3 sm:gap-4 md:gap-5 flex-shrink-0">
            {/* Wishlist */}
            <button
              onClick={handleWishToggle}
              className="relative p-1 text-zinc-900 hover:text-red-600 transition-colors"
              aria-label="View Wishlist"
            >
              <i className="ri-heart-line text-2xl"></i>
              {wishProducts.length > 0 && (
                <span className="absolute top-0 right-0 text-[10px] w-4 h-4 flex items-center justify-center bg-red-600 text-white rounded-full font-bold shadow-sm">
                  {wishProducts.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={handleCartToggle}
              className="relative p-1 text-zinc-900 hover:text-red-600 transition-colors"
              aria-label="View Cart"
            >
              <i className="ri-shopping-cart-line text-2xl"></i>
              {products.length > 0 && (
                <span className="absolute top-0 right-0 text-[10px] w-4 h-4 flex items-center justify-center bg-red-600 text-white rounded-full font-bold shadow-sm">
                  {products.length}
                </span>
              )}
            </button>

            {/* User Profile / Auth System */}
            <div className="relative">
              {user ? (
                <>
                  <button
                    onClick={handleDropDownToggle}
                    className="flex items-center focus:outline-none"
                    aria-label="User Account Options"
                  >
                    <img
                      src={user?.profileImageUrl || avatarImg}
                      alt="User Profile"
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-900/10 hover:ring-zinc-900 transition-all duration-200"
                    />
                  </button>
                  {isDropDownOpen && (
                    <div className="absolute right-0 mt-3 w-56 bg-white border border-zinc-100 rounded-xl shadow-2xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-4 py-3 border-b border-zinc-100">
                        <p className="text-xs text-zinc-400 font-medium">
                          Signed in as
                        </p>
                        <p className="text-sm font-bold text-zinc-800 truncate mt-0.5">
                          {user?.name || "My Account"}
                        </p>
                      </div>
                      <ul className="py-1 pr-10">
                        {dropdownMenus.map((menu, index) => (
                          <li key={index}>
                            <Link
                              to={menu.path}
                              onClick={() => setIsDropDownOpen(false)}
                              className="flex items-center px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 font-medium transition-colors"
                            >
                              {menu.label}
                            </Link>
                          </li>
                        ))}
                        <li className="border-t border-zinc-100 mt-1 pt-1">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                          >
                            Log out
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </>
              ) : (
                <div className="hidden lg:flex items-center gap-3">
                  <Link
                    to="/login"
                    className="px-5 py-2 text-sm font-semibold text-zinc-900 shadow-md border-zinc-900/30 hover:bg-zinc-900 hover:text-white transition-all duration-200"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    className="px-5 py-2 text-sm font-semibold text-zinc-900 shadow-md border-zinc-900/30 hover:bg-zinc-900 hover:text-white transition-all duration-200"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile/Tablet Menu Toggle button */}
            <button
              className="xl:hidden text-2xl text-zinc-900 cursor-pointer p-1 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close Menu" : "Open Menu"}
            >
              <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="xl:hidden mt-4 flex flex-col gap-4 border-t border-zinc-900/10 pt-4 pb-2 animate-in fade-in duration-200">
            {/* Search Input for Mobile/Tablets */}
            <div className="flex lg:hidden items-center bg-white/20 border border-zinc-900/10 rounded-lg px-3 py-2">
              <input
                type="text"
                placeholder="Search products..."
                value={navSearchQuery}
                onChange={(e) => setNavSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNavSearch();
                    setMenuOpen(false);
                  }
                }}
                className="text-sm bg-transparent focus:outline-none flex-1 text-zinc-900 placeholder-zinc-700 font-medium"
              />
              <button
                onClick={() => {
                  handleNavSearch();
                  setMenuOpen(false);
                }}
                aria-label="Search"
              >
                <i className="ri-search-line text-zinc-800 text-lg"></i>
              </button>
            </div>

            {/* Mobile/Tablet Navigation Hyperlinks */}
            <ul className="flex flex-col gap-1 text-base font-semibold text-zinc-900">
              {[
                { to: "/", label: "Home" },
                { to: "/shop", label: "Shop" },
                { to: "/category", label: "Category" },
                { to: "/about", label: "About Us" },
                { to: "/contact", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-2 px-2 rounded-md transition-colors ${
                        isActive
                          ? "text-red-600 bg-white/10 font-bold"
                          : "text-zinc-900 hover:bg-white/5"
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile Auth Actions Block */}
            <div className="flex gap-3 mt-1 pt-4 border-t border-zinc-900/10">
              {user ? (
                <div className="flex items-center gap-3 w-full bg-white/10 p-3 rounded-xl border border-white/10">
                  <img
                    src={user?.profileImageUrl || avatarImg}
                    alt="avatar profile"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-900/10"
                  />
                  <div>
                    <p className="text-sm font-bold text-zinc-900">
                      {user?.name}
                    </p>
                    <button
                      onClick={() => {
                        handleLogout();
                        setMenuOpen(false);
                      }}
                      className="text-xs text-red-600 font-semibold mt-0.5 underline hover:text-red-700 transition-colors"
                    >
                      Logout Account
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex gap-3 w-full lg:hidden">
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-2.5 text-sm font-bold shadow-rounded-md text-zinc-900 border border-zinc-900/30 bg-amber-500/20 rounded-lg hover:bg-white/20 rounded-md transition-all"
                  >
                    Log In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMenuOpen(false)}
                    className="flex-1 text-center py-2.5 text-sm font-bold shadow-rounded-md text-black rounded-lg hover:bg-zinc-900 rounded-md transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {isCartOpen && (
        <CartModel
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
      {isWishOpen && (
        <WishModel
          products={wishProducts}
          isOpen={isWishOpen}
          onClose={handleWishToggle}
        />
      )}
    </>
  );
};

export default Navbar;