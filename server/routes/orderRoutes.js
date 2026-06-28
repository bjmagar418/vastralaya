import express from "express";
import {
  createOrder,
  getAllOrders,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/orderController.js";

import auth from "../middleware/auth.js"; // or "../services/auth.js" depending on where auth.js is

const router = express.Router();

// Customer
router.post("/", auth, createOrder);
router.get("/myorders", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

// For now, remove admin protection
router.get("/", auth, getAllOrders);
router.put("/:id/status", auth, updateOrderStatus);

export default router;