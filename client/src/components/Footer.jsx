import React from "react";
import { Link } from "react-router";

import esewa from "../assets/esewa.png";
import khalti from "../assets/khalti.jpg";
import visa from "../assets/visa.jpg";
import mastercard from "../assets/mastercard.png";
import footerlogo from "../assets/logo.png";

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
    </>
  );
};

export default Footer;
