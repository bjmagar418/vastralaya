import React from 'react';
<<<<<<< HEAD
import blogsData from '../../data/blogs.json';

const Blogs = () => {
  return (
    <div className="w-full px-4 sm:px-9 lg:px-5 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogsData.map((blog, index) => (
          <div
            key={index}
            className="relative flex items-end justify-between bg-[#f2e8e0] rounded-xl
                       overflow-hidden cursor-pointer hover:scale-[1.02]
                       transition-all duration-300 min-h-[180px] sm:min-h-[200px] p-5"
          >
            {/* Left: text content */}
            <div className="flex flex-col gap-2 z-10 max-w-[55%]">
              <h6 className="font-poppins text-[10px] tracking-widest text-blue-500
                             uppercase font-semibold">
                {blog.subtitle}
              </h6>
              <h4 className="text-[1rem] sm:text-[1.1rem] font-bold text-gray-900
                             leading-snug font-poppins sm:cursor-pointer cursor-pointer ">
                {blog.title}
              </h4>
              <button
                className="mt-2 bg-black text-white text-xs sm:text-sm font-medium
                           px-4 py-2 rounded-md w-fit active:bg-red-500
                           transition-colors duration-200 sm:hover:bg-red-500 cursor-pointer" 
              >
                {blog.button}
              </button>
            </div>

            {/* Right: image floats to bottom-right */}
            <div className="absolute right-0 bottom-0 h-full w-[45%]">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="h-full w-full object-cover object-center
                           mask-image-[linear-gradient(to_right,transparent_0%,black_40%)]"
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
=======
import blogsData from '../../data/blogs.json'

const Blogs = () => {
  return (
    <div className='Blogs_container grid grid-cols-3 gap-5'>
        {blogsData.map((blog,index)=>(
            <div key={index} className=' flex flex-row-reverse items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300 bg-[#f2e8e0] rounded-lg'>
           <img src={blog.imageUrl} alt='blog image' className='mask-radial-[100%_100%] mask-radial-from-75% mask-radial-at-right rounded-md'/>
            <div className='flex flex-col gap-2 font-medium blogs_content'>
                <h6 className='font-mono text-xs text-blue-500 uppercase dark:text-blue-400'>{blog.subtitle}</h6>
                <h4 className='mt-2 text-base text-gray-700 dark:text-gray-300'>{blog.title}</h4>
                <p className='bg-black text-white font-light  hover:bg-red-500 cursor-pointer text-base text-center rounded-md '>{blog.date}</p>
            </div>
            </div>
        ))}
      {/* <div className='bg-red-500'>1</div>
            <div className='bg-amber-400'>2</div>
      <div className='bg-amber-800'>3</div> */}

    </div>
  )
}

export default Blogs
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
