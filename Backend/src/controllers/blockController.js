const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt } = require("../validators/validators");

// POST /api/blocks  { blockedUserId }
const blockUser = asyncHandler(async (req, res) => {
  const { blockedUserId } = req.body;
  if (!isInt(blockedUserId)) return fail(res, "blockedUserId is required", 400);

  const blockedUserIdNum = Number(blockedUserId);
  if (blockedUserIdNum === req.user.id) return fail(res, "You cannot block yourself", 400);

  const target = await prisma.user.findUnique({ where: { id: blockedUserIdNum } });
  if (!target) return fail(res, "User not found", 404);

  const existing = await prisma.block.findUnique({
    where: { blockerId_blockedUserId: { blockerId: req.user.id, blockedUserId: blockedUserIdNum } },
  });
  if (existing) return fail(res, "You already blocked this user", 409);

  const block = await prisma.block.create({
    data: { blockerId: req.user.id, blockedUserId: blockedUserIdNum },
  });

  return success(res, block, 201);
});

// DELETE /api/blocks/:blockedUserId
const unblockUser = asyncHandler(async (req, res) => {
  const blockedUserId = Number(req.params.blockedUserId);
  if (!isInt(blockedUserId)) return fail(res, "Invalid user id", 400);

  await prisma.block.deleteMany({
    where: { blockerId: req.user.id, blockedUserId },
  });

  return success(res, { unblocked: true });
});

// GET /api/blocks
const listBlocks = asyncHandler(async (req, res) => {
  const blocks = await prisma.block.findMany({
    where: { blockerId: req.user.id },
    include: { blockedUser: { select: { id: true, name: true } } },
  });
  return success(res, blocks);
});

module.exports = { blockUser, unblockUser, listBlocks };
