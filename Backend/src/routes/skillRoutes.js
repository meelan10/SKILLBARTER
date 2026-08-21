const express = require("express");
const {
  searchSkills,
  getSkillUsers,
  addUserSkill,
  listMySkills,
  removeUserSkill,
} = require("../controllers/skillController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
router.use(authMiddleware);

router.get("/me", listMySkills);
router.post("/me", addUserSkill);
router.delete("/me/:id", removeUserSkill);
router.get("/:skillId/users", getSkillUsers);
router.get("/", searchSkills);

module.exports = router;
