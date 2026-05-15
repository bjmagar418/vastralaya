import React from 'react';
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
