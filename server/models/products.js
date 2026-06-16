import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minLength: [3, "Product name must be at least 3 characters."],
      maxLength: [100, "Product name must be less than 100 characters."],
    },
    brand: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [1, "Price must be at least 1."],
      max: [100000, "Price must be less than 100000."],
    },
    description:{
      type:String
    },
    color:{
      type:String
    },
    rating:{
      type:Number,
      default:0
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      min: 0,
      default: 1,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Created by user id is required"],
    },
 
    
  },
  {
    timestamps: true,
  },
);

//const Product = mongoose.model("Product", productSchema);
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
