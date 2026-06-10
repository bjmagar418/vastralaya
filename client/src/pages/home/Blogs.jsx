import React from 'react';
import blogsData from '../../data/blogs.json';

const Blogs = () => {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-16 py-8 max-w-[1400px] mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="relative flex items-end justify-between bg-[#f2e8e0] rounded-xl
                       overflow-hidden cursor-pointer hover:scale-[1.02]
                       transition-all duration-300 min-h-[180px] sm:min-h-[200px] p-5 shadow-sm"
          >
            {/* Left side text contents */}
            <div className="flex flex-col gap-2 z-10 max-w-[55%]">
              <h6 className="font-poppins text-[10px] tracking-widest text-blue-600
                             uppercase font-bold">
                {blog.subtitle}
              </h6>
              <h4 className="text-[1rem] sm:text-[1.1rem] font-bold text-gray-900
                             leading-snug font-poppins">
                {blog.title}
              </h4>
              <button
                className="mt-2 bg-black text-white text-xs font-semibold
                           px-4 py-2 rounded-md w-fit active:bg-red-500
                           transition-colors duration-200 sm:hover:bg-red-500 cursor-pointer" 
              >
                {blog.button || 'Read More'}
              </button>
            </div>

            {/* Right side image layout with advanced CSS mask overlays */}
            <div className="absolute right-0 bottom-0 h-full w-[45%]">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="h-full w-full object-cover object-center"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 40%)',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;