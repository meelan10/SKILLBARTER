const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");
const asyncHandler = require("../utils/asyncHandler");
const generateToken = require("../utils/generateToken");
const { success, fail } = require("../utils/apiResponse");
const { isNonEmptyString, isValidEmail, isValidPassword } = require("../validators/validators");

// POST /api/auth/register
const register = asyncHandler(async (req, res) => {
  const { name, email, password, university, department } = req.body;

  if (!isNonEmptyString(name)) return fail(res, "Name is required", 400);
  if (!isValidEmail(email)) return fail(res, "A valid email is required", 400);
  if (!isValidPassword(password)) {
    return fail(res, "Password must be at least 6 characters", 400);
  }
  if (!isNonEmptyString(university)) return fail(res, "University is required", 400);
  if (!isNonEmptyString(department)) return fail(res, "Department is required", 400);

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return fail(res, "An account with that email already exists", 409);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: { university, department },
      },
    },
    include: { profile: true },
  });

  const token = generateToken(user.id);

  return success(
    res,
    {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
      },
    },
    201
  );
});

// POST /api/auth/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!isValidEmail(email) || !isNonEmptyString(password)) {
    return fail(res, "Email and password are required", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  });

  if (!user) return fail(res, "Invalid email or password", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return fail(res, "Invalid email or password", 401);

  const token = generateToken(user.id);

  return success(res, {
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      profile: user.profile,
    },
  });
});

// GET /api/auth/me
const me = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user.id },
    include: {
      profile: true,
      skills: { include: { skill: true } },
      availability: true,
    },
  });

  if (!user) return fail(res, "User not found", 404);

  const { password, ...safeUser } = user;
  return success(res, safeUser);
});

module.exports = { register, login, me };
