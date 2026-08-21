const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt } = require("../validators/validators");
const { isBlocked } = require("../services/blockService");

// GET /api/exchanges/:id/messages
// Security checks mirror spec section 38: membership + not-blocked.
const getMessages = asyncHandler(async (req, res) => {
  const exchangeId = Number(req.params.id);
  if (!isInt(exchangeId)) return fail(res, "Invalid exchange id", 400);

  const exchange = await prisma.exchangeRequest.findUnique({
    where: { id: exchangeId },
    include: { conversation: true },
  });

  if (!exchange) return fail(res, "Exchange not found", 404);
  if (exchange.senderId !== req.user.id && exchange.receiverId !== req.user.id) {
    return fail(res, "Not authorized to view this conversation", 403);
  }
  if (exchange.status === "DECLINED" || exchange.status === "CANCELLED") {
    return fail(res, "This exchange has no active conversation", 400);
  }
  if (!exchange.conversation) return fail(res, "Conversation not started yet", 404);

  const otherUserId =
    exchange.senderId === req.user.id ? exchange.receiverId : exchange.senderId;
  const blocked = await isBlocked(req.user.id, otherUserId);
  if (blocked) return fail(res, "This conversation is unavailable", 403);

  const messages = await prisma.message.findMany({
    where: { conversationId: exchange.conversation.id },
    include: { sender: { select: { id: true, name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return success(res, messages);
});

module.exports = { getMessages };
