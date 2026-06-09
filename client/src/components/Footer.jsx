import React from "react";
import { Link } from "react-router";

import esewa from "../assets/esewa.png";
import khalti from "../assets/khalti.jpg";
import visa from "../assets/visa.jpg";
import mastercard from "../assets/mastercard.png";
import footerlogo from "../assets/logo.png";

<<<<<<< HEAD
const Footer = () => {
  return (
    <>
      <footer className="w-full bg-black text-white mt-8">

        <div className="max-w-[1400px] mx-auto px-6 py-10 lg:px-16">

          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1.2fr_1fr_1fr_1.2fr_1.5fr]">

            {/* ── 1. Brand ── */}
            <div className="flex flex-col items-center text-center gap-4 sm:col-span-2 lg:col-span-1 lg:items-start lg:text-left">
              {/* Logo + name */}
              <div className="flex flex-col items-center gap-2 lg:flex-col lg:items-start lg:gap-1 border-b border-gray-700">
                <img
                  src={footerlogo}
                  alt="Vastralaya logo"
                  className="h-14 w-14 object-contain flex-shrink-0 lg:h-8 lg:w-8"
                />
                <span className="font-extrabold text-base leading-tight tracking-wide uppercase">
                  Vastralaya
                  <br />
                  <span className="font-normal text-xs text-white tracking-widest normal-case">
                    Redefine Your Style
                  </span>
                </span>
              </div>

              <p className="text-sm text-white max-w-[280px] leading-relaxed">
                Your one-stop destination for premium fashion for Men, Women &amp; Kids.
              </p>

              {/* Social icons */}
              <div className="flex gap-4 text-2xl">
                <i className="ri-facebook-circle-fill hover:text-blue-400 cursor-pointer transition-colors"></i>
                <i className="ri-instagram-fill hover:text-pink-400 cursor-pointer transition-colors"></i>
                <i className="ri-twitter-fill hover:text-sky-400 cursor-pointer transition-colors"></i>
                <i className="ri-youtube-fill hover:text-red-500 cursor-pointer transition-colors"></i>
              </div>
            </div>

            {/* ── 2. Information ── */}
            <div className="flex flex-col items-center text-center gap-2 lg:items-start lg:text-left">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                Information
              </h4>
              {["About Us", "Contact Us", "Our Stores", "Careers"].map((item) => (
                <Link key={item} to="/" className="text-sm text-white hover:text-red-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            {/* ── 3. Customer Service ── */}
            <div className="flex flex-col items-center text-center gap-2 lg:items-start lg:text-left">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                Customer Service
              </h4>
              {["FAQ", "Shipping Policy", "Return Policy", "Track Order"].map((item) => (
                <Link key={item} to="/" className="text-sm text-white hover:text-red-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            {/* ── 4. My Account ── */}
            <div className="flex flex-col items-center text-center gap-2 lg:items-start lg:text-left">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                My Account
              </h4>
              {["My Profile", "Orders", "Wishlist", "Address"].map((item) => (
                <Link key={item} to="/" className="text-sm text-white hover:text-red-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            {/* ── 5. Policies ── */}
            <div className="flex flex-col items-center text-center gap-2 lg:items-start lg:text-left">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                Policies
              </h4>
              {["Privacy Policy", "Terms & Conditions", "Refund Policy"].map((item) => (
                <Link key={item} to="/" className="text-sm text-white hover:text-red-400 transition-colors">
                  {item}
                </Link>
              ))}
            </div>

            {/* ── 6. Contact Us ── */}
            <div className="flex flex-col items-center text-center gap-3 lg:items-start lg:text-left">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                Contact Us
              </h4>
              <p className="flex items-start gap-2 text-sm text-white">
                <i className="ri-map-pin-2-fill text-white mt-0.5 flex-shrink-0"></i>
                <span>XYZ, Kathmandu, Nepal</span>
              </p>
              <p className="flex items-start gap-2 text-sm text-white">
                <i className="ri-mail-fill text-white mt-0.5 flex-shrink-0"></i>
                <span>vastrala@gmail.com</span>
              </p>
              <p className="flex items-start gap-2 text-sm text-white">
                <i className="ri-phone-fill text-white mt-0.5 flex-shrink-0"></i>
                <span>+977 9800000000</span>
              </p>
            </div>

            {/* ── 7. We Accept ── */}
            <div className="flex flex-col items-center gap-3 lg:items-start">
              <h4 className="w-full mb-2 text-base font-extrabold text-white uppercase tracking-wider border-b border-gray-700 pb-2 text-center lg:text-left">
                We Accept
              </h4>
              {/* Mobile: centered 2×2 grid | Laptop: 2×2 grid full width */}
              <div className="grid grid-cols-2 gap-3 w-[160px] lg:w-full">
                {[
                  { src: esewa, alt: "eSewa" },
                  { src: khalti, alt: "Khalti" },
                  { src: visa, alt: "Visa" },
                  { src: mastercard, alt: "Mastercard" },
                ].map(({ src, alt }) => (
                  <div
                    key={alt}
                    className="
                      h-[44px] lg:h-[52px]
                      bg-white rounded-lg p-1.5 cursor-pointer
                      hover:ring-2 hover:ring-red-400 transition-all
                      flex items-center justify-center
                    "
                  >
                    <img
                      src={src}
                      alt={alt}
                      className="w-full h-full object-contain rounded"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800" />

        {/* Copyright */}
        <div className="bg-black text-center text-white text-xs py-4 px-4 tracking-wide">
          Copyright &copy; {new Date().getFullYear()}{" "}
          <span className="font-bold text-white">VASTRALAYA</span>. All Rights Reserved.
        </div>

      </footer>
=======
import image3 from "../assets/favicon.png";
const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container text-amber-50">
        <div className="flex flex-col col-span-1">
          <p className="flex">
            <span>
              <img
                src={footerlogo}
                alt=""
                className="h-12 w-16 text-amber-50"
              />
            </span>
            VASTRALAYA REDFINE YOUR STYLE
          </p>
          <p className=" text-sm w-[250px]">
            Your one-stop destination for premium fashion for Men,Women & Kids.
          </p>
          <div className="flex text-3xl gap-3">
            <i className="ri-facebook-circle-fill hover:text-blue-500 rounded-xl bg-white-500 cursor-pointer"></i>
            <i className="ri-instagram-fill  hover:text-blue-500  bg-white-500 cursor-pointer"></i>
            <i className="ri-twitter-fill hover:text-blue-500  bg-white-500 cursor-pointer"></i>
            <i className="ri-youtube-fill hover:text-blue-500 bg-white-500 cursor-pointer"></i>
          </div>
        </div>
        <div className="flex flex-col ">
          <h4 className="font-bold mb-1 ">Information</h4>
          <Link href="/" className="text-sm ">
            About Us
          </Link>
          <Link href="/" className="text-sm">
            Contact Us
          </Link>
          <Link href="/" className="text-sm">
            Our Stores
          </Link>
          <Link href="/" className="text-sm">
            Careers
          </Link>
        </div>
        <div className="flex-col">
          <h4>Customer Service</h4>
          <Link href="/" className="text-sm">
            FAQ
          </Link>
          <Link href="/" className="text-sm">
            Shipping Policy
          </Link>
          <Link href="/" className="text-sm">
            Return Policy
          </Link>
          <Link href="/" className="text-sm">
            Track Order
          </Link>
        </div>
        <div className=" flex flex-col">
          <h4>My Account</h4>
          <Link href="/" className="text-sm">
            My Profile
          </Link>
          <Link href="/" className="text-sm">
            Orders
          </Link>
          <Link href="/" className="text-sm">
            Wishlist
          </Link>
          <Link href="/" className="text-sm">
            Address
          </Link>
        </div>
        <div className="flex flex-col">
          <h4>Policies</h4>
          <Link href="/" className='text-sm' >Privacy Policy</Link>
          <Link href="/" className='text-sm' >Terms and conditions</Link>
          <Link href="/" className='text-sm' >Refund Policy</Link>
        </div>
        <div className="flex flex-col w-[150px] cols-span-2 col-start-6 col-end-7">
          <h4>Contact Us</h4>
          <p className="flex gap-2 className='text-sm' ">
            <span>
              <i className="ri-map-pin-2-fill"></i>
            </span>
             <text className="text-sm">XYZ</text>
          </p>
          <p className="flex gap-2 className='text-sm' ">
            <span>
              <i className="ri-mail-fill"></i>
            </span>
            <text className="text-sm">Vastrala@gmail.com</text>
          </p>
          <p className="flex gap-2 className='text-sm' ">
            <span>
              <i className="ri-phone-fill"></i>
            </span>
            <text className="text-sm">+971526936273</text>
          </p>
        </div>
        <div className="footer__col">
          <h4 className="text-center">We Accept</h4>
          <div className="grid grid-cols-4 gap-2 w-[300px]">
            <div className="w-15">
              <img
                src={esewa}
                alt="esewa"
                className="rounded-md cursor-pointer"
              />
            </div>
            <div className="w-15">
              {" "}
              <img
                src={khalti}
                alt="khalti"
                className="rounded-md cursor-pointer"
              />
            </div>
            <div className="w-15">
              <img
                src={visa}
                alt="visa"
                className="rounded-md cursor-pointer"
              />
            </div>
            <div className="w-15">
              <img
                src={mastercard}
                alt="mastercard"
                className="rounded-md cursor-pointer"
              />
            </div>
          </div>
        </div>
      </footer>
      <div className="footer_copyright text-center bg-black text-white ">
        Copyright &copy; VASTRALAYA .All right Reserved;
      </div>
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
    </>
  );
};

export default Footer;
