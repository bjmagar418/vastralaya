import React from 'react'

const Promotional = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-7 py-6 lg:pl-24 lg:pr-8 lg:py-8">
      
      <div className="flex items-center gap-3 lg:gap-5">
        <i className="ri-caravan-line text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
        <div>
          <h1 className="font-bold text-sm lg:text-base">Free Delivery</h1>
          <p className="text-xs lg:text-sm text-gray-500">On Orders above NPR 999</p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <i className="ri-refund-2-line text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
        <div>
          <h1 className="font-bold text-sm lg:text-base">Free Returns</h1>
          <p className="text-xs lg:text-sm text-gray-500">Within 7 days</p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <i className="ri-git-repository-private-line text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
        <div>
          <h1 className="font-bold text-sm lg:text-base">Secure Payments</h1>
          <p className="text-xs lg:text-sm text-gray-500">100% secure</p>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-5">
        <i className="ri-notification-line text-3xl lg:text-5xl text-[#d23141] shrink-0"></i>
        <div>
          <h1 className="font-bold text-sm lg:text-base">24/7 Support</h1>
          <p className="text-xs lg:text-sm text-gray-500">We are here to help</p>
        </div>
      </div>

    </div>
  )
}

export default Promotional