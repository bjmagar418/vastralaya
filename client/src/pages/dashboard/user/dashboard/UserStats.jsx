import React from 'react'

const UserStats = ({stats}) => {
  return (
    <div className="my-6 space-y-6">
  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 grid-cols-1">
    
    {/* 1. Total Payments Card */}
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-indigo-700 rounded-2xl shadow-[0_8px_25px_rgba(59,130,246,0.15)] p-6 text-white transform hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
      {/* Decorative background watermark flare */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100/80 bg-white/10 px-2 py-0.5 rounded-md">Financial Summary</span>
          <span className="p-2 bg-white/10 rounded-xl text-blue-200 group-hover:text-white transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-blue-100/90 tracking-wide">Total Payments</h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 font-mono">
            NPR {stats?.totalPayments ? Number(stats.totalPayments).toLocaleString([], { minimumFractionDigits: 2 }) : "0.00"}
          </p>
        </div>
      </div>
    </div>

    {/* 2. Total Reviews Card */}
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-800 rounded-2xl shadow-[0_8px_25px_rgba(79,70,229,0.15)] p-6 text-white transform hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
      {/* Decorative background watermark flare */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-100/80 bg-white/10 px-2 py-0.5 rounded-md">Feedback Logs</span>
          <span className="p-2 bg-white/10 rounded-xl text-amber-300 group-hover:text-amber-200 transition-colors duration-300">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-indigo-100/90 tracking-wide">Total Reviews</h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 font-mono">
            {stats?.totalReviews || 0}
          </p>
        </div>
      </div>
    </div>

    {/* 3. Total Purchased Products Card */}
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-800 rounded-2xl shadow-[0_8px_25px_rgba(37,99,235,0.15)] p-6 text-white transform hover:scale-[1.03] transition-all duration-300 group cursor-pointer">
      {/* Decorative background watermark flare */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-all duration-500" />
      
      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100/80 bg-white/10 px-2 py-0.5 rounded-md">Item Metrics</span>
          <span className="p-2 bg-white/10 rounded-xl text-emerald-300 group-hover:text-emerald-200 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </span>
        </div>
        <div>
          <h2 className="text-sm font-medium text-blue-100/90 tracking-wide">Total Purchased Products</h2>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1 font-mono">
            {stats?.totalPurchasedProducts || 0}
          </p>
        </div>
      </div>
    </div>

  </div>
</div>

  )
}

export default UserStats