const express = require("express");
const { blockUser, unblockUser, listBlocks } = require("../controllers/blockController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.post("/", blockUser);
router.delete("/:blockedUserId", unblockUser);
router.get("/", listBlocks);

module.exports = router;
