import React from 'react';

const Promotional = () => {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-6 py-8 lg:px-16 lg:py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 justify-items-center items-center">
        
        {/* 1. Free Delivery */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 lg:gap-4 w-full justify-center">
          <i className="ri-caravan-line text-4xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-bold text-sm lg:text-base text-gray-900 tracking-wide whitespace-nowrap">Free Delivery</h1>
            <p className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">On Orders above NPR 999</p>
          </div>
        </div>

        {/* 2. Free Returns */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 lg:gap-4 w-full justify-center">
          <i className="ri-refund-2-line text-4xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-bold text-sm lg:text-base text-gray-900 tracking-wide whitespace-nowrap">Free Returns</h1>
            <p className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">Within 7 days</p>
          </div>
        </div>

        {/* 3. Secure Payments */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 lg:gap-4 w-full justify-center">
          <i className="ri-git-repository-private-line text-4xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-bold text-sm lg:text-base text-gray-900 tracking-wide whitespace-nowrap">Secure Payments</h1>
            <p className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">100% secure</p>
          </div>
        </div>

        {/* 4. 24/7 Support */}
        <div className="flex flex-col md:flex-row items-center text-center md:text-left gap-3 lg:gap-4 w-full justify-center">
          <i className="ri-notification-line text-4xl lg:text-5xl text-[#d23141] shrink-0"></i>
          <div className="flex flex-col items-center md:items-start">
            <h1 className="font-bold text-sm lg:text-base text-gray-900 tracking-wide whitespace-nowrap">24/7 Support</h1>
            <p className="text-xs lg:text-sm text-gray-500 whitespace-nowrap">We are here to help</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Promotional;