import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productsRoutes from "./routes/productsRoutes.js";
import seedUsers from "./seed/seedUsers.js";

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);

// Run seed ONLY ONCE safely
seedUsers();

// Test Route
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});