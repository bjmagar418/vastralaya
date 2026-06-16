import express from "express";
import reviewController from "../controllers/reviewController.js";

const router = express.Router();

// post a new review
router.post("/post-review",reviewController.createReview);

export default express;
