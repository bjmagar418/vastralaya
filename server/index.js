import express from "express";
import fs from "fs";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
//import seedUsers from "./seed/seedUsers.js";

import userRoute from "../server/routes/userRoute.js";
import productRoutes from "../server/routes/productRoute.js"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import config from "./config/config.js";
import logger from "./middleware/logger.js";
import auth from "./middleware/auth.js";


dotenv.config();

connectDB();

const app = express();


// Middleware
app.use(express.json({ limit: "25mb" })); // Combined your json parsing and limits hereapp.use((express.urlencoded({ limited: "25mb" })));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials:true    // Adjust as needed for your frontend
  }),
);
app.use(logger);

// Routes

app.use("/api/products", productRoutes);
// Run seed ONLY ONCE safely
// seedUsers();
app.use("/api/users",auth, userRoute);

//auth routes
app.use("/api/auth", authRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

const PORT = config.port ;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});