import React from "react";
import heroImage from '../assets/category-3.jpg';
import { Link } from "react-router";
import brandsData from "../data/brands.json";

const AboutPage= () => {
  return (
  <section >
  <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-4 py-10 md:px-12 md:py-12 lg:px-16 lg:py-14 xl:px-22 xl:py-15 bg-primary">
 {/* Left column */}
  <div className="w-full  lg:w-1/2 space-y-6">
    <h1 className="flex flex-col text-3xl text-center sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
      About Vastralaya
      <span className="text-blue-600 relative inline-block">
        Nepal's emerging
      </span>
      Shopping Store
    </h1>
    <p className="text-gray-600 text-base md:text-lg lg:text-base xl:text-xl max-w-xl">
      Get the most accurate leads, sales people training and
      conversion, dress and more — all within the same one billing.
    </p>
    <div className="flex flex-col sm:flex-row lg:flex-row gap-4">
              <Link className="text-center px-5 py-2.5 lg:px-6 lg:py-3 bg-sky-500 hover:bg-sky-700 rounded-sm text-white font-bold duration-300 ease-out mx-auto sm:active:bg-red-500">
        Contact Us
      </Link>
      <Link className="text-center px-5 py-2.5  lg:px-6 lg:py-3 bg-sky-500 hover:bg-sky-700 rounded-sm text-white font-bold duration-300 ease-out mx-auto sm:active:bg-red-500">
        Explore products
      </Link>

    </div>
  </div>

  {/* Right column */}
  <div className="w-full lg:w-1/2">
    <div className="relative lg:pl-8 xl:pl-12">
      <img
        src={heroImage}
        alt="hero image"
        className="w-full lg:max-h-[420px] xl:max-h-[500px] object-cover rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300"
      />
    </div>
  </div>
  </div>
   

   {/*second part*/}
  <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-4 py-10 md:px-12 md:py-12 lg:px-1  lg:py-1 xl:px-22 xl:py-15">
 {/* Left column */}
  <div className="w-full  lg:w-1/2 space-y-6">
    <h1 className="flex flex-col text-3xl text-center sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
      Shopping
at Your Fingertips:
      <span className="text-blue-600 relative inline-block">
        Nepal's emerging
      </span>
    </h1>
  </div>
  {/* Right column */}
  <div className="w-full lg:w-1/2">
    <div className="relative lg:pl-8 xl:pl-12 gap-3">
        <h4 className="text-black text-xl">At Vastralaya, we're not just another ecommerce platform. We specialize in bringing you top-tier tech products at unbeatable prices.</h4>
    <p className="py-3">Serving the entire expanse of Nepal, our mission is to ensure every shopping enthusiast finds their desired shopping at a cost that doesn't break the bank. We curate with intention, ensuring every pixel, every circuit, and every interface meets our rigorous standards of quality.</p>
    </div>
  </div>
  </div>

  {/*third part*/}
  
    <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-4 py-10 md:px-12 md:py-12 lg:px-12  lg:py-1 xl:px-22 xl:py-15">
 {/* Left column */}
  <div className="w-full  lg:w-1/2 space-y-6 shadow-lg bg-">
    <h1 className="flex flex-col text-3xl px-4 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
     700+
    </h1>
        <h2 className="text-blue-600 relative inline-block px-4">
        Products Available
      </h2>
      <p className="p-4">From trending devices to timeless favorites, our array is meticulously curated to satiate every tech craving.</p>
  </div>
  {/* Right column */}
 <div className="w-full  lg:w-1/2 space-y-6 shadow-lg">
    <h1 className="flex flex-col text-3xl  px-4 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
     50+
    </h1>
        <h2 className="text-blue-600 relative inline-block px-4">
        Tech Brands
      </h2>
      <p className="p-4">At Hukut, variety reigns supreme. With over 50 tech brands, we curate diverse innovations, ensuring every tech palate finds its match.</p>
  </div>
   <div className="w-full  lg:w-1/2 space-y-6 shadow-lg">
    <h1 className="flex flex-col text-3xl px-4 sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold leading-tight">
     1500+
    </h1>
        <h2 className="text-blue-600 relative px-4 inline-block">
        Products Available
      </h2>
      <p className="p-4">From trending devices to timeless favorites, our array is meticulously curated to satiate every tech craving.</p>
  </div>
  </div>

    {/*fourth part*/}

 <div className="flex flex-col lg:flex-row justify-between items-center gap-12 px-4 py-10 md:px-12 md:py-12 lg:px-16 lg:py-14 xl:px-22 xl:py-15">
 {/* Left column */}
  <div className="w-full lg:w-1/2 relative">
    <div className="relative lg:pl-8 xl:pl-12  ">
      <img
        src={heroImage}
        alt="hero image"
        className="w-full lg:max-h-[300px] xl:max-h-[300px] rounded-md shadow-xl object-cover rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 xl:p-2 absolute mr-6"
      />
    </div>
  </div>



  {/* Right column */}
   <div className="w-full  lg:w-1/2 space-y-6 ">
    <h1 className="flex flex-col text-base text-left sm:text-4xl md:text-5xl lg:text-3xl xl:text-2xl font-bold leading-tight">
      Who We Are For
      <span className="text-blue-600 py-1 relative inline-block text-base ">
     “Embracing all ages, backgrounds, and tech needs.”
      </span>
    </h1>
    <p className="text-gray-600 text-sm md:text-lg lg:text-base xl:text-base max-w-xl">
     Catering to a spectrum of age groups, Hukut embraces everyone. From tech-savvy youths searching for the latest gaming peripherals to the experienced middle-aged professionals seeking productivity tools, we've got gadgets for all. Our ecosystem is built on the belief that high-end tech should be inclusive.
    </p>
  </div>
  </div>

  {/*fifth part*/}
   <div className="">
      <h1 className="font-bold text-xl text-center sm:text-xl mb-6">
        Brands we work with
      </h1>

         {/* Brand logos — full width on mobile, 1 col on lg */}
        <div className="grid grid-cols-5 gap-4 lg:col-span-1 lg:h-32 xl:content-center">
          {brandsData.map((brand, index) => (
            <div key={index} className="w-full">
              <img
                src={brand.imageUrl}
                className="w-full h-10 object-contain"
                alt={`brand-${index}`}
              />
            </div>
          ))}
        </div>
</div>

  {/*sixth part*/}
{/* sixth part */}
<div className="p-15 ">
<div className="bg-blue-700 rounded-xl py-20 px-6 flex flex-col justify-center items-center text-center">
  <p className="text-white text-2xl md:text-4xl xl:text-5xl font-bold mb-8">
    Ready to upgrade your digital lifestyle?
  </p>

  <Link
    className="bg-amber-400 px-6 py-3 rounded-xl hover:bg-amber-700 transition-all duration-200 ease-in-out text-black font-semibold mx-auto"
  >
    Explore our Curator's choice
  </Link>
</div>
</div>


</section>
  );
};

export default AboutPage;