const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt } = require("../validators/validators");
const { isBlocked } = require("../services/blockService");
const { createNotification } = require("../services/notificationService");

// POST /api/exchanges
// Checks follow spec section 65 exactly.
const createExchangeRequest = asyncHandler(async (req, res) => {
  const { receiverId, teachSkillId, learnSkillId, message } = req.body;

  if (!isInt(receiverId) || !isInt(teachSkillId) || !isInt(learnSkillId)) {
    return fail(res, "receiverId, teachSkillId and learnSkillId are required", 400);
  }

  const receiverIdNum = Number(receiverId);
  if (receiverIdNum === req.user.id) {
    return fail(res, "You cannot start an exchange with yourself", 400);
  }

  const receiver = await prisma.user.findUnique({ where: { id: receiverIdNum } });
  if (!receiver) return fail(res, "Receiver does not exist", 404);

  const blocked = await isBlocked(req.user.id, receiverIdNum);
  if (blocked) return fail(res, "You can't send a request to this user", 403);

  const senderTeaches = await prisma.userSkill.findFirst({
    where: { userId: req.user.id, skillId: Number(teachSkillId), type: "TEACH" },
  });
  if (!senderTeaches) return fail(res, "You haven't listed this as a skill you teach", 400);

  const receiverTeaches = await prisma.userSkill.findFirst({
    where: { userId: receiverIdNum, skillId: Number(learnSkillId), type: "TEACH" },
  });
  if (!receiverTeaches) {
    return fail(res, "This user doesn't teach the skill you want to learn", 400);
  }

  const existingPending = await prisma.exchangeRequest.findFirst({
    where: {
      senderId: req.user.id,
      receiverId: receiverIdNum,
      status: "PENDING",
    },
  });
  if (existingPending) return fail(res, "You already have a pending request with this user", 409);

  const exchange = await prisma.exchangeRequest.create({
    data: {
      senderId: req.user.id,
      receiverId: receiverIdNum,
      teachSkillId: Number(teachSkillId),
      learnSkillId: Number(learnSkillId),
      message: message || null,
    },
    include: { teachSkill: true, learnSkill: true, sender: true, receiver: true },
  });

  await createNotification(
    receiverIdNum,
    "EXCHANGE_REQUEST",
    `${req.user.name} proposed a skill exchange with you.`
  );

  return success(res, exchange, 201);
});

// GET /api/exchanges  -> everything the user sent or received
const listExchanges = asyncHandler(async (req, res) => {
  const exchanges = await prisma.exchangeRequest.findMany({
    where: {
      OR: [{ senderId: req.user.id }, { receiverId: req.user.id }],
    },
    include: { teachSkill: true, learnSkill: true, sender: true, receiver: true },
    orderBy: { createdAt: "desc" },
  });
  return success(res, exchanges);
});

// GET /api/exchanges/:id
const getExchange = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return fail(res, "Invalid id", 400);

  const exchange = await prisma.exchangeRequest.findUnique({
    where: { id },
    include: { teachSkill: true, learnSkill: true, sender: true, receiver: true },
  });

  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.senderId !== req.user.id && exchange.receiverId !== req.user.id) {
    return fail(res, "Not authorized to view this exchange", 403);
  }

  return success(res, exchange);
});

// PATCH /api/exchanges/:id/accept
const acceptExchange = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const exchange = await prisma.exchangeRequest.findUnique({ where: { id } });

  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.receiverId !== req.user.id) {
    return fail(res, "Only the receiver can accept this request", 403);
  }
  if (exchange.status !== "PENDING") return fail(res, "This request is no longer pending", 400);

  const [updated] = await prisma.$transaction([
    prisma.exchangeRequest.update({ where: { id }, data: { status: "ACCEPTED" } }),
    prisma.conversation.create({ data: { exchangeId: id } }),
  ]);

  await createNotification(
    exchange.senderId,
    "EXCHANGE_ACCEPTED",
    `${req.user.name} accepted your exchange request.`
  );

  return success(res, updated);
});

// PATCH /api/exchanges/:id/decline
const declineExchange = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const exchange = await prisma.exchangeRequest.findUnique({ where: { id } });

  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.receiverId !== req.user.id) {
    return fail(res, "Only the receiver can decline this request", 403);
  }
  if (exchange.status !== "PENDING") return fail(res, "This request is no longer pending", 400);

  const updated = await prisma.exchangeRequest.update({
    where: { id },
    data: { status: "DECLINED" },
  });
  return success(res, updated);
});

// PATCH /api/exchanges/:id/cancel
const cancelExchange = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const exchange = await prisma.exchangeRequest.findUnique({ where: { id } });

  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.senderId !== req.user.id) {
    return fail(res, "Only the sender can cancel this request", 403);
  }
  if (exchange.status !== "PENDING") return fail(res, "This request is no longer pending", 400);

  const updated = await prisma.exchangeRequest.update({
    where: { id },
    data: { status: "CANCELLED" },
  });
  return success(res, updated);
});

module.exports = {
  createExchangeRequest,
  listExchanges,
  getExchange,
  acceptExchange,
  declineExchange,
  cancelExchange,
};
