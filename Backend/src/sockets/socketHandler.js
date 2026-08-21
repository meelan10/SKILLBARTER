const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { isBlocked } = require("../services/blockService");
const { createNotification } = require("../services/notificationService");

// Authenticate the socket connection using the same JWT as the REST API.
// Client passes it as: io(url, { auth: { token } })
async function socketAuthMiddleware(socket, next) {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error("Not authorized, no token"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true },
    });
    if (!user) return next(new Error("Not authorized, user no longer exists"));

    socket.user = user;
    next();
  } catch (err) {
    next(new Error("Not authorized, invalid token"));
  }
}

// Confirms the connected user is part of this exchange, the exchange is
// active, and neither side has blocked the other. Mirrors spec section 38 —
// never rely on the frontend alone to hide chat.
async function assertCanAccessExchange(userId, exchangeId) {
  const exchange = await prisma.exchangeRequest.findUnique({
    where: { id: exchangeId },
    include: { conversation: true },
  });

  if (!exchange) throw new Error("Exchange not found");
  if (exchange.senderId !== userId && exchange.receiverId !== userId) {
    throw new Error("Not a member of this exchange");
  }
  if (!exchange.conversation) throw new Error("Conversation not started yet");

  const otherUserId = exchange.senderId === userId ? exchange.receiverId : exchange.senderId;
  const blocked = await isBlocked(userId, otherUserId);
  if (blocked) throw new Error("This conversation is unavailable");

  return { exchange, otherUserId };
}

function registerSocketHandlers(io) {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id, "user:", socket.user.id);

    socket.on("join_exchange", async (exchangeId) => {
      try {
        const { exchange } = await assertCanAccessExchange(socket.user.id, Number(exchangeId));
        socket.join(`exchange_${exchange.id}`);
        socket.emit("joined_exchange", { exchangeId: exchange.id });
      } catch (err) {
        socket.emit("chat_error", { message: err.message });
      }
    });

    socket.on("send_message", async ({ exchangeId, content }) => {
      try {
        if (!content || !content.trim()) {
          return socket.emit("chat_error", { message: "Message cannot be empty" });
        }

        const { exchange, otherUserId } = await assertCanAccessExchange(
          socket.user.id,
          Number(exchangeId)
        );

        const message = await prisma.message.create({
          data: {
            conversationId: exchange.conversation.id,
            senderId: socket.user.id,
            content: content.trim(),
          },
          include: { sender: { select: { id: true, name: true } } },
        });

        io.to(`exchange_${exchange.id}`).emit("receive_message", message);

        await createNotification(
          otherUserId,
          "MESSAGE",
          `New message from ${socket.user.name}`
        );
      } catch (err) {
        socket.emit("chat_error", { message: err.message });
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
}

module.exports = registerSocketHandlers;
