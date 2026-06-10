import React from "react";
import { IoLaptopSharp } from "react-icons/io5";
import { FaPhoneAlt, FaWhatsapp, FaRegCommentDots, FaPaperPlane } from "react-icons/fa";

const ContactPage = () => {
  return (
    <section className="w-full bg-white text-left font-sans">
      
      {/* 1. Header Banner */}
      <div className="bg-[#f5eae1] w-full py-12 px-6 sm:px-12 md:px-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-black text-4xl md:text-5xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-gray-900 text-base md:text-lg font-medium max-w-4xl leading-relaxed">
            We're here to help. Reach out to us through any of the channels below and we'll get back to you as soon as possible.
          </p>
        </div>
      </div>

      {/* 2. Department Cards Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Shopping Card */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-3 font-bold text-blue-600 text-lg md:text-xl">
              <IoLaptopSharp className="text-2xl shrink-0" />
              <span>For Shopping and Accessories</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-semibold pl-1">
              <FaPhoneAlt className="text-sm shrink-0" />
              <span>+9779820343434</span>
            </div>
          </div>

          {/* Problems Card */}
          <div className="bg-white p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-center gap-3">
            <div className="flex items-center gap-3 font-bold text-blue-600 text-lg md:text-xl">
              <IoLaptopSharp className="text-2xl shrink-0" />
              <span>For Problems and Accessories</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 font-semibold pl-1">
              <FaPhoneAlt className="text-sm shrink-0" />
              <span>+9779820343434</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Quick Help Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-4">
        <div className="bg-gray-100 rounded-2xl p-8 md:p-10">
          <h2 className="text-black text-2xl font-bold mb-6">Quick Help</h2>
          <div className="space-y-4 text-base font-medium text-gray-900 leading-relaxed">
            <p>
              To get info about our store location, please visit our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Store Location page.</span>
            </p>
            <p>
              For answers to common questions, browse our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">FAQ page.</span>
            </p>
            <p>
              For questions about your scheduled home delivery, please visit our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Delivery Information page.</span>
            </p>
            <p>
              If you need help with something more specific, have an in-store question, or need to contact us urgently, our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">24/7 live chat</span>{" "}
              is a great way to get the help you need.
            </p>
          </div>
        </div>
      </div>

      {/* 4. Form Split Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-10">
        <div className="mb-8">
          <h2 className="text-black text-3xl font-bold mb-2">Still looking for an answer?</h2>
          <p className="text-gray-600 text-sm md:text-base">
            We're here to help. Please contact us and we'll make sure you get the information you need.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10">
          {/* Side Contact Cards */}
          <div className="w-full lg:w-1/3 space-y-6 shrink-0">
            <p className="text-xs font-bold tracking-widest text-[#7a5c3a] uppercase">Reach us via</p>
            
            {/* WhatsApp */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl p-6 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center shrink-0">
                  <FaWhatsapp className="text-green-500 text-xl" />
                </div>
                <span className="font-bold text-black">WhatsApp</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Our live chat agents are happy to help you right away.</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-600">Online</span>
              </div>
            </div>

            {/* Live Chat */}
            <div className="bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] rounded-2xl p-6 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                  <FaRegCommentDots className="text-orange-500 text-xl" />
                </div>
                <span className="font-bold text-black">Live Chat</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">Connect instantly with a support agent in our chat window.</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold text-green-600">Online</span>
              </div>
            </div>
          </div>

          {/* Message Form input fields */}
          <div className="flex-1 w-full bg-white border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.08)] rounded-2xl p-6 md:p-8">
            <h3 className="font-bold text-gray-900 text-xl mb-6">Send us your comments</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#4a3520]">Full Name</label>
                <input type="text" placeholder="Enter your full name" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#4a3520]">Email Address</label>
                <input type="email" placeholder="Enter your email address" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#4a3520]">Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition" />
              </div>
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold text-[#4a3520]">Write your message</label>
                <textarea placeholder="Type your message here..." rows={4} className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl outline-none focus:border-orange-400 transition resize-y" />
              </div>
            </div>

            <button className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#c87941] hover:bg-[#a85f2e] text-white text-sm font-bold rounded-xl transition shadow-md">
              <FaPaperPlane className="text-xs" />
              Submit
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default ContactPage;