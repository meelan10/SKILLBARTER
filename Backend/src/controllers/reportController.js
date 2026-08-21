const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt, isOneOf } = require("../validators/validators");

const REASONS = [
  "HARASSMENT",
  "INAPPROPRIATE_BEHAVIOR",
  "FAKE_SKILL",
  "NO_SHOW",
  "SPAM",
  "OTHER",
];

// POST /api/reports
// For the MVP, storing the report is sufficient — admin review is a later step.
const createReport = asyncHandler(async (req, res) => {
  const { reportedUserId, reason, description } = req.body;

  if (!isInt(reportedUserId)) return fail(res, "reportedUserId is required", 400);
  if (!isOneOf(reason, REASONS)) return fail(res, `reason must be one of ${REASONS.join(", ")}`, 400);

  const reportedUserIdNum = Number(reportedUserId);
  if (reportedUserIdNum === req.user.id) return fail(res, "You cannot report yourself", 400);

  const target = await prisma.user.findUnique({ where: { id: reportedUserIdNum } });
  if (!target) return fail(res, "User not found", 404);

  const report = await prisma.report.create({
    data: {
      reporterId: req.user.id,
      reportedUserId: reportedUserIdNum,
      reason,
      description: description || null,
    },
  });

  return success(res, report, 201);
});

module.exports = { createReport };
