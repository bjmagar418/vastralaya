import express from "express";
import productController from '../controllers/productController.js'
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/role.js";
import { ROLE_MERCHANT } from "../constants/role.js";

const router = express.Router();

router.post(
  "/",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.createProduct,
);


router.get("/",productController.getAllProducts);
router.get("/categories",productController.getCategories);

router.get("/category/:category",productController.getProductsByCategory)


router.get("/:id", productController.getProductById);

router.put(
  "/:id",
  auth,
  roleBasedAuth(ROLE_MERCHANT),
  productController.updateProduct,
);

router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  productController.deleteProduct,
);
export default router;

