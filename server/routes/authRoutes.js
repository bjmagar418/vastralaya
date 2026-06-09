import express from "express";
<<<<<<< HEAD
import authController from "../controllers/authController.js";

const router = express.Router();
//register endpoint
router.post("/register", authController.registerUser);
//router.post("/login", loginUser);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logout);

export default router;
=======
import { registerUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
