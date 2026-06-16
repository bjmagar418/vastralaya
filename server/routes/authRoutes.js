import express from "express";
import authController from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../libs/schemas/auth.schema.js";
import validate from "../middleware/validator.js";

const router = express.Router();
//register endpoint
router.post("/register", validate(registerSchema), authController.registerUser);
//router.post("/login", loginUser);

router.post("/login", validate(loginSchema), authController.loginUser);

router.post("/logout", authController.logout);

export default router;
