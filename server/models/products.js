import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
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

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

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