

import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoute from "../server/routes/userRoute.js";
import productsRoute from "./routes/productRoute.js"; // Kept this one, removed the duplicate path
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "./config/config.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
import  reviewRoute from "./routes/reviewRoute.js"
import multer from "multer";
import connectCloudinary from "./config/cloudinary.js";
import orderRoute from "./routes/orderRoute.js";
import statsRoute from "./routes/statsRoute.js";



dotenv.config();


const app = express();

// Connect to Database
connectDB();
connectCloudinary();

// --- Middleware Configuration ---
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allowed alongside the explicit origin above
  }),
);

// Body parsers
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true })); // Fixed a small typo here ("limited" -> "limit")
app.use(cookieParser());
app.use(bodyParser.json()); // Optional, since express.json() already handles this

// Logging
app.use(logger);

// --- Routes ---

// Public Auth Routes
app.use("/api/auth", authRoutes);

// Protected User Routes (Requires Auth middleware)
app.use("/api/users", auth, userRoute);

// Product Routes
app.use("/api/products", productsRoute);

app.use("/api/reviews", reviewRoute);
app.use("/api/orders",auth, orderRoute);
app.use("/api/stats", statsRoute);




// Base Test Route
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

// --- Server Initialization ---
const PORT = config.port || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
