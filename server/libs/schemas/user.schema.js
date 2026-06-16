import z from "zod";
import { emailRegex, passwordRegex } from "../../constants/regex.js";
import {
  ROLE_ADMIN,
  ROLE_CUSTOMER,
  ROLE_MERCHANT,
} from "../../constants/role.js";


export const userSchema = z.object({
  name: z.string().min(3).max(50).trim(),
  email: z.string().regex(emailRegex, { message: "Invalid email address" }),
  phone: z.string().min(5).max(15),
  password: z.string().min(6).regex(passwordRegex, {
    message:
      "Password must contain uppercase, lowercase, number, and special characters.",
  }),
  isActive: z.boolean(),
  // Correct syntax: pass the enum directly to z.array() without outer brackets
  role: z.array(z.enum([ROLE_CUSTOMER, ROLE_MERCHANT, ROLE_ADMIN])),
  address: z.object({
    city: z.string(),
    province: z.string().optional(),
    street: z.string().optional(),
    country: z.string().optional(),
  }),
  profileImageUrl: z.string().url().optional(), // Added .url() for better safety
});