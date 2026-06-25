import mongoose from "mongoose";

// Define the address schema for multiple addresses (Home, Office, etc.)
const addressSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['Home', 'Office'], 
    default: 'Home' 
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  },
  fullName: String,
  addressLine: String,
  city: { 
    type: String, 
    required: [true, "City is required for address"] 
  },
  province: String,
  phone: String,
});

// Define the main user schema
const userSchema = new mongoose.Schema(
  {
    // --- Core Identity & Authentication ---
    name: {
      type: String,
      required: [true, "User name is required"],
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      lowercase: true,
      unique: true,
      validate: {
        validator: (value) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
      // Optional: Uncomment for strict password enforcement
      /*
      validate: {
        validator: (value) => {
          const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
          return passwordRegex.test(value);
        },
        message: "Password must contain at least one uppercase, lowercase, number, and special character."
      }
      */
    },
    phone: {
      type: String,
      required: [true, "User phone is required"],
      minLength: [6, "Phone number is too short"],
      maxLength: [14, "Phone number is too long"],
      unique: true,
    },

    // --- Roles & Status ---
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },

    // --- E-commerce Profile Data ---
    avatar: {
      type: String, // Consolidated profileImageUrl and avatar into one field
      default: "",
    },
    rewardPoints: { 
      type: Number, 
      default: 0 
    },
    availableCoupons: { 
      type: Number, 
      default: 0 
    },
    defaultPaymentMethod: {
      type: String,
    },
    
    // --- Addresses Array ---
    addresses: [addressSchema],
  },
  {
    // Automatically handles createdAt (memberSince) and updatedAt
    timestamps: true, 
  }
);

export default mongoose.model("User", userSchema);