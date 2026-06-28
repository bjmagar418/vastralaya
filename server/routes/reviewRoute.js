import express from "express";
import reviewController from "../controllers/reviewController.js";

const router = express.Router();

// post a new review
router.post("/post-review",reviewController.createReview);

router.get("/total-reviews",reviewController.getTotalReviews);

//get reviews by userid
router.get("/:userId",reviewController.getReviewsByUserId);

export default router;
