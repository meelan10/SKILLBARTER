const express = require("express");
const {
  listNotifications,
  markRead,
  markAllRead,
} = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/", listNotifications);
router.patch("/:id/read", markRead);
router.patch("/read-all", markAllRead);

module.exports = router;
