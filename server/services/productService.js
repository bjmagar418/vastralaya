import Product from "../models/products.js";
const getAllProducts = async (limit) => {
  let products = Product.find();

  if (limit) {
    products = products.limit(Number(limit));
  }

  return await products;
};

const createProduct = async (productData,userId) => {

  return await Product.create({...productData,createdBy:userId});
// return await Product.create(productData);
};

const getProductById = async (id) => {
  const product = await Product.findById(id);

  return product;
};


const getAllCategories = async() =>{
  const categories = await  Product.aggregate([
    {
      $group:{
        _id:"$category",
        imageUrl:{$first:"$imageUrl"},
        count: {$sum:1},
      }
    },
    {
      $sort:{count:-1},  //most used categories first
    },
    {
      $project:{
        _id:0,
        name:"$_id",
        imageUrl:1,
        count:1,
      }
    },
    {
      $limit:7
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
  return await Product.findByIdAndUpdate(id, input,{new:true});
};

const deleteProduct = async (id) =>{
 await Product.findByIdAndDelete(id);
}

export default {
  getAllProducts,
  createProduct,
  getAllCategories,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};
