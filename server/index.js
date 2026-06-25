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

dotenv.config();
connectDB();

const app = express();

// CORS configuration
// Note: When credentials: "include" is used on the client, origin cannot be "*"
// We must specify the exact origin(s) allowed to send credentialed requests
const corsOptions = {
  origin: process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL || "http://localhost:5173"
    : ["http://localhost:5173", "http://localhost:3000", "http://localhost:5174"],
  credentials: true,
};
app.use(cors(corsOptions));

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
app.use("/api/review", reviewRoute);

// Live Dashboard API Route
app.get('/api/dashboard/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // 1. Verify the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid User ID format' });
    }

    // 2. Fetch the user profile from your manual database uploads
    const user = await User.findById(userId).select('-password'); // Never send back the password hash
    
    if (!user) {
      return res.status(404).json({ error: 'User profile not found. Please check the ID.' });
    }
    
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar || '/avatar.jpg', // Fallback avatar placeholder
        rewardPoints: user.rewardPoints,
        availableCoupons: user.availableCoupons,
        memberSince: user.createdAt, // Provided automatically by your new schema timestamps
        defaultPaymentMethod: user.defaultPaymentMethod || 'Not Added',
        addresses: user.addresses
      },
      stats: {
        totalOrders: 12, // Toggle dynamically later via: await Order.countDocuments({ user: userId })
        wishlistItems: 7
      },
      recentOrders: [
        { orderId: '#ORD12345', date: 'May 10, 2024', amount: 2199, status: 'Delivered' },
        { orderId: '#ORD12344', date: 'May 06, 2024', amount: 2499, status: 'Shipped' },
        { orderId: '#ORD12343', date: 'Apr 28, 2024', amount: 1999, status: 'Processing' },
        { orderId: '#ORD12342', date: 'Apr 20, 2024', amount: 2399, status: 'Delivered' },
        { orderId: '#ORD12341', date: 'Apr 15, 2024', amount: 1499, status: 'Cancelled' }
      ]
    });

  } catch (err) {
    console.error(`Error loading dashboard for user: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// TEST
app.get("/", (req, res) => {
  res.send("Vastralaya Server is Running!");
});

const PORT = config.port || 5005;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});