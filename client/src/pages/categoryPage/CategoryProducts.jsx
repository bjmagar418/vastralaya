// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { useParams } from "react-router-dom";
// // import { FaShoppingCart, FaRegHeart } from "react-icons/fa"; 
// // import { useDispatch,useSelector } from "react-redux";

// // // 1. Uncomment and ensure these paths point correctly to your slice files
// // import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
// // import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

// // const CategoryProducts = () => {
// //   const { category } = useParams();
// //   const [products, setProducts] = useState([]);
// //   const dispatch = useDispatch();

// //   useEffect(() => {
// //     const fetchCategoryProducts = async () => {
// //       try {
// //         const res = await axios.get(
// //           `http://localhost:5005/api/products/category/${category}`
// //         );
// //         setProducts(res.data.products);
// //       } catch (error) {
// //         console.error(error);
// //       }
// //     };
// //     fetchCategoryProducts();
// //   }, [category]);

// //   // 2. Uncomment the dispatch functions here



// //     const cartProducts = useSelector((state) => state.cart.products);
// //   const wishProducts = useSelector((state) => state.wish.products);
  
// //   const isInCart = (id) => cartProducts.some((item) => item._id === id);
// //   const isInWish = (id) => wishProducts.some((item) => item._id === id);


// //   const handleAddToCart = (product, e) => {
// //     e.preventDefault();
// //     isInCart(product._id)
// //       ? dispatch(removeFromCart({ id: product._id }))
// //       : dispatch(addToCart(product));
// //   };


// //   const handleAddToWish = (product, e) => {
// //     e.preventDefault();
// //     isInWish(product._id)
// //       ? dispatch(removeFromWish({ id: product._id }))
// //       : dispatch(addToWish(product));
// //   };

// //   return (
// //     <div>
// //       <h1 className="text-center text-md font-bold mb-2 p-4">
// //         Featured Category
// //       </h1>
// //       <h2 className="text-center text-xl font-semibold mb-6 capitalize">
// //         {category}
// //       </h2>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-5"> 
// //         {products.map((product) => (
// //           <div
// //             key={product._id}
// //             className="relative rounded-lg shadow p-4 flex flex-col gap-2 bg-white group hover:shadow-md transition"
// //           >
            
// //             {/* Heart / Wishlist Button (Top Left Corner) */}
// //             <button
// //               onClick={() => handleAddToWishlist(product)}
// //               className="absolute top-5 left-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-black hover:text-red-500 shadow-sm cursor-pointer transition"
// //               title="Add to Wishlist"
// //             >
// //               <FaRegHeart size={18} />
// //             </button>

// //             {/* Cart Button (Top Right Corner) */}
// //             <button
// //               onClick={() => handleAddToCart(product)}
// //               className="absolute top-5 right-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full text-black hover:text-blue-600 shadow-sm cursor-pointer transition"
// //               title="Add to Cart"
// //             >
// //               <FaShoppingCart size={18} />
// //             </button>

// //             {/* Product Image */}
// //             <img
// //               src={product.imageUrl}
// //               alt={product.name}
// //               className="w-full h-40 sm:h-48 md:h-52 object-cover rounded hover:scale-102 transition duration-300"
// //             />
            
// //             {/* Product Info */}
// //             <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
// //               {product.name}
// //             </h3>
// //             <p className="text-sm sm:text-base font-bold text-gray-700">NPR. {product.price}</p>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default CategoryProducts;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa"; // Imported FaHeart for active states
// import { useDispatch, useSelector } from "react-redux";

// // 1. Redux Actions
// import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
// import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

// const CategoryProducts = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);
//   const dispatch = useDispatch();

//   // 2. Redux State Selectors
//   const cartProducts = useSelector((state) => state.cart.products);
//   const wishProducts = useSelector((state) => state.wish.products);
  
//   const isInCart = (id) => cartProducts.some((item) => item._id === id);
//   const isInWish = (id) => wishProducts.some((item) => item._id === id);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:5005/api/products/category/${category}`
//         );
//         setProducts(res.data.products);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchCategoryProducts();
//   }, [category]);

//   // 3. Toggle Handlers
//   const handleAddToCart = (product, e) => {
//     e.preventDefault();
//     isInCart(product._id)
//       ? dispatch(removeFromCart({ id: product._id }))
//       : dispatch(addToCart(product));
//   };

//   const handleAddToWish = (product, e) => {
//     e.preventDefault();
//     isInWish(product._id)
//       ? dispatch(removeFromWish({ id: product._id }))
//       : dispatch(addToWish(product));
//   };

