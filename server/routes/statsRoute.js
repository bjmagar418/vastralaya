import express from "express";
import statsController from "../controllers/statsController.js";

const router = express.Router();

// 1. User Stats
router.get("/user-stats/:email", statsController.getUserStats);

// 2. Admin Stats
router.get("/admin-stats", statsController.getAdminStats);

// 3. Merchant Stats
router.get("/merchant-stats", statsController.getMerchantStats);

export default router;
