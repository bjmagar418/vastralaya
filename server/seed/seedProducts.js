import mongoose from "mongoose";
import dotenv from "dotenv";

import Product from "../models/products.js";
import User from "../models/User.js";

dotenv.config();

const SEED_COUNT = 25;

function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(arr, rnd) {
  return arr[Math.floor(rnd() * arr.length)];
}

const seedProducts = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log(
        "❌ MONGO_URI is missing in environment. Check server/.env or config.",
      );
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟡 MongoDB Connected");

    const admin = await User.findOne({ email: "admin@vastralaya.com" });
    if (!admin) {
      console.log("❌ Admin not found. Seed users first (seedUsers.js).");
      process.exit(1);
    }

    const exists = await Product.estimatedDocumentCount();
    if (exists && exists > 0) {
      console.log("⚠️ Products already exist. Skipping product seeding.");
      process.exit();
    }

    const rnd = mulberry32(123456);

    const names = [
      "Classic T-Shirt",
      "Everyday Hoodie",
      "Street Sneakers",
      "Denim Jacket",
      "Cotton Polo",
      "Wool Sweater",
      "Casual Shirt",
      "Leather Wallet",
      "Sports Cap",
      "Graphic Tee",
      "Chino Pants",
      "Sports Hoodie",
      "Formal Shirt",
      "Oversized Tee",
      "Running Shoes",
      "Backpack",
      "Socks Pack",
      "Beige Tote",
      "Summer Dress",
      "Winter Coat",
    ];

    const categories = [
      "tshirt",
      "hoodies",
      "shoes",
      "jackets",
      "shirts",
      "wallets",
      "caps",
      "pants",
      "bags",
      "socks",
      "dresses",
      "coats",
    ];

    const brands = ["Vastralaya", "Aster", "Nord", "Karma", "Nexa"];
    const colors = [
      "black",
      "white",
      "red",
      "blue",
      "green",
      "yellow",
      "gray",
      "brown",
    ];

    // Use existing static-ish images if you have them in your DB later.
    // For now, we keep it simple and use a placeholder.
    // Use a local data-URI placeholder so images always load (no external network dependency)
    const placeholderImg =
      "data:image/svg+xml;charset=utf-8,\n" +
      encodeURIComponent(
        `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"600\" height=\"600\" viewBox=\"0 0 600 600\">\n` +
          `<rect width=\"600\" height=\"600\" fill=\"#f3f4f6\"/>\n` +
          `<text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-family=\"Arial\" font-size=\"28\" fill=\"#111827\">Product</text>\n` +
          `</svg>`,
      );

    const docs = Array.from({ length: SEED_COUNT }).map((_, i) => {
      const category = pick(categories, rnd);
      const nameBase = pick(names, rnd);
      const brand = pick(brands, rnd);
      const color = pick(colors, rnd);

      const price = Math.floor(500 + rnd() * 4500); // 500 - 5000

      return {
        name: `${nameBase} ${i + 1}`,
        brand,
        price,
        description: `Seeded product ${i + 1}`,
        color,
        rating: Math.round(rnd() * 50) / 10, // 0.0 - 5.0
        category,
        imageUrl: placeholderImg,
        stock: 1 + Math.floor(rnd() * 20),
        createdBy: admin._id,
      };
    });

    await Product.insertMany(docs);
    console.log(`✅ Seeded ${docs.length} products`);
    process.exit();
  } catch (error) {
    console.log("❌ Seed products error:", error.message);
    process.exit(1);
  }
};

seedProducts();
