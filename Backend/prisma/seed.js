// Seed data per spec section 66 — the hackathon demo should never rely on
// judges creating accounts live. Run with: npm run seed
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const SKILLS = [
  { name: "Python", category: "Technology" },
  { name: "Java", category: "Technology" },
  { name: "JavaScript", category: "Technology" },
  { name: "React", category: "Technology" },
  { name: "Flutter", category: "Technology" },
  { name: "Figma", category: "Design" },
  { name: "Photoshop", category: "Design" },
  { name: "Photography", category: "Media" },
  { name: "Video Editing", category: "Media" },
  { name: "Guitar", category: "Music" },
  { name: "Piano", category: "Music" },
  { name: "Public Speaking", category: "Communication" },
  { name: "English", category: "Languages" },
  { name: "Excel", category: "Business" },
  { name: "Marketing", category: "Business" },
  { name: "Cooking", category: "Lifestyle" },
];

const DEMO_PASSWORD = "password123";

async function upsertSkills() {
  const map = {};
  for (const s of SKILLS) {
    const skill = await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
    map[s.name] = skill.id;
  }
  return map;
}

async function upsertUser({ name, email, university, department }) {
  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
  return prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      name,
      email,
      password: hashedPassword,
      profile: {
        create: {
          university,
          department,
          bio: `Hi, I'm ${name}! Excited to trade skills on campus.`,
          preferredFormat: "BOTH",
        },
      },
    },
  });
}

async function addSkill(userId, skillId, type, level) {
  await prisma.userSkill.upsert({
    where: { userId_skillId_type: { userId, skillId, type } },
    update: {},
    create: { userId, skillId, type, level },
  });
}

async function addAvailability(userId, day, startTime, endTime) {
  const existing = await prisma.availability.findFirst({ where: { userId, day } });
  if (!existing) {
    await prisma.availability.create({ data: { userId, day, startTime, endTime } });
  }
}

