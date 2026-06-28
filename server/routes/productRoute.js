import express from "express";
import multer from "multer";

import productController from '../controllers/productController.js'
import auth from "../middleware/auth.js";
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/role.js";
import { ROLE_MERCHANT } from "../constants/role.js";
import validate from "../middleware/validator.js";
import { productSchema } from "../libs/schemas/product.schema.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


// router.post(
//   "/",
//   auth,
//   roleBasedAuth([ROLE_ADMIN, ROLE_MERCHANT]),
//   validate(productSchema),
//   productController.createProduct,
// );
router.post(
  "/",
  auth,
  roleBasedAuth([ROLE_ADMIN, ROLE_MERCHANT]),
  upload.array("images", 5),
  validate(productSchema),
  productController.createProduct,
);


router.get("/",productController.getAllProducts);
router.get("/categories",productController.getCategories);

router.get("/category/:category",productController.getProductsByCategory)
router.get("/brands", productController.getBrands);
router.get("/category", productController.getCategory);
router.get("/totalCount", productController.getTotalCount);



router.get("/:id", productController.getProductById);
  

router.get("/related/:id", productController.getRelatedProducts);


router.delete(
  "/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  productController.deleteProduct,
);


export default router;

