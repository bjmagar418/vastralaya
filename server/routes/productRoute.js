import express from "express";
import productController from '../controllers/productController.js'

const router = express.Router();

router.post("/", productController.createProduct);

router.get("/",productController.getAllProducts);

router.get("/categories",productController.getCategories);

router.get("/category/:category",productController.getProductsByCategory)

router.get("/:id", productController.getSingleProduct);
export default router;
