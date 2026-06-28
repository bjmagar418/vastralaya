import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import ResetPassword from "../models/ResetPassword.js";
import sendEmail from "../utils/email.js";
import config  from "../config/config.js";


const registerUser = async(data) =>{
  // validate phone format if provided
  if (data.phone) {
    const phoneRegex = /^\+977\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      throw {
        status: 400,
        message: "Phone must be in format +977XXXXXXXXXX",
      };
    }
  }
  const user = await User.findOne({
    $or: [{ email: data?.email }, { phone: data?.phone }],
  });
  if (user) {
    throw new Error("User already exists with this email");
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(data.password, salt);
  try {
    //    const { username, email, password } = req.body;
    //const createdUser = new User.create({ email, username, password });  ///do this
    const createdUser = await User.create({
      ...data,
      password: hashPassword,
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
    console.log("REGISTER ERROR:", error);
    throw error;
  }
}

const loginUser = async ({ email, phone, password }) => {
  // validate phone format if provided
  if (phone && !/^\+977\d{10}$/.test(phone)) {
    throw { status: 400, message: "Phone must be in format +977XXXXXXXXXX" };
  }

  const user = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (!user) {
    throw {
      status: 404,
      message: "User not found",
    };
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw {
      status: 401,
      message: "Password not match",
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
};;

const logout = async (token) => {
  try {
    // Optional: blacklist the token in DB or cache (e.g. Redis)
    // await TokenBlacklist.create({ token });

    // Optional: clear token from DB if stored on login
    // await UserSession.deleteOne({ token });

    return { success: true };
  } catch (error) {
    throw new Error("Logout service failed: " + error.message);
  }
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
    token: token,
  });

  const link = `${config.appUrl}/reset-password?userId=${user._id}&token=${token}`;
  //Send email with reset password link

  sendEmail({
    recipient: email,
    subject: "Reset password link",
    html: `
      <div
        style="
          padding: 16px;
          font-family: sans-serif
        "
      >
        <h1>Please click the link to reset your password.</h1>
        <a
          href="${link}"
          style="
            background-color: steelblue;
            color: white;
            text-decoration: none;
            padding: 8px 32px;
            border-radius: 5px;
          "
          >Reset password</a
        >
      </div>
    `,
  });

  return {
    message: "Reset password link sent to you email address",
  };
};

const resetPassword = async (input) => {
  const data = await ResetPassword.findOne({
    userId: input.userId,
    expiresAt: { $gt: Date.now() },
  }).sort({ createdAt: -1 });

  if (!data || data.token != input.token) {
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

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(input.password, salt);

  await User.findByIdAndUpdate(input.userId, {
    password: hashedPassword,
  });

  await ResetPassword.findByIdAndUpdate(data._id, {
    isUsed: true,
  });

  return { message: "Password reset successful." };
};





export default {registerUser, loginUser,logout,forgotPassword,resetPassword};