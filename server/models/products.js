import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
<<<<<<< HEAD
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
=======
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    images: [{ type: String }],
    sizes: [{ type: String }],
    colors: [{ type: String }],

>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
<<<<<<< HEAD
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Created by user id is required"],
    },
    // author:{
    //   types:mongoose.Types.ObjectId,
    //   ref:"User",
    //   required:true
    // }
    
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);

export default Product;
=======

    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

/* ================= INDEXES ================= */

productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ avgRating: -1 });
productSchema.index({ category: 1, price: 1 });

productSchema.index({
  name: "text",
  description: "text",
});

export default mongoose.model("Product", productSchema);
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
