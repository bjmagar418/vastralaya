import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import connectDB from "./config/db.js";
import config from "./config/config.js";

import authRoutes from "./routes/authRoutes.js";
import userRoute from "./routes/userRoute.js";
import productsRoute from "./routes/productRoute.js";
import reviewRoute from "./routes/reviewRoute.js";

import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";
<<<<<<< HEAD
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
=======

dotenv.config();
connectDB();

const app = express();

// CORS
>>>>>>> 622f74401f3f7abab73f1ddce8bbc6f41144d882
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// BODY PARSER (clean)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// REMOVE bodyParser.json() ❌ (not needed)

// Cookies
app.use(cookieParser());

// Logger
app.use(logger);

// ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoute);
app.use("/api/products", productsRoute);
<<<<<<< HEAD

app.use("/api/reviews", reviewRoute);
app.use("/api/orders",auth, orderRoute);
app.use("/api/stats", statsRoute);


=======
app.use("/api/review", reviewRoute);
>>>>>>> 622f74401f3f7abab73f1ddce8bbc6f41144d882

// TEST
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

const PORT = config.port || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});