import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { Exchange, Message, Notification, Session, Skill, User } from "../models/index.js";
import { requireAuth, signToken } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";

const router = Router();
const publicUser = (user) => ({ id: user._id, name: user.name, email: user.email, university: user.university, department: user.department, year: user.year, bio: user.bio, location: user.location, teachSkills: user.teachSkills, learnSkills: user.learnSkills, availability: user.availability, format: user.format, rating: user.rating, reliability: user.reliability });
const credentials = z.object({ email: z.string().email(), password: z.string().min(6) });
const registerSchema = credentials.extend({ name: z.string().min(2).max(80) });

router.post("/auth/register", validate(registerSchema), async (req, res) => {
  const { name, email, password } = req.body;
  if (await User.exists({ email })) return res.status(409).json({ message: "Email is already registered" });
  const user = await User.create({ name, email, passwordHash: await bcrypt.hash(password, 12) });
  res.status(201).json({ user: publicUser(user), token: signToken(user.id) });
});

router.post("/auth/login", validate(credentials), async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+passwordHash");
  if (!user || !(await bcrypt.compare(req.body.password, user.passwordHash))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  res.json({ user: publicUser(user), token: signToken(user.id) });
});

router.get("/auth/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

router.get("/users/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));
router.patch("/users/me", requireAuth, async (req, res) => {
  const allowed = ["name", "university", "department", "year", "bio", "location", "teachSkills", "learnSkills", "availability", "format"];
  const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
  res.json({ user: publicUser(user) });
});

router.get("/skills", async (_req, res) => res.json({ skills: await Skill.find().sort({ category: 1, name: 1 }) }));
router.post("/skills", requireAuth, async (req, res) => res.status(201).json({ skill: await Skill.create(req.body) }));

router.get("/matches", requireAuth, async (req, res) => {
  const users = await User.find({ _id: { $ne: req.user.id } }).limit(50);
  const wanted = new Set(req.user.learnSkills.map((skill) => skill.name.toLowerCase()));
  const offered = new Set(req.user.teachSkills.map((skill) => skill.name.toLowerCase()));
  const matches = users.map((user) => {
    const theirTeach = user.teachSkills.filter((skill) => wanted.has(skill.name.toLowerCase()));
    const theirLearn = user.learnSkills.filter((skill) => offered.has(skill.name.toLowerCase()));
    const score = Math.min(99, 60 + (theirTeach.length * 20) + (theirLearn.length * 20));
    return { user: publicUser(user), score, teach: theirTeach, learn: theirLearn };
  }).sort((a, b) => b.score - a.score);
  res.json({ matches });
});

router.get("/exchanges", requireAuth, async (req, res) => {
  const exchanges = await Exchange.find({ $or: [{ requester: req.user.id }, { recipient: req.user.id }] }).populate("requester recipient", "name email").sort("-createdAt");
  res.json({ exchanges });
});
router.post("/exchanges", requireAuth, async (req, res) => {
  const exchange = await Exchange.create({ ...req.body, requester: req.user.id });
  res.status(201).json({ exchange });
});
router.patch("/exchanges/:id", requireAuth, async (req, res) => {
  const exchange = await Exchange.findOneAndUpdate({ _id: req.params.id, recipient: req.user.id }, { status: req.body.status }, { new: true, runValidators: true });
  if (!exchange) return res.status(404).json({ message: "Exchange not found" });
  res.json({ exchange });
});

router.get("/sessions", requireAuth, async (req, res) => {
  const sessions = await Session.find({ $or: [{ teacher: req.user.id }, { learner: req.user.id }] }).populate("teacher learner", "name").sort("date time");
  res.json({ sessions });
});
router.get("/sessions/:id", requireAuth, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, $or: [{ teacher: req.user.id }, { learner: req.user.id }] }).populate("teacher learner", "name");
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.json({ session });
});
router.post("/sessions", requireAuth, async (req, res) => {
  const session = await Session.create({ ...req.body, teacher: req.body.teacher || req.user.id, verificationCode: String(Math.floor(100000 + Math.random() * 900000)) });
  res.status(201).json({ session });
});
router.patch("/sessions/:id/start", requireAuth, async (req, res) => {
  const session = await Session.findOneAndUpdate({ _id: req.params.id, $or: [{ teacher: req.user.id }, { learner: req.user.id }] }, { status: "STARTED" }, { new: true });
  if (!session) return res.status(404).json({ message: "Session not found" });
  res.json({ session });
});
router.post("/sessions/:id/verify", requireAuth, async (req, res) => {
  const session = await Session.findOne({ _id: req.params.id, $or: [{ teacher: req.user.id }, { learner: req.user.id }] }).select("+verificationCode");
  if (!session) return res.status(404).json({ message: "Session not found" });
  if (session.verificationCode !== req.body.code) return res.status(400).json({ message: "Invalid verification code" });
  session.status = "COMPLETED";
  await session.save();
  res.json({ session });
});

router.get("/conversations/:conversationId/messages", requireAuth, async (req, res) => {
  const messages = await Message.find({ conversation: req.params.conversationId, $or: [{ sender: req.user.id }, { recipient: req.user.id }] }).sort("createdAt");
  res.json({ messages });
});
router.post("/conversations/:conversationId/messages", requireAuth, async (req, res) => {
  const message = await Message.create({ conversation: req.params.conversationId, sender: req.user.id, recipient: req.body.recipient, text: req.body.text });
  res.status(201).json({ message });
});

router.get("/notifications", requireAuth, async (req, res) => res.json({ notifications: await Notification.find({ user: req.user.id }).sort("-createdAt") }));
router.patch("/notifications/:id/read", requireAuth, async (req, res) => res.json({ notification: await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { readAt: new Date() }, { new: true }) }));

export default router;
