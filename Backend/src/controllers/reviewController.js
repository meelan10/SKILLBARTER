const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt, isValidRating } = require("../validators/validators");

// POST /api/reviews
// Checks per spec section 43 + 65: session completed, reviewer participated,
// hasn't already reviewed this session.
const createReview = asyncHandler(async (req, res) => {
  const {
    sessionId,
    teachingRating,
    communicationRating,
    reliabilityRating,
    knowledgeRating,
    wouldExchangeAgain,
    comment,
  } = req.body;

  if (!isInt(sessionId)) return fail(res, "sessionId is required", 400);

  const ratings = [teachingRating, communicationRating, reliabilityRating, knowledgeRating];
  if (!ratings.every(isValidRating)) {
    return fail(res, "All ratings must be integers from 1 to 5", 400);
  }
  if (typeof wouldExchangeAgain !== "boolean") {
    return fail(res, "wouldExchangeAgain must be true or false", 400);
  }

  const session = await prisma.session.findUnique({ where: { id: Number(sessionId) } });
  if (!session) return fail(res, "Session not found", 404);
  if (session.status !== "COMPLETED") return fail(res, "You can only review a completed session", 400);

  const isTeacher = session.teacherId === req.user.id;
  const isLearner = session.learnerId === req.user.id;
  if (!isTeacher && !isLearner) return fail(res, "You didn't take part in this session", 403);

  const reviewedUserId = isTeacher ? session.learnerId : session.teacherId;

  const existing = await prisma.review.findUnique({
    where: { sessionId_reviewerId: { sessionId: Number(sessionId), reviewerId: req.user.id } },
  });
  if (existing) return fail(res, "You already reviewed this session", 409);

  const overallRating = ratings.reduce((a, b) => a + b, 0) / ratings.length;

  const review = await prisma.$transaction(async (tx) => {
    const r = await tx.review.create({
      data: {
        sessionId: Number(sessionId),
        reviewerId: req.user.id,
        reviewedUserId,
        teachingRating,
        communicationRating,
        reliabilityRating,
        knowledgeRating,
        overallRating,
        wouldExchangeAgain,
        comment: comment || null,
      },
    });

    const agg = await tx.review.aggregate({
      where: { reviewedUserId },
      _avg: { overallRating: true },
      _count: { id: true },
    });

    await tx.profile.update({
      where: { userId: reviewedUserId },
      data: {
        rating: agg._avg.overallRating || 0,
        totalReviews: agg._count.id,
      },
    });

    return r;
  });

  return success(res, review, 201);
});

// GET /api/reviews/user/:userId
const getUserReviews = asyncHandler(async (req, res) => {
  const userId = Number(req.params.userId);
  if (!isInt(userId)) return fail(res, "Invalid user id", 400);

  const reviews = await prisma.review.findMany({
    where: { reviewedUserId: userId },
    include: { reviewer: { select: { id: true, name: true } }, session: { include: { skill: true } } },
    orderBy: { createdAt: "desc" },
  });

  return success(res, reviews);
});

module.exports = { createReview, getUserReviews };