//   return (
//     <div>
//       <h1 className="text-center text-md font-bold mb-2 p-4">
//         Featured Category
//       </h1>
//       <h2 className="text-center text-xl font-semibold mb-6 capitalize">
//         {category}
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-5"> 
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="relative rounded-lg shadow p-4 flex flex-col gap-2 bg-white group hover:shadow-md transition"
//           >
            
//             {/* Heart / Wishlist Button (Top Left Corner) */}
//             <button
//               onClick={(e) => handleAddToWish(product, e)}
//               className={`absolute top-5 left-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer transition ${
//                 isInWish(product._id) ? "text-red-500" : "text-black hover:text-red-500"
//               }`}
//               title={isInWish(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
//             >
//               {isInWish(product._id) ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
//             </button>

//             {/* Cart Button (Top Right Corner) */}
//             <button
//               onClick={(e) => handleAddToCart(product, e)}
//               className={`absolute top-5 right-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer transition ${
//                 isInCart(product._id) ? "text-green-500" : "text-black hover:text-blue-600"
//               }`}
//               title={isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
//             >
//               <FaShoppingCart size={18} />
//             </button>

//             {/* Product Image */}
//             <img
//               src={product.imageUrl}
//               alt={product.name}
//               className="w-full h-40 sm:h-48 md:h-52 object-cover rounded hover:scale-102 transition duration-300"
//             />
            
//             {/* Product Info */}
//             <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
//               {product.name}
//             </h3>
//             <p className="text-sm sm:text-base font-bold text-gray-700">NPR. {product.price}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryProducts;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaShoppingCart, FaHeart, FaRegHeart } from "react-icons/fa"; // Imported FaHeart for active states
import { useDispatch, useSelector } from "react-redux";

// 1. Redux Actions
import { addToCart, removeFromCart } from "../../redux/features/cart/cartSlice";
import { addToWish, removeFromWish } from "../../redux/features/wish/wishSlice";

const CategoryProducts = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  // 2. Redux State Selectors
  const cartProducts = useSelector((state) => state.cart.products);
  const wishProducts = useSelector((state) => state.wish.products);
  
  const isInCart = (id) => cartProducts.some((item) => item._id === id);
  const isInWish = (id) => wishProducts.some((item) => item._id === id);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5005/api/products/category/${category}`
        );
        setProducts(res.data.products);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategoryProducts();
  }, [category]);

  // 3. Toggle Handlers
  const handleAddToCart = (product, e) => {
    e.preventDefault();
    isInCart(product._id)
      ? dispatch(removeFromCart({ id: product._id }))
      : dispatch(addToCart(product));
  };

  const handleAddToWish = (product, e) => {
    e.preventDefault();
    isInWish(product._id)
      ? dispatch(removeFromWish({ id: product._id }))
      : dispatch(addToWish(product));
  };

  return (
    <div>
      <h1 className="text-center text-md font-bold mb-2 p-4">
        Featured Category
      </h1>
      <h2 className="text-center text-xl font-semibold mb-6 capitalize">
        {category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:p-5"> 
        {products.map((product) => (
          <div
            key={product._id}
            className="relative rounded-lg shadow p-4 flex flex-col gap-2 bg-white group hover:shadow-md transition"
          >
            
            {/* Heart / Wishlist Button (Top Left Corner) */}
            <button
              onClick={(e) => handleAddToWish(product, e)}
              className={`absolute top-5 left-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer transition ${
                isInWish(product._id) ? "text-red-500" : "text-black hover:text-red-500"
              }`}
              title={isInWish(product._id) ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isInWish(product._id) ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            </button>

            {/* Cart Button (Top Right Corner) */}
            <button
              onClick={(e) => handleAddToCart(product, e)}
              className={`absolute top-5 right-5 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-sm cursor-pointer transition ${
                isInCart(product._id) ? "text-green-500" : "text-black hover:text-blue-600"
              }`}
              title={isInCart(product._id) ? "Remove from Cart" : "Add to Cart"}
            >
              <FaShoppingCart size={18} />
            </button>

            {/* Product Image */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 sm:h-48 md:h-52 object-cover rounded hover:scale-102 transition duration-300"
            />
            
            {/* Product Info */}
            <h3 className="mt-2 font-semibold text-sm sm:text-base line-clamp-2">
              {product.name}
            </h3>

            {/* --- Category Tag Added Here --- */}
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">
              {product.category || category}
            </p>

            <p className="text-sm sm:text-base font-bold text-gray-700">NPR. {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryProducts;