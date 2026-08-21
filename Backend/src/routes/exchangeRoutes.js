const express = require("express");
const {
  createExchangeRequest,
  listExchanges,
  getExchange,
  acceptExchange,
  declineExchange,
  cancelExchange,
} = require("../controllers/exchangeController");
const { getMessages } = require("../controllers/chatController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", createExchangeRequest);
router.get("/", listExchanges);
router.get("/:id", getExchange);
router.patch("/:id/accept", acceptExchange);
router.patch("/:id/decline", declineExchange);
router.patch("/:id/cancel", cancelExchange);
router.get("/:id/messages", getMessages);

module.exports = router;
