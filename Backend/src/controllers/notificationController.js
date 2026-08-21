const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const { success, fail } = require("../utils/apiResponse");
const { isInt } = require("../validators/validators");

// GET /api/notifications
const listNotifications = asyncHandler(async (req, res) => {
  const notifications = await prisma.notification.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });
  return success(res, notifications);
});

// PATCH /api/notifications/:id/read
const markRead = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  if (!isInt(id)) return fail(res, "Invalid id", 400);

  const notification = await prisma.notification.findUnique({ where: { id } });
  if (!notification || notification.userId !== req.user.id) {
    return fail(res, "Notification not found", 404);
  }

  const updated = await prisma.notification.update({
    where: { id },
    data: { isRead: true },
  });
  return success(res, updated);
});

// PATCH /api/notifications/read-all
const markAllRead = asyncHandler(async (req, res) => {
  await prisma.notification.updateMany({
    where: { userId: req.user.id, isRead: false },
    data: { isRead: true },
  });
  return success(res, { updated: true });
});

module.exports = { listNotifications, markRead, markAllRead };
