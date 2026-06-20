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

    const loginData = await authService.loginUser(input);

    const token = jwt.createToken({
      id: loginData._id || loginData.id,
      email: loginData.email,
      role: loginData.role,
    });

    res.cookie("authToken", token, {
      maxAge: 3600 * 1000,
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

    await authService.logout(token);

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

export default { registerUser, loginUser, logout };