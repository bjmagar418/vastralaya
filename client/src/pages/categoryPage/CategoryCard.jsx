import React from "react";
import { Link } from "react-router";

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/categories/${category.name}`}>
      <div className="  sm:rounded-xl overflow-hidden shadow hover:shadow-lg transition cursor-pointer">
        <img
          src={category.imageUrl}
          alt={category.name}
          className="w-full h-52 object-cover"
        />

        <div className="p-4 text-center">
          <h3 className="text-lg font-semibold capitalize">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;