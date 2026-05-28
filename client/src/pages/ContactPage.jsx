import React from "react";
import { Link } from "react-router";
import { IoLaptopSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCircle, FaRegCommentDots, FaPaperPlane } from "react-icons/fa";

const ContactPage = () => {
  return (
    <section>
      <div className="flex flex-col text-center   bg-primary">
        <div className="bg-primary  p-12">
          <h1 className="text-brown text-2xl text-left md:text-4xl xl:text-5xl font-bold mb-8">
            Contact Us
          </h1>
          <p className="text-left font-bold text-black text-xl">
            We're here to help. Reach out to us through any of the channels
            below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/*second  part*/}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-4 py-10 md:px-12 md:py-12 lg:px-12  lg:py-1 xl:px-22 xl:py-15">
        {/* Left column */}
        <div className="w-full  lg:w-1/2 space-y-6 shadow-lg p-3">
          <div className="flex gap-2 items-center text-3xl px-4  sm:text-4xl md:text-5xl lg:text-4xl xl:text-xl xl:text-color-blue font-bold leading-tight">
            <IoLaptopSharp className="text-4xl text-blue-600" />
            <p className=" text-base xl:text-xl text-blue-600 ">
              For Shopping and Acessories
            </p>
          </div>
          <div className="flex items-center gap-2 px-4">
            <FaPhoneAlt className="text-base font-bold text-blue-500" />
            <p className="text-base xl:text-xl font-bold text-taupe-500">
              +9779820343434
            </p>
          </div>
        </div>
        {/* Right column */}
        <div className="w-full  lg:w-1/2 space-y-6 shadow-lg p-3">
          <div className="flex gap-2 items-center text-3xl px-4  sm:text-4xl md:text-5xl lg:text-4xl xl:text-xl xl:text-color-blue font-bold leading-tight">
            <IoLaptopSharp className=" text-4xl text-blue-600" />
            <p className=" text-base xl:text-xl text-blue-600">
              For Problems and Acessories
            </p>
          </div>
          <div className="flex items-center gap-2 px-4">
            <FaPhoneAlt className="text-base font-bold text-blue-500" />
            <p className="text-base xl:text-xl font-bold text-taupe-500">
              +9779820343434
            </p>
          </div>
        </div>
      </div>

      {/*third part*/}

      <div className="p-15 ">
        <div className="bg-gray-100 rounded-xl py-20 px-6 flex flex-col justify-center items-left text-left text-sm xl:text-xl">
          <p className="text-black text-xl md:text-4xl xl:text-2xl xl:text-left font-bold mb-8">
            Quick Help
          </p>
          <p className="text-black text-left text-base md:text-4xl xl:text-base font-bold mb-8">
            To get info about our store location, please visit our{" "}
            <span className="text-blue-600 relative inline-block">
              Store Location page.
            </span>
          </p>
          <p className="text-black text-left text-base md:text-4xl xl:text-base font-bold mb-8">
            For answers to common questions, browse our{" "}
            <span className="text-blue-600 relative inline-block">
              FAQ page.
            </span>
          </p>
          <p className="text-black  text-left text-base md:text-4xl xl:text-base font-bold mb-8">
            For questions about your scheduled home delivery, please visit our{" "}
            <span className="text-blue-600 relative inline-block">
              Delivery Information{" "}
            </span>
            page.{" "}
          </p>
          <p className="text-black text-left text-base xl:text-base font-bold">
            If you need help with something more specific, have an in-store
            question, or need to contact us urgently, our{" "}
            <span className="text-blue-600 relative inline-block">
              24/7 live chat{" "}
            </span>
            is a great way to get the help you need.
          </p>
        </div>
      </div>

      {/*fourth part*/}
      <div className=" rounded-3xl overflow-hidden w-full p-14 mx-auto shadow-xl">
        {/* Header */}
        <div className=" px-6 py-6 flex flex-col gap-1">
          <h1 className="font-bold text-black text-xl xl:text-3xl">
            Still looking for an answer?
          </h1>
          <p className="text-sm xl:text-base text-black max-w-lg">
            We're here to help. Please contact us and we'll make sure you get
            the information you need.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col xl:flex-row min-h-[500px] gap-6 px-5">
          {/* Left - Chat Channels */}
          <div className=" shadow-xlp-6 rounded-xl flex flex-col gap-4 xl:w-90 xl:shrink-0">
            <p className="text-[0.65rem] font-semibold tracking-widest uppercase text-[#7a5c3a] xl:text-xl">
              Reach us via
            </p>

            {/* WhatsApp Card */}
            <div className="w-full shadow-xl rounded-2xl p-9  flex flex-col gap-2 cursor-pointer hover:shadow-2xl hover:border-[#c87941] transition-colors duration-200">
              <div className="flex items-center gap-2 ">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-green-400 text-lg" />
                </div>
                <span className="font-semibold text-black text-sm">
                  WhatsApp
                </span>
              </div>
              <p className="text-xs text-black leading-relaxed">
                Our live chat agents are happy to help you right away.
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">
                  Online
                </span>
              </div>
            </div>

            {/* Live Chat Card */}
            <div className="shadow-xl rounded-2xl p-4 flex flex-col gap-2 cursor-pointer hover:shadow-2xl hover:border-[#c87941] transition-colors duration-200">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <FaRegCommentDots className="text-orange-400 text-lg" />
                </div>
                <span className="font-semibold text-black text-sm">
                  Live Chat
                </span>
              </div>
              <p className="text-xs text-black leading-relaxed">
                Connect instantly with a support agent in our chat window.
              </p>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs font-medium text-green-400">
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="flex-1 shadow-2xl p-6 xl:p-10 flex flex-col">
            <h2 className="font-bold text-[#1c1209] text-lg xl:text-2xl mb-6">
              Send us your comments
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4a3520] tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ddd0bb] rounded-xl bg-white text-[#1c1209] placeholder-[#bba98c] outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 transition"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-[#4a3520] tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ddd0bb] rounded-xl bg-white text-[#1c1209] placeholder-[#bba98c] outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 transition"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#4a3520] tracking-wide">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ddd0bb] rounded-xl bg-white text-[#1c1209] placeholder-[#bba98c] outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 transition"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-[#4a3520] tracking-wide">
                  Write your message
                </label>
                <textarea
                  placeholder="Type your message here..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 text-sm border border-[#ddd0bb] rounded-xl bg-white text-[#1c1209] placeholder-[#bba98c] outline-none focus:border-[#c87941] focus:ring-2 focus:ring-[#c87941]/20 transition resize-y"
                />
              </div>
            </div>

            {/* Submit */}
            <button className="mt-6 self-start sm:self-auto w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-2.5 bg-[#c87941] hover:bg-[#a85f2e] text-white text-sm font-semibold rounded-xl transition-colors duration-200">
              <FaPaperPlane className="text-sm" />
              Submit
            </button>
          </div>
        </div>
      </div>

      {/*fifth part*/}

      <div className="grid grid-cols-1 justify-center align-items:center xl:grid-cols-3 gap-4 px-20 py-12">
        <div className="flex items-center gap-3 ">
          <i className="ri-caravan-line text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div>
            <h1 className="font-bold text-sm lg:text-base">
              Free Express shipping on thousand of items.
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Exclusive For Hukut Customers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 xl:px-15 ">
          <i className="ri-error-warning-line  text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div>
            <h1 className="font-bold text-sm lg:text-base">
              100% Genuine Products.
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              Branded Authentic Items
            </p>
          </div>
        </div>
        <div className="flex items-center  ">
          <i className="ri-refund-2-line  text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div>
            <h1 className="font-bold text-sm lg:text-base">
              Lower prices than any other e-commerce store.
            </h1>
            <p className="text-xs lg:text-sm text-gray-500">
              We won't be beat on price.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
