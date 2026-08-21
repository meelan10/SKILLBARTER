const express = require("express");
const {
  createSession,
  listSessions,
  getSession,
  startSession,
  verifySession,
  completeSession,
  cancelSession,
} = require("../controllers/sessionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", createSession);
router.get("/", listSessions);
router.get("/:id", getSession);
router.patch("/:id/start", startSession);
router.post("/:id/verify", verifySession);
router.patch("/:id/complete", completeSession);
router.patch("/:id/cancel", cancelSession);

module.exports = router;
