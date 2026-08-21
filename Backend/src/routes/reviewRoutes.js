const express = require("express");
const { createReview, getUserReviews } = require("../controllers/reviewController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", createReview);
router.get("/user/:userId", getUserReviews);

module.exports = router;
