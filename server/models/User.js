import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    minlength: 3,
    maxlength: 50,
  },

  email: {
    type: String,
    required: [true, "User email is required"],
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex =
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Please enter a valid email address",
    },
  },

  password: {
    type: String,
    required: [true, "User password is required"],
    minlength: [6, "Password must be at least 6 characters long"],

    // Uncomment if you want strong password validation
    /*
    validate: {
      validator: (value) => {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

        return passwordRegex.test(value);
      },
      message:
        "Password must contain uppercase, lowercase, number, and special character",
    },
    */
  },

  phone: {
    type: String,
    required: [true, "User phone is required"],
    minlength: 6,
    maxlength: 14,
    unique: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  address: {
    city: {
      type: String,
      required: [true, "User city is required"],
    },

    province: {
      type: String,
    },
  },

  // System role (recommended)
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  // Business type/category
  userType: {
    type: String,
    enum: ["Customer", "Merchant", "Admin"],
    default: "Customer",
  },

  bio: {
    type: String,
  },

  profession: {
    type: String,
  },

  profileImageUrl: {
    type: String,
  },
});

export default mongoose.model("User", userSchema);