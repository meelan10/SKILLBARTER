// Single shared Prisma Client instance for the whole app.
// Reusing one instance avoids exhausting DB connections in dev with nodemon.
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports = prisma;
