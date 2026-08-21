const express = require("express");

const authRoutes = require("./authRoutes");
const profileRoutes = require("./profileRoutes");
const skillRoutes = require("./skillRoutes");
const availabilityRoutes = require("./availabilityRoutes");
const matchRoutes = require("./matchRoutes");
const exchangeRoutes = require("./exchangeRoutes");
const sessionRoutes = require("./sessionRoutes");
const reviewRoutes = require("./reviewRoutes");
const reportRoutes = require("./reportRoutes");
const blockRoutes = require("./blockRoutes");
const notificationRoutes = require("./notificationRoutes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/profile", profileRoutes);
router.use("/skills", skillRoutes);
router.use("/availability", availabilityRoutes);
router.use("/matches", matchRoutes);
router.use("/exchanges", exchangeRoutes);
router.use("/sessions", sessionRoutes);
router.use("/reviews", reviewRoutes);
router.use("/reports", reportRoutes);
router.use("/blocks", blockRoutes);
router.use("/notifications", notificationRoutes);

module.exports = router;
