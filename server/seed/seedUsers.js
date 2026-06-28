import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("🟡 MongoDB Connected");

    const adminExists = await User.findOne({
      email: "admin@vastralaya.com",
    });

    if (adminExists) {
      console.log("⚠️ Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Admin",
      email: "admin@vastralaya.com",
      password: hashedPassword,
      role: "admin",

      // ✅ REQUIRED FIELDS ADDED
      phone: "9800000000",
      address: {
        city: "Kathmandu",
      },
    });

    console.log("✅ Admin seeded successfully");
    process.exit();
  } catch (error) {
    console.log("❌ Seed error:", error.message);
    process.exit(1);
  }
};

seedUsers();