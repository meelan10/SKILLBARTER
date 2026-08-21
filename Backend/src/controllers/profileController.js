const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isOneOf, isInt } = require("../validators/validators");
const { isBlocked } = require("../services/blockService");

const VALID_FORMATS = ["ONLINE", "CAMPUS", "BOTH"];

// GET /api/profile/me
const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await prisma.profile.findUnique({ where: { userId: req.user.id } });
  return success(res, profile);
});

// PUT /api/profile/me
const updateMyProfile = asyncHandler(async (req, res) => {
  const { university, department, bio, avatar, location, preferredFormat } = req.body;

  if (preferredFormat && !isOneOf(preferredFormat, VALID_FORMATS)) {
    return fail(res, `preferredFormat must be one of ${VALID_FORMATS.join(", ")}`, 400);
  }

  const profile = await prisma.profile.update({
    where: { userId: req.user.id },
    data: {
      ...(university !== undefined && { university }),
      ...(department !== undefined && { department }),
      ...(bio !== undefined && { bio }),
      ...(avatar !== undefined && { avatar }),
      ...(location !== undefined && { location }),
      ...(preferredFormat !== undefined && { preferredFormat }),
    },
  });

  return success(res, profile);
});

// GET /api/profile/:userId  (public view)
const getProfileByUserId = asyncHandler(async (req, res) => {
  const targetId = Number(req.params.userId);
  if (!isInt(targetId)) return fail(res, "Invalid user id", 400);

  if (targetId !== req.user.id) {
    const blocked = await isBlocked(req.user.id, targetId);
    if (blocked) return fail(res, "This profile is unavailable", 403);
  }

  const user = await prisma.user.findUnique({
    where: { id: targetId },
    include: {
      profile: true,
      skills: { include: { skill: true } },
      availability: true,
    },
  });

  if (!user) return fail(res, "User not found", 404);

  const { password, email, ...publicUser } = user;
  return success(res, publicUser);
});

module.exports = { getMyProfile, updateMyProfile, getProfileByUserId };
