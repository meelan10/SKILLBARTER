const express = require("express");
const { setAvailability, getMyAvailability } = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.put("/", setAvailability);
router.get("/me", getMyAvailability);

module.exports = router;
