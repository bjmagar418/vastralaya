import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";
import config from "./config/config.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import productsRoute from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";
import orderRoute from "./routes/orderRoute.js";
import statsRoute from "./routes/statsRoute.js";

import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";

// Load environment variables
dotenv.config();

// Create app
const app = express();

// Connect database and cloudinary
connectDB();
connectCloudinary();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Cookies
app.use(cookieParser());

// Logger
app.use(logger);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoute);
app.use("/api/products", productsRoute);
app.use("/api/reviews", reviewRoute);
app.use("/api/orders", auth, orderRoute);
app.use("/api/stats", statsRoute);

// Test route
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

// Start server
const PORT = config.port || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});