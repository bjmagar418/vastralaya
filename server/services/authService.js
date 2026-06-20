import User from "../models/User.js";
import bcrypt from "bcryptjs";

const registerUser = async (data) => {
  try {
    const { name, email, password, phone, address } = data;

    // Validate required fields
    if (!name || !email || !password || !phone) {
      throw {
        status: 400,
        message: "All required fields must be provided",
      };
    }

    // Validate phone format
    const phoneRegex = /^\+977\d{10}$/;

    if (!phoneRegex.test(phone)) {
      throw {
        status: 400,
        message: "Phone must be in format +977XXXXXXXXXX",
      };
    }

    // Check existing user
    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { phone },
      ],
    });

    if (existingUser) {
      throw {
        status: 409,
        message: "User already exists with this email or phone number",
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const createdUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone,
      address: {
        city: address?.city || "Kathmandu",
        province: address?.province || "",
      },
    });

    return {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      phone: createdUser.phone,
      address: createdUser.address,
      role: createdUser.role,
      isActive: createdUser.isActive,
      profileImageUrl: createdUser.profileImageUrl,
      createdAt: createdUser.createdAt,
    };

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    throw {
      status: error.status || 500,
      message: error.message || "Registration failed",
    };
  }
};

const loginUser = async ({ email, phone, password }) => {
  try {
    if (!password) {
      throw {
        status: 400,
        message: "Password is required",
      };
    }

    if (!email && !phone) {
      throw {
        status: 400,
        message: "Email or phone is required",
      };
    }

    if (phone && !/^\+977\d{10}$/.test(phone)) {
      throw {
        status: 400,
        message: "Phone must be in format +977XXXXXXXXXX",
      };
    }

    const user = await User.findOne({
      $or: [
        ...(email ? [{ email: email.toLowerCase() }] : []),
        ...(phone ? [{ phone }] : []),
      ],
    });

    if (!user) {
      throw {
        status: 404,
        message: "User not found",
      };
    }

    const isPasswordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordMatch) {
      throw {
        status: 401,
        message: "Invalid password",
      };
    }

    return {
      _id: user._id,
      address: user.address,
      phone: user.phone,
      email: user.email,
      name: user.name,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      isActive: user.isActive,
    };

  } catch (error) {
    throw {
      status: error.status || 500,
      message: error.message || "Login failed",
    };
  }
};

const logout = async () => {
  return { success: true };
};

export default {
  registerUser,
  loginUser,
  logout,
};