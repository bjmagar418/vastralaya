import React from 'react'

const Promotional = () => {
  return (
    <div className=" subscribe grid grid-cols-4 ">
      <div className="flex  items-center gap-5">
        <i className="ri-caravan-line text-5xl stroke-1"></i>
        <div>
          <h1 className="font-bold">Free Delivery</h1>
          <p>On Orders above NPR 999</p>
        </div>
      </div>
      <div className=" flex  items-center gap-5">
        <i className="ri-refund-2-line text-5xl"></i>
        <div>
          <h1 className="font-bold">Free Delivery</h1>
          <p>Within 7 days</p>
        </div>
      </div>
      <div className=" flex  items-center gap-5">
        <i className="ri-git-repository-private-line text-5xl"></i>
        <div>
          <h1 >Secure Payments</h1>
          <p>100% secure</p>
        </div>
      </div>
      <div className="  flex  items-center gap-5">
        <i className="ri-notification-line text-5xl font-thin text-[#]"></i>
        <div>
          <h1>24/7 Support</h1>
          <p>We are here to help</p>
        </div>
      </div>
    </div>
  )
}

export default Promotional
