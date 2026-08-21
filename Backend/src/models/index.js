import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, unique: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, default: "" },
}, { timestamps: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  university: { type: String, default: "" },
  department: { type: String, default: "" },
  year: { type: String, default: "" },
  bio: { type: String, default: "" },
  location: { type: String, default: "" },
  teachSkills: [{ name: String, level: String }],
  learnSkills: [{ name: String, level: String }],
  availability: [{ day: String, time: String }],
  format: { type: String, default: "Campus + Online" },
  rating: { type: Number, default: 0 },
  reliability: { type: Number, default: 100 },
}, { timestamps: true });

const exchangeSchema = new mongoose.Schema({
  requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  teach: { type: String, required: true },
  receive: { type: String, required: true },
  note: { type: String, default: "" },
  status: { type: String, enum: ["PENDING", "ACCEPTED", "DECLINED", "COMPLETED"], default: "PENDING" },
}, { timestamps: true });

const sessionSchema = new mongoose.Schema({
  exchange: { type: mongoose.Schema.Types.ObjectId, ref: "Exchange", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  skill: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String, default: "Online" },
  status: { type: String, enum: ["SCHEDULED", "STARTED", "COMPLETED"], default: "SCHEDULED" },
  verificationCode: { type: String, select: false },
}, { timestamps: true });

const messageSchema = new mongoose.Schema({
  conversation: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, trim: true, maxlength: 2000 },
  readAt: Date,
}, { timestamps: true });

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  type: { type: String, required: true },
  text: { type: String, required: true },
  readAt: Date,
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);
export const Skill = mongoose.models.Skill || mongoose.model("Skill", skillSchema);
export const Exchange = mongoose.models.Exchange || mongoose.model("Exchange", exchangeSchema);
export const Session = mongoose.models.Session || mongoose.model("Session", sessionSchema);
export const Message = mongoose.models.Message || mongoose.model("Message", messageSchema);
export const Notification = mongoose.models.Notification || mongoose.model("Notification", notificationSchema);
