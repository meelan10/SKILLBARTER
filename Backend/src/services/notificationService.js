const prisma = require("../config/prisma");

// Types used across the app, per spec section 62:
// MATCH, EXCHANGE_REQUEST, EXCHANGE_ACCEPTED, MESSAGE,
// SESSION_REMINDER, REVIEW_AVAILABLE
async function createNotification(userId, type, message) {
  return prisma.notification.create({
    data: { userId, type, message },
  });
}

module.exports = { createNotification };
