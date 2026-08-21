const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isNonEmptyString, isOneOf, isInt } = require("../validators/validators");
const { getBlockedUserIds } = require("../services/blockService");

const SKILL_TYPES = ["TEACH", "LEARN"];
const SKILL_LEVELS = ["BEGINNER", "INTERMEDIATE", "ADVANCED"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// GET /api/skills?search=python
const searchSkills = asyncHandler(async (req, res) => {
  const { search } = req.query;

  const skills = await prisma.skill.findMany({
    where: search
      ? { name: { contains: String(search), mode: "insensitive" } }
      : undefined,
    orderBy: { name: "asc" },
  });

  // Attach a teacher count so the UI can show "42 students can teach".
  const withCounts = await Promise.all(
    skills.map(async (skill) => {
      const teacherCount = await prisma.userSkill.count({
        where: { skillId: skill.id, type: "TEACH" },
      });
      return { ...skill, teacherCount };
    })
  );

  return success(res, withCounts);
});

// GET /api/skills/:skillId/users  -> people who teach this skill
const getSkillUsers = asyncHandler(async (req, res) => {
  const skillId = Number(req.params.skillId);
  if (!isInt(skillId)) return fail(res, "Invalid skill id", 400);

  const blockedIds = await getBlockedUserIds(req.user.id);

  const teachers = await prisma.userSkill.findMany({
    where: {
      skillId,
      type: "TEACH",
      userId: { notIn: [req.user.id, ...blockedIds] },
    },
    include: {
      user: { include: { profile: true } },
    },
  });

  const shaped = teachers.map((t) => ({
    id: t.user.id,
    name: t.user.name,
    level: t.level,
    rating: t.user.profile?.rating ?? 0,
  }));

  return success(res, shaped);
});

// POST /api/skills/me  { skillId?, name?, category?, type, level }
// Accepts either an existing skillId, or a name+category to find-or-create the skill.
const addUserSkill = asyncHandler(async (req, res) => {
  const { skillId, name, category, type, level } = req.body;

  if (!isOneOf(type, SKILL_TYPES)) {
    return fail(res, `type must be one of ${SKILL_TYPES.join(", ")}`, 400);
  }
  if (!isOneOf(level, SKILL_LEVELS)) {
    return fail(res, `level must be one of ${SKILL_LEVELS.join(", ")}`, 400);
  }

  let skill;
  if (skillId) {
    skill = await prisma.skill.findUnique({ where: { id: Number(skillId) } });
    if (!skill) return fail(res, "Skill not found", 404);
  } else {
    if (!isNonEmptyString(name) || !isNonEmptyString(category)) {
      return fail(res, "Provide skillId, or both name and category", 400);
    }
    skill = await prisma.skill.upsert({
      where: { name },
      update: {},
      create: { name, category },
    });
  }

  const existing = await prisma.userSkill.findUnique({
    where: {
      userId_skillId_type: { userId: req.user.id, skillId: skill.id, type },
    },
  });
  if (existing) return fail(res, "You already added this skill with that type", 409);

  const userSkill = await prisma.userSkill.create({
    data: { userId: req.user.id, skillId: skill.id, type, level },
    include: { skill: true },
  });

  return success(res, userSkill, 201);
});

// GET /api/skills/me
const listMySkills = asyncHandler(async (req, res) => {
  const skills = await prisma.userSkill.findMany({
    where: { userId: req.user.id },
    include: { skill: true },
  });
  return success(res, skills);
});

// DELETE /api/skills/me/:id
const removeUserSkill = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return fail(res, "Invalid id", 400);

  const userSkill = await prisma.userSkill.findUnique({ where: { id } });
  if (!userSkill || userSkill.userId !== req.user.id) {
    return fail(res, "Skill entry not found", 404);
  }

  await prisma.userSkill.delete({ where: { id } });
  return success(res, { deleted: true });
});

// PUT /api/availability  { slots: [{ day, startTime, endTime }] }
// Replaces the user's full availability set — simplest mental model for the UI.
const setAvailability = asyncHandler(async (req, res) => {
  const { slots } = req.body;

  if (!Array.isArray(slots)) return fail(res, "slots must be an array", 400);

  for (const s of slots) {
    if (!isOneOf(s.day, DAYS)) return fail(res, `day must be one of ${DAYS.join(", ")}`, 400);
    if (!isNonEmptyString(s.startTime) || !isNonEmptyString(s.endTime)) {
      return fail(res, "Each slot needs startTime and endTime", 400);
    }
  }

  await prisma.$transaction([
    prisma.availability.deleteMany({ where: { userId: req.user.id } }),
    prisma.availability.createMany({
      data: slots.map((s) => ({
        userId: req.user.id,
        day: s.day,
        startTime: s.startTime,
        endTime: s.endTime,
      })),
    }),
  ]);

  const updated = await prisma.availability.findMany({ where: { userId: req.user.id } });
  return success(res, updated);
});

// GET /api/availability/me
const getMyAvailability = asyncHandler(async (req, res) => {
  const slots = await prisma.availability.findMany({ where: { userId: req.user.id } });
  return success(res, slots);
});

module.exports = {
  searchSkills,
  getSkillUsers,
  addUserSkill,
  listMySkills,
  removeUserSkill,
  setAvailability,
  getMyAvailability,
};
