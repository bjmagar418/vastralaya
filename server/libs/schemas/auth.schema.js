import  z,{ check, maxLength, minLength, regex } from "zod";
import { emailRegex, passwordRegex } from "../../constants/regex.js";
import { ROLE_ADMIN, ROLE_CUSTOMER, ROLE_MERCHANT } from "../../constants/role.js";
import { userSchema } from "../schemas/user.schema.js";

//login
/****
 * email: required,minlength
 * phone:required,min length 15
 * password: required,min length 6,password format
 */

export const loginSchema = z
  .object({
    email: z
      .string({ invalid_type_error: "Email must be a string." })
      .regex(emailRegex, { message: "Invalid email address." })
      .optional(),
    phone: z
      .string({ invalid_type_error: "Phone number must be a string." })
      .optional(),
    password: z
      .string({ required_error: "Password is required." })
      .min(1, { message: "Password cannot be empty." }),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required.",
    path: ["email"], // Pointing to 'email' specifically makes it easier for client-side forms to highlight the correct field
  });




export const registerSchema = userSchema;


export const forgotPasswordSchema = z.object({
  email: z
    .string({ error: "Email is required." })
    .regex(emailRegex, { error: "Invalid email address." }),
});

export const resetPasswordSchema = z.object({
  password: z.string(),
  userId: z.string(),
  token: z.string(),
});
