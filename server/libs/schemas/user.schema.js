import z from "zod";
import { emailRegex, passwordRegex } from "../../constants/regex.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "../../constants/role.js";

export const userSchema = z.object({
  name: z.string().min(3).max(50).trim(),

  email: z.string().regex(emailRegex, {
    message: "Invalid email address",
  }),

  phone: z.string().regex(/^\+977\d{10}$/, {
    message: "Phone must be in format +977XXXXXXXXXX",
  }),

  password: z.string().min(6).regex(passwordRegex, {
    message:
      "Password must contain uppercase, lowercase, number, and special characters.",
  }),

  // ✅ FIX: role should default to CUSTOMER
  role: z.enum([ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN]).optional(),

  address: z.object({
    city: z.string().min(1, "City is required"),
    province: z.string().optional(),
    street: z.string().optional(),
    country: z.string().optional(),
  }),

  profileImageUrl: z.string().url().optional(),
});