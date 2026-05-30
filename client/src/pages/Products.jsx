import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const GENDER_SUBCATEGORIES = {
  men: ["shirt", "pant", "tshirt", "coat"],
  women: ["saree", "kurtha", "lehenga"],
  kids: ["tshirt", "pant"]
};

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isGridLoading, setIsGridLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const currentGender = (searchParams.get("gender") || "men").toLowerCase(); 
  const currentSubcategory = (searchParams.get("subcategory") || "all").toLowerCase();

  useEffect(() => {
    async function loadLocalClothesApi() {
      setIsGridLoading(true);
      setApiError(null);
      
      try {
        const response = await fetch("/clothes.json");
        
        if (!response.ok) {
          throw new Error("Failed to load local clothes database.");
        }
        
        const data = await response.json();
        setAllProducts(data);
      } catch (error) {
        console.error("Local API Error:", error);
        setApiError("Could not load products. Please try again later.");
      } finally {
        setIsGridLoading(false);
      }
    }

    loadLocalClothesApi();
  }, []);

  useEffect(() => {
    if (allProducts.length === 0) return;

    const filtered = allProducts.filter((item) => {
      const matchGender = item.gender.toLowerCase() === currentGender;
      const matchSub = currentSubcategory === "all" || item.subcategory.toLowerCase() === currentSubcategory;
      return matchGender && matchSub;
    });

    setFilteredProducts(filtered);
  }, [currentGender, currentSubcategory, allProducts]);

  const updateFilters = (gender, subcategory) => {
    setSearchParams({ 
      gender: gender.toLowerCase(), 
      subcategory: subcategory.toLowerCase() 
    });
  };

  return (
    <div className="w-full min-h-screen bg-white pt-32 pb-20 selection:bg-gray-100">
      <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-20">
        
        {/* Item Counter Section */}
        <div className="flex items-center justify-end border-b border-gray-100 pb-4 mb-8 md:mb-12">
          <div className="text-[11px] sm:text-[12px] font-mono tracking-widest text-gray-600 font-medium uppercase">
            [{filteredProducts.length} items found]
          </div>
        </div>

        {/* Layout Wrapper */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Left Sidebar Section with Left Margin (pl-2 md:pl-0) */}
          <aside className="w-full md:w-auto flex-shrink-0 pl-2 md:pl-0">
            <div className="sticky top-24 md:top-36 w-full">
              <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 scrollbar-none w-full">
                <button
                  onClick={() => updateFilters(currentGender, "all")}
                  className={`px-5 py-2.5 rounded-lg text-left text-[11px] sm:text-[12px] font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap md:w-36 flex-shrink-0 ${
                    currentSubcategory === "all"
                      ? "bg-gray-950 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-950 hover:bg-gray-100 active:scale-95"
                  }`}
                >
                  All Clothes
                </button>
                
                {GENDER_SUBCATEGORIES[currentGender]?.map((subSegment) => (
                  <button
                    key={subSegment}
                    onClick={() => updateFilters(currentGender, subSegment)}
                    className={`px-5 py-2.5 rounded-lg text-left text-[11px] sm:text-[12px] font-bold tracking-wider uppercase transition-all duration-300 whitespace-nowrap md:w-36 flex-shrink-0 ${
                      currentSubcategory === subSegment
                        ? "bg-gray-950 text-white shadow-md"
                        : "text-gray-600 hover:text-gray-950 hover:bg-gray-100 active:scale-95"
                    }`}
                  >
                    {subSegment}s
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Balanced Product Grid */}
          <main className="flex-1 w-full pr-2 md:pr-0">
            {apiError ? (
              <div className="py-24 text-center text-red-600 text-xs font-semibold tracking-wide">{apiError}</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 w-full">
                {isGridLoading ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-100 h-72 sm:h-80 w-full rounded-2xl" />
                  ))
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product.id} className="transition-all duration-300 hover:translate-y-[-4px] w-full">
                      <ProductCard product={product} isLoading={false} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-24 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50/50">
                    <p className="text-gray-500 text-xs font-semibold tracking-wide">
                      No items found matching this subcategory.
                    </p>
                  </div>
                )}
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  );
}