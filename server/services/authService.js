import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from "../utils/email.js";
import config from "../config/config.js";

const registerUser = async (data) => {
  try {
    const { name, email, password, phone, address } = data;

    if (!name || !email || !password || !phone) {
      throw {
        status: 400,
        message: "All required fields must be provided",
      };
    }

    const phoneRegex = /^\+977\d{10}$/;

    if (!phoneRegex.test(phone)) {
      throw {
        status: 400,
        message: "Phone must be in format +977XXXXXXXXXX",
      };
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase() }, { phone }],
    });

    if (existingUser) {
      throw {
        status: 409,
        message: "User already exists with this email or phone number",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
  return {
    success: true,
    message: "Logout successful",
  };
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  const token = crypto.randomUUID();

  await ResetPassword.create({
    userId: user._id,
    token,
  });

  const link = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;

  await sendEmail({
    recipient: email,
    subject: "Reset Password Link",
    html: `
      <div style="padding:16px;font-family:sans-serif">
        <h2>Please click the button below to reset your password.</h2>
        <a
          href="${link}"
          style="
            background: steelblue;
            color: white;
            text-decoration: none;
            padding: 10px 24px;
            border-radius: 5px;
            display: inline-block;
          "
        >
          Reset Password
        </a>
      </div>
    `,
  });

  return {
    message: "Reset password link sent to your email address",
  };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    userId: input.userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token !== input.token) {
    throw {
      status: 400,
      message: "Invalid or expired link.",
    };
  }

  if (data.isUsed) {
    throw {
      status: 400,
      message: "Link already used.",
    };
  }

  const hashedPassword = await bcrypt.hash(input.password, 10);

  await User.findByIdAndUpdate(input.userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return {
    message: "Password reset successful.",
  };
};

export default {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
};