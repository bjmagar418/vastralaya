import User from "../models/User.js";
import Order from "../models/Order.js";
import Reviews from "../models/reviews.js";
import Products from "../models/products.js";
import mongoose from "mongoose";

/**
 * Fetch statistics for a specific user by email
 */
const getUserStatsByEmail = async (email) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User not found");
  }

  const totalPaymentsResult = await Order.aggregate([
    { $match: { email } },
    { $group: { _id: null, totalAmount: { $sum: "$amount" } } },
  ]);
  const totalPaymentsAmount =
    totalPaymentsResult.length > 0 ? totalPaymentsResult[0].totalAmount : 0;

  const totalReviews = await Reviews.countDocuments({ userId: user._id });

  const purchasedProductIds = await Order.distinct("products.productId", {
    email,
  });
  const totalPurchasedProducts = purchasedProductIds.length;

  return {
    totalPayments: totalPaymentsAmount.toFixed(2),
    totalReviews,
    totalPurchasedProducts,
  };
};

/**
 * Fetch statistics for the admin dashboard (Global overview)
 */
const getAdminStats = async () => {
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Products.countDocuments();
  const totalReviews = await Reviews.countDocuments();
  const totalUsers = await User.countDocuments();

  const totalMerchants = await User.countDocuments({
    role: { $regex: /^merchant$/i },
  });

  const totalEarningsResult = await Order.aggregate([
    { $group: { _id: null, totalEarnings: { $sum: "$amount" } } },
  ]);
  const totalEarnings =
    totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

  const monthlyEarningsResult = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        monthlyEarnings: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const monthlyEarnings = monthlyEarningsResult.map((entry) => ({
    month: entry._id.month,
    year: entry._id.year,
    earnings: entry.monthlyEarnings.toFixed(2),
  }));

  return {
    totalOrders,
    totalProducts,
    totalReviews,
    totalUsers,
    totalMerchants,
    totalEarnings,
    monthlyEarnings,
  };
};

/**
 * Fetch statistics for the merchant dashboard (Now mirrored to match Admin global overview)
 */
const getMerchantStats = async (merchantId) => {
  // Even though merchantId is passed, we fetch global metrics to mirror the admin completely
  const totalOrders = await Order.countDocuments();
  const totalProducts = await Products.countDocuments();
  const totalReviews = await Reviews.countDocuments();
  const totalUsers = await User.countDocuments();



  // Calculate platform-wide earnings
  const totalEarningsResult = await Order.aggregate([
    { $group: { _id: null, totalEarnings: { $sum: "$amount" } } },
  ]);
  const totalEarnings =
    totalEarningsResult.length > 0 ? totalEarningsResult[0].totalEarnings : 0;

  // Calculate platform-wide monthly earnings breakdown
  const monthlyEarningsResult = await Order.aggregate([
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, year: { $year: "$createdAt" } },
        monthlyEarnings: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  const monthlyEarnings = monthlyEarningsResult.map((entry) => ({
    month: entry._id.month,
    year: entry._id.year,
    earnings: entry.monthlyEarnings.toFixed(2),
  }));

  return {
    totalOrders,
    totalProducts,
    totalReviews,
    totalUsers,
    totalEarnings,
    monthlyEarnings,
  };
};

export default {
  getUserStatsByEmail,
  getAdminStats,
  getMerchantStats,
};
