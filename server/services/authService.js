import User from "../models/User.js";
import bcrypt from "bcryptjs";

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
export default {registerUser, loginUser,logout};