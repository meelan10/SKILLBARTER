const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");
const { fail } = require("../utils/apiResponse");

// Protects routes: React → Authorization: Bearer TOKEN → decode → req.user
const authMiddleware = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return fail(res, "Not authorized, no token", 401);
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true },
    });

    if (!user) {
      return fail(res, "Not authorized, user no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    return fail(res, "Not authorized, invalid token", 401);
  }
};

module.exports = authMiddleware;
