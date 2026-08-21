const prisma = require("../config/prisma");

// True if either user has blocked the other, in either direction.
// Every feature that connects two users (matching, chat, exchange,
// profile view) must call this — spec section 46.
async function isBlocked(userIdA, userIdB) {
  const block = await prisma.block.findFirst({
    where: {
      OR: [
        { blockerId: userIdA, blockedUserId: userIdB },
        { blockerId: userIdB, blockedUserId: userIdA },
      ],
    },
  });
  return Boolean(block);
}

// Returns the set of user IDs that should never appear for `userId` —
// people they blocked, and people who blocked them.
async function getBlockedUserIds(userId) {
  const blocks = await prisma.block.findMany({
    where: {
      OR: [{ blockerId: userId }, { blockedUserId: userId }],
    },
  });

  const ids = new Set();
  for (const b of blocks) {
    if (b.blockerId === userId) ids.add(b.blockedUserId);
    else ids.add(b.blockerId);
  }
  return Array.from(ids);
}

module.exports = { isBlocked, getBlockedUserIds };
