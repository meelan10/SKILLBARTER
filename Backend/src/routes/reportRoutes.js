const express = require("express");
const { createReport } = require("../controllers/reportController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.post("/", authMiddleware, createReport);

module.exports = router;
