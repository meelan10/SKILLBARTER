const express = require("express");
const { getMatches } = require("../controllers/matchController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", authMiddleware, getMatches);

module.exports = router;
