import z from "zod";

export const productSchema = z.object({
  name: z
    .string({ required_error: "Product name is required" })
    .min(3, { message: "Product name must be at least 3 characters long" })
    .max(50, { message: "Product name cannot exceed 50 characters" })
    .trim(),

  brand: z.string().optional(),

  category: z.string({ required_error: "Product category is required" }),

  price: z
    .number({ required_error: "Price is required" })
    .min(1, { message: "Price must be greater than 1" })
    .max(99999, { message: "Price must be less than 99999" }),

  stock: z.number().min(0, { message: "Stock cannot be negative" }).default(1),
  description:z.string(),
  createdAt: z.date().default(() => new Date()),

  createdBy: z
    .string({ required_error: "Created by userid is required" })
    .regex(/^[0-9a-fA-F]{24}$/, { message: "Invalid MongoDB ObjectId format" }),

  imageUrl: z.string().url().optional(),
});