async function main() {
  console.log("Seeding skills...");
  const skillId = await upsertSkills();

  console.log("Seeding demo users...");
  const aarav = await upsertUser({
    name: "Aarav",
    email: "aarav@demo.university.edu",
    university: "Demo University",
    department: "Computer Science",
  });
  const sita = await upsertUser({
    name: "Sita",
    email: "sita@demo.university.edu",
    university: "Demo University",
    department: "Music",
  });
  const rohan = await upsertUser({
    name: "Rohan",
    email: "rohan@demo.university.edu",
    university: "Demo University",
    department: "Design",
  });
  const maya = await upsertUser({
    name: "Maya",
    email: "maya@demo.university.edu",
    university: "Demo University",
    department: "Business",
  });
  const nisha = await upsertUser({
    name: "Nisha",
    email: "nisha@demo.university.edu",
    university: "Demo University",
    department: "Communications",
  });

  console.log("Assigning skills...");
  await addSkill(aarav.id, skillId["Python"], "TEACH", "ADVANCED");
  await addSkill(aarav.id, skillId["React"], "TEACH", "INTERMEDIATE");
  await addSkill(aarav.id, skillId["Guitar"], "LEARN", "BEGINNER");
  await addSkill(aarav.id, skillId["Photography"], "LEARN", "BEGINNER");

  await addSkill(sita.id, skillId["Guitar"], "TEACH", "INTERMEDIATE");
  await addSkill(sita.id, skillId["Piano"], "TEACH", "ADVANCED");
  await addSkill(sita.id, skillId["Python"], "LEARN", "BEGINNER");

  await addSkill(rohan.id, skillId["Photoshop"], "TEACH", "ADVANCED");
  await addSkill(rohan.id, skillId["Excel"], "LEARN", "BEGINNER");

  await addSkill(maya.id, skillId["Excel"], "TEACH", "ADVANCED");
  await addSkill(maya.id, skillId["Photography"], "LEARN", "BEGINNER");
  await addSkill(maya.id, skillId["Photoshop"], "LEARN", "BEGINNER");

  await addSkill(nisha.id, skillId["Public Speaking"], "TEACH", "ADVANCED");
  await addSkill(nisha.id, skillId["Python"], "LEARN", "BEGINNER");

  console.log("Setting availability...");
  await addAvailability(aarav.id, "Monday", "17:00", "20:00");
  await addAvailability(aarav.id, "Saturday", "10:00", "14:00");
  await addAvailability(sita.id, "Monday", "18:00", "21:00");
  await addAvailability(sita.id, "Saturday", "10:00", "14:00");
  await addAvailability(rohan.id, "Tuesday", "18:00", "21:00");
  await addAvailability(maya.id, "Tuesday", "18:00", "21:00");
  await addAvailability(nisha.id, "Wednesday", "17:00", "19:00");

  console.log("Creating a pending request (Rohan -> Maya)...");
  const existingPending = await prisma.exchangeRequest.findFirst({
    where: { senderId: rohan.id, receiverId: maya.id },
  });
  if (!existingPending) {
    await prisma.exchangeRequest.create({
      data: {
        senderId: rohan.id,
        receiverId: maya.id,
        teachSkillId: skillId["Photoshop"],
        learnSkillId: skillId["Excel"],
        message: "I can teach Photoshop in exchange for Excel!",
        status: "PENDING",
      },
    });
  }

  console.log("Creating a completed exchange (Aarav <-> Sita) with a verified, reviewed session...");
  let exchange = await prisma.exchangeRequest.findFirst({
    where: { senderId: aarav.id, receiverId: sita.id },
  });
  if (!exchange) {
    exchange = await prisma.exchangeRequest.create({
      data: {
        senderId: aarav.id,
        receiverId: sita.id,
        teachSkillId: skillId["Python"],
        learnSkillId: skillId["Guitar"],
        message: "I can teach Python in exchange for Guitar.",
        status: "ACCEPTED",
      },
    });
  }

  let conversation = await prisma.conversation.findUnique({ where: { exchangeId: exchange.id } });
  if (!conversation) {
    conversation = await prisma.conversation.create({ data: { exchangeId: exchange.id } });
    await prisma.message.createMany({
      data: [
        { conversationId: conversation.id, senderId: aarav.id, content: "Hey! Are you free Saturday at 3 PM?" },
        { conversationId: conversation.id, senderId: sita.id, content: "Yes! Campus Library works for me." },
      ],
    });
  }

  let session = await prisma.session.findFirst({ where: { exchangeId: exchange.id } });
  if (!session) {
    session = await prisma.session.create({
      data: {
        exchangeId: exchange.id,
        teacherId: aarav.id,
        learnerId: sita.id,
        skillId: skillId["Python"],
        date: new Date(),
        startTime: "15:00",
        endTime: "16:00",
        location: "Campus Library",
        status: "COMPLETED",
      },
    });

    await prisma.sessionVerification.create({
      data: {
        sessionId: session.id,
        code: "482913",
        teacherVerified: true,
        learnerVerified: true,
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
        verifiedAt: new Date(),
      },
    });

    await prisma.review.create({
      data: {
        sessionId: session.id,
        reviewerId: sita.id,
        reviewedUserId: aarav.id,
        teachingRating: 5,
        communicationRating: 5,
        reliabilityRating: 5,
        knowledgeRating: 5,
        overallRating: 5,
        wouldExchangeAgain: true,
        comment: "Aarav explained Python really clearly. Would learn from him again!",
      },
    });

    await prisma.profile.update({
      where: { userId: aarav.id },
      data: { rating: 5, totalReviews: 1, completedSessions: 1, reliabilityScore: 100 },
    });
  }

  console.log("Seed complete!");
  console.log("Demo login (any user): password123");
  console.log("  aarav@demo.university.edu");
  console.log("  sita@demo.university.edu");
  console.log("  rohan@demo.university.edu");
  console.log("  maya@demo.university.edu");
  console.log("  nisha@demo.university.edu");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
