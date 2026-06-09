import React, { useEffect, useState } from 'react';
import axios from "axios";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const [categories,setCategories] =useState([]);

  useEffect(() =>{
    const fetchCategories = async() => {
      const res = await axios.get("http://localhost:5005/api/products/categories");
     
      setCategories(res.data.categories || []);
    };
    fetchCategories();
  },[])
  return (
        <div>
          <h1  className="text-center text-base font-bold mb-6 p-2 sm:text-center sm:text-lg">Featured Category</h1>
        <div  className=" sm:grid grid-cols-7  gap-4 p-14 categories_div1">
      {(categories || []).map((category, index) => (
      
        <CategoryCard
          key={index}
          category={category}
        />
      ))}
      </div>  
    
    </div>
  );
}

export default Categories;

