import productService  from "../services/productService.js"

import fs from "fs/promises"
const getAllProducts = async (req, res) => {


    try {
        const limit = req.query.limit;
        const products = await productService.getAllProducts(limit);
        res.json(products);
    } catch (error) {
          res.status(500).json({
            message: error.message,
          });
    }

};

const createProduct = async (req,res) =>{
    const userId = req.user._id;
  
  try {
          const product= await productService.createProduct(req.body,userId);
    return res.status(201).json(product);

    } catch (error) {
            return res.status(500).json({ message: error.message });
    }
  
}

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Fetching product with ID:", id); // ADD THIS
    const product = await productService.getProductById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch product" });
  }
};


const getCategories = async(req,res) =>{
    try {
        const categories = await productService.getAllCategories();
        res.status(200).json({
          success: true,
          categories,
        });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
};

const getProductsByCategory = async(req,res) =>{
    try {
        const {category} = req.params;
        const products = await productService.getProductsByCategory(category);

        res.status(200).json({success:true,products,});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const updateProduct = async(req,res) =>{
  const id = req.params.id;
  const input = req.body;
  try{
const product = await productService.updateProduct(id,input);
return res.status(200).json(product);
  }catch(error) {
        res.status(500).json({ message: error.message });
  }
}

const deleteProduct = async(req,res) =>{
  const id = req.params.id;
  try{
    await productService.deleteProduct(id);
    return res.status(200).json({message:"Product deleted successfully"});
  }catch(error){
    res.status(500).json({message:error.message});
  }
}


 export default {getAllProducts,createProduct,getCategories,getProductsByCategory,getProductById,updateProduct,deleteProduct};