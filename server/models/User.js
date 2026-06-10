
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "user email is required"],
    lowercase: true,
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Please enter a valid email address",
    },
  },
  password: {
    type: String,
    required: [true, "user password is required"],
    minLength: [6, "password must be at least 6 characters long"],
//  validate: {   

//   validator: (value) =>{
//     const passwordRegex =
//      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
//     return passwordRegex.test(value);
//   },
//  message: "Password must be at least 6,uppercase,lowercase,special character and number"
//  }
 }, // // [6,"password must be at least 6 characters long"]
  phone: {
    type: String,
    required: [true, "user phone is required"],
    minLength: 6,
    maxLength: 14,
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
      required: [true, "user city is required"],
      type: String,
        },
    province: String,
    state: String,
    country: {
      type: String,
      default: "Nepal",
    },
  },
  role: {
    type: [String],
    enum: ["Customer", "Merchant", "Admin",], 
    default: ["Customer"],
  },
  profileImageUrl: {
    type: String,
  },

});

export default mongoose.model("User", userSchema);