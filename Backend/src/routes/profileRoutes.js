const express = require("express");
const {
  getMyProfile,
  updateMyProfile,
  getProfileByUserId,
} = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/me", getMyProfile);
router.put("/me", updateMyProfile);
router.get("/:userId", getProfileByUserId);

module.exports = router;
