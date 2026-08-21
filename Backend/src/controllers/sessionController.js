const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt, isNonEmptyString } = require("../validators/validators");
const generateCode = require("../utils/generateCode");
const { createNotification } = require("../services/notificationService");

const TTL_MINUTES = Number(process.env.VERIFICATION_CODE_TTL_MINUTES || 30);

// POST /api/sessions  { exchangeId, skillId, date, startTime, endTime, location }
const createSession = asyncHandler(async (req, res) => {
  const { exchangeId, skillId, date, startTime, endTime, location } = req.body;

  if (!isInt(exchangeId) || !isInt(skillId)) {
    return fail(res, "exchangeId and skillId are required", 400);
  }
  if (!isNonEmptyString(startTime) || !isNonEmptyString(endTime) || !date) {
    return fail(res, "date, startTime and endTime are required", 400);
  }

  const exchange = await prisma.exchangeRequest.findUnique({ where: { id: Number(exchangeId) } });
  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.senderId !== req.user.id && exchange.receiverId !== req.user.id) {
    return fail(res, "Not authorized for this exchange", 403);
  }
  if (exchange.status !== "ACCEPTED") {
    return fail(res, "Exchange must be accepted before scheduling a session", 400);
  }

  const skillIdNum = Number(skillId);
  let teacherId, learnerId;
  if (skillIdNum === exchange.teachSkillId) {
    teacherId = exchange.senderId;
    learnerId = exchange.receiverId;
  } else if (skillIdNum === exchange.learnSkillId) {
    teacherId = exchange.receiverId;
    learnerId = exchange.senderId;
  } else {
    return fail(res, "skillId doesn't belong to this exchange", 400);
  }

  const session = await prisma.session.create({
    data: {
      exchangeId: exchange.id,
      teacherId,
      learnerId,
      skillId: skillIdNum,
      date: new Date(date),
      startTime,
      endTime,
      location: location || null,
    },
    include: { skill: true, teacher: true, learner: true },
  });

  const otherUserId = teacherId === req.user.id ? learnerId : teacherId;
  await createNotification(
    otherUserId,
    "SESSION_SCHEDULED",
    `A session for ${session.skill.name} has been scheduled.`
  );

  return success(res, session, 201);
});

// GET /api/sessions
const listSessions = asyncHandler(async (req, res) => {
  const sessions = await prisma.session.findMany({
    where: { OR: [{ teacherId: req.user.id }, { learnerId: req.user.id }] },
    include: { skill: true, teacher: true, learner: true, verification: true },
    orderBy: { date: "asc" },
  });
  return success(res, sessions);
});

// GET /api/sessions/:id
const getSession = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return fail(res, "Invalid id", 400);

  const session = await prisma.session.findUnique({
    where: { id },
    include: { skill: true, teacher: true, learner: true, verification: true },
  });

  if (!session) return fail(res, "Session not found", 404);
  if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
    return fail(res, "Not authorized to view this session", 403);
  }

  return success(res, session);
});

// PATCH /api/sessions/:id/start
const startSession = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const session = await prisma.session.findUnique({ where: { id } });

  if (!session) return fail(res, "Session not found", 404);
  if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
    return fail(res, "Not authorized for this session", 403);
  }
  if (session.status !== "SCHEDULED") return fail(res, "Session already started or finished", 400);

  const code = generateCode();
  const expiresAt = new Date(Date.now() + TTL_MINUTES * 60 * 1000);

  const [updatedSession, verification] = await prisma.$transaction([
    prisma.session.update({ where: { id }, data: { status: "STARTED" } }),
    prisma.sessionVerification.create({
      data: { sessionId: id, code, expiresAt },
    }),
  ]);

  return success(res, { session: updatedSession, verification });
});

// POST /api/sessions/:id/verify  { code }
// Checks mirror spec section 41: own session, accepted exchange (implied by STARTED),
// scheduled → started, and not already completed.
const verifySession = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const { code } = req.body;

  if (!isNonEmptyString(code)) return fail(res, "code is required", 400);

  const session = await prisma.session.findUnique({
    where: { id },
    include: { verification: true },
  });

  if (!session) return fail(res, "Session not found", 404);
  if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
    return fail(res, "Not authorized for this session", 403);
  }
  if (session.status !== "STARTED") return fail(res, "Session isn't in progress", 400);
  if (!session.verification) return fail(res, "No verification code has been generated yet", 400);
  if (new Date() > session.verification.expiresAt) {
    return fail(res, "Verification code has expired. Restart the session.", 400);
  }
  if (session.verification.code !== code) {
    return fail(res, "Incorrect code", 400);
  }

  const isTeacher = session.teacherId === req.user.id;
  const updated = await prisma.sessionVerification.update({
    where: { sessionId: id },
    data: isTeacher ? { teacherVerified: true } : { learnerVerified: true },
  });

  return success(res, updated);
});

// PATCH /api/sessions/:id/complete
// Finalizes the session once both sides have verified.
const completeSession = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const session = await prisma.session.findUnique({
    where: { id },
    include: { verification: true },
  });

  if (!session) return fail(res, "Session not found", 404);
  if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
    return fail(res, "Not authorized for this session", 403);
  }
  if (session.status !== "STARTED") return fail(res, "Session isn't in progress", 400);
  if (!session.verification?.teacherVerified || !session.verification?.learnerVerified) {
    return fail(res, "Both participants must verify before completing", 400);
  }

  const updatedSession = await prisma.$transaction(async (tx) => {
    const s = await tx.session.update({ where: { id }, data: { status: "COMPLETED" } });
    await tx.sessionVerification.update({
      where: { sessionId: id },
      data: { verifiedAt: new Date() },
    });

    for (const userId of [session.teacherId, session.learnerId]) {
      const [completedCount, totalCount] = await Promise.all([
        tx.session.count({
          where: {
            status: "COMPLETED",
            OR: [{ teacherId: userId }, { learnerId: userId }],
          },
        }),
        tx.session.count({
          where: { OR: [{ teacherId: userId }, { learnerId: userId }] },
        }),
      ]);
      const reliabilityScore = totalCount > 0 ? (completedCount / totalCount) * 100 : 100;

      await tx.profile.update({
        where: { userId },
        data: { completedSessions: completedCount, reliabilityScore },
      });

      await createNotification(userId, "REVIEW_AVAILABLE", "Your session is complete — leave a review!");
    }

    return s;
  });

  return success(res, updatedSession);
});

// PATCH /api/sessions/:id/cancel
const cancelSession = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const session = await prisma.session.findUnique({ where: { id } });

  if (!session) return fail(res, "Session not found", 404);
  if (session.teacherId !== req.user.id && session.learnerId !== req.user.id) {
    return fail(res, "Not authorized for this session", 403);
  }
  if (session.status === "COMPLETED") return fail(res, "Completed sessions can't be cancelled", 400);

  const updated = await prisma.session.update({ where: { id }, data: { status: "CANCELLED" } });
  return success(res, updated);
});

module.exports = {
  createSession,
  listSessions,
  getSession,
  startSession,
  verifySession,
  completeSession,
  cancelSession,
};
