import "dotenv/config";
import bcrypt from "bcryptjs";
import { connectDB } from "./config/db.js";
import { Skill, User } from "./models/index.js";

await connectDB();
if (!process.env.MONGODB_URI) process.exit(1);

const passwordHash = await bcrypt.hash("password123", 12);
const user = await User.findOneAndUpdate(
  { email: "aarav@skillbarter.test" },
  {
    name: "Aarav Sharma",
    email: "aarav@skillbarter.test",
    passwordHash,
    university: "Kathmandu University",
    department: "Computer Science",
    year: "3rd Year",
    bio: "Computer Science student who builds data tools for fun.",
    teachSkills: [{ name: "Python", level: "ADVANCED" }, { name: "React", level: "INTERMEDIATE" }],
    learnSkills: [{ name: "Classical Guitar", level: "BEGINNER" }, { name: "Photography", level: "BEGINNER" }],
  },
  { upsert: true, new: true, setDefaultsOnInsert: true },
);

await Skill.bulkWrite([
  ["Python", "Technology"], ["React", "Technology"], ["Excel", "Technology"],
  ["Classical Guitar", "Music"], ["Piano", "Music"], ["Figma", "Design & Media"],
  ["Video Editing", "Design & Media"], ["Public Speaking", "Communication"],
].map(([name, category]) => ({ updateOne: { filter: { name }, update: { name, category }, upsert: true } })));

console.log(`Seeded demo user ${user.email} with password password123`);
process.exit(0);
