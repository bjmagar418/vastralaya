import express from "express";
import orderController from "../controllers/orderController.js"; // Adjust path as needed
import auth from '../middleware/auth.js';
import roleBasedAuth from "../middleware/roleBasedAuth.js";
import { ROLE_ADMIN } from "../constants/role.js";
import { ROLE_MERCHANT } from "../constants/role.js";

const router = express.Router();

router.post("/create-checkout-session", orderController.createCheckoutSession);
router.post("/confirm-payment", orderController.confirmPayment);
router.get("/order/:id", orderController.getOrderById);

router.get("/:email",orderController.getOrderByEmail);

// get all orders by admin and merchant
router.get(
  "/",
  auth,
  roleBasedAuth([ROLE_ADMIN,ROLE_MERCHANT]),
  orderController.getAllOrdersByAdmin,
);

// update orders status  by merchant
router.patch(
  "/update-order-status/:id",
  auth,
  roleBasedAuth([ROLE_ADMIN, ROLE_MERCHANT]),
  orderController.updateOrderStatus
);

// update orders status  by merchant
router.delete(
  "/delete-order/:id",
  auth,
  roleBasedAuth(ROLE_ADMIN),
  orderController.deleteOrder
);
export default router;
