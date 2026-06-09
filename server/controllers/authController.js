<<<<<<< HEAD
import authService from "../services/authService.js";
import  jwt from "../utils/jwt.js";

const registerUser = async(req, res) => {
       const input = req.body;
   try{
     if (!input) {
       throw {
         message: "Invalid data",
       };
     }

     if (!input.email && !input.phone) {
       throw {
         message: "Email/phone number is required",
       };
     }

     if (!input.name) {
       throw {
         message: "name is required",
       };
     }

     if (!input.password) {
       throw {
         message: "Password is required",
       };
     }
     const createdUser = await authService.registerUser(input);
    
     
     const token = jwt.createToken({ ...createdUser});

     ///res.cookie("key",value,expireTime);
     res.cookie("authToken", token, {
       maxAge: 3600 * 1000, //1 hour
     });
    
     return res
       .status(201)
       .json({
         message: "User registered successfully",
         ...createdUser,
         token,
       });
   } catch(error){
  return res.status(500).json({message:error.message || "Server error"})
   }
}

const loginUser = async(req, res) => {
       const input = req.body;
          const { email, phone, password } = req.body;

   try{
     if (!input) {
       throw {
         message: "Invalid data",
       };
     }

     if (!input.email && !input.phone) {
       throw {
         message: "Email/phone number is required",
       };
     }

     if (!input.password) {
       throw {
         message: "Password is required",
       };
     }

     const loginUser = await authService.loginUser(input);

     const token =  jwt.createToken({...loginUser});
     
  ///res.cookie("key",value,expireTime);
res.cookie("authToken", token, {
  maxAge:3600 * 1000,  //1 hour
});

     return res
       .status(201)
       .json({ ...loginUser,token });
     // res.json(loginUser);
   } catch(error){
  return res.status(error.status || 400).json({message:error.message || "Server error"})
   }
}

const logout = async (req, res) => {
  try {
    const token = req.cookies?.authToken;

    if (!token) {
      return res.status(400).json({ message: "No active session found" });
    }

    await authService.logout(token);

    res.clearCookie("authToken", {
      maxAge: 3600 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed", error: error.message });
  }
};


export default {registerUser,loginUser,logout};
=======
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔐 TOKEN
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    res.status(201).json({
      message: "Signup successful",
    });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({
      message: err.message || "Server error",
    });
  }
};

//login user and return token

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
