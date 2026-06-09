import express from "express";
import Product from "../models/Products.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", async (req, res) => {
  try {
    const products = await Product.find({ category: "Tops" });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;