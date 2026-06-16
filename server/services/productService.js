import { Query } from "mongoose";
import Product from "../models/products.js";
import Reviews from "../models/reviews.js";
const getAllProducts = async (query) => {
  const { name, category, brands, page=1,limit=10, color, min, max, createdBy } = query;
 const filter = {};
     
  if (category) filter.category = category;
  if (brands) filter.brand = { $in: brands.split(",") };
  if (name) filter.name = { $regex: name, $options: "i" };

  if (min || max) {
    filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);
  }
  if (createdBy) filter.createdBy = createdBy;
  if (color) filter.color = color;

 // const sort = query.sort ? JSON.parse(query.sort) : { createdAt: -1 };
  //const limit = query.limit ? Number(query.limit) : 10;
 // const offset = query.offset ? Number(query.offset) : 0;
 let sort = { createdAt: -1 };
 if (query.sort) {
   try {
     sort = JSON.parse(query.sort);
   } catch (e) {
     // If it's just a string like "price", use it directly
     sort = { [query.sort]: -1 };
   }
 }
 const skip= (parseInt(page) -1 ) * parseInt(limit);
const totalProducts = await Product.countDocuments(filter)
const totalPages = Math.ceil(totalProducts / parseInt(limit));


  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sort)
    .populate("createdBy","name email");
   
    
 //console.log(filter);
  return await { products, totalPages, totalProducts };
};;

// const createProduct = async (productData, userId) => {
//   return await Product.create({ ...productData, createdBy: userId });
//   // return await Product.create(productData);
//   // calculate reviews

// };

const createProduct = async (productData, userId) => {
  
  // 1. Create and save the new product with the creator's ID
  const savedProduct = await Product.create({
    ...productData,
    createdBy: userId,
  });

  // 2. Fetch existing reviews for this specific product ID
  const reviews = await Reviews.find({ productId: savedProduct._id });

  // 3. Calculate and update the average rating if reviews exist
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);

    const averageRating = totalRating / reviews.length;
    savedProduct.rating = averageRating;

    // Save the updated product with its new rating
    await savedProduct.save();
  }

  // 4. Return the final product document
  return savedProduct;
};




const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};

const getAllCategories = async () => {
  const categories = await Product.aggregate([
    {
      $group: {
        _id: "$category",
        imageUrl: { $first: "$imageUrl" },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 }, //most used categories first
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        imageUrl: 1,
        count: 1,
      },
    },
    {
      $limit: 7,
    },
  ]);
  return categories;
};

const getProductsByCategory = async (category) => {
  return await Product.find({
    category: { $regex: new RegExp(`^${category}$`, "i") },
  });
};

const updateProduct = async (id, input) => {
  return await Product.findByIdAndUpdate(id, input, { new: true });
};

const deleteProduct = async (id) => {
  await Product.findByIdAndDelete(id);
};

const getBrands = async () =>{
  return await Product.distinct("brand");
};

const getCategory = async() =>{
  return await Product.distinct("category");
}

const  getTotalCount = async() =>{
  return await Product.countDocuments();
}

const getRelatedProducts = async (id) => {
  const product = await Product.findById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Create a regex to find similar products based on keywords in the title
  const keywords = product.name.split(" ").filter((word) => word.length > 1);
  const titleRegex = new RegExp(keywords.join("|"), "i");

  const relatedProducts = await Product.find({
    _id: { $ne: id }, // Exclude the current product
    $or: [
      { name: { $regex: titleRegex } }, // Match similar names
      { category: product.category }, // Match the same category
    ],
  });

  return relatedProducts;
};


export default {
  getAllProducts,
  createProduct,
  getAllCategories,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
  getBrands,
  getCategory,
  getTotalCount,
  getRelatedProducts
};
