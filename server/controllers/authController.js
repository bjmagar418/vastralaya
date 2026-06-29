import authService from "../services/authService.js";
import jwt from "../utils/jwt.js";

const registerUser = async (req, res) => {
  try {
    const input = req.body;

    const createdUser = await authService.registerUser(input);

    const token = jwt.createToken({
      id: createdUser._id || createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    });

    res.cookie("authToken", token, {
      maxAge: 3600 * 1000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser,
      token,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const input = req.body;

    if (!input.email && !input.phone) {
      return res.status(400).json({
        success: false,
        message: "Email or phone number is required",
      });
    }

    if (!input.password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const loginData = await authService.loginUser(input);

    const token = jwt.createToken({
      id: loginData._id || loginData.id,
      email: loginData.email,
      role: loginData.role,
    });

    res.cookie("authToken", token, {
      maxAge: 3600 * 1000, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: loginData,
      token,
    });
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message || "Invalid credentials",
    });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No active session found",
      });
    }

    // Uncomment if your service implements logout logic
    // await authService.logout(token);

    res.clearCookie("authToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const data = await authService.forgotPassword(email);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const data = await authService.resetPassword(req.body);

    return res.status(200).json(data);
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message,
    });
  }
};

export default {
  registerUser,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
};