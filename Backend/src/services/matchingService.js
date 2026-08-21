const prisma = require("../config/prisma");
const { getBlockedUserIds } = require("./blockService");

// Weights from spec section 32. This is a deterministic heuristic score,
// not AI — the product intentionally calls it a "Compatibility Score".
const WEIGHTS = {
  skillCompatibility: 40,
  availability: 25,
  skillLevel: 15,
  format: 10,
  campus: 10,
};

function overlaps(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

function availabilityScore(mine, theirs) {
  if (mine.length === 0 || theirs.length === 0) return 0;

  const overlappingDays = new Set();
  for (const m of mine) {
    for (const t of theirs) {
      if (m.day !== t.day) continue;
      if (overlaps(m.startTime, m.endTime, t.startTime, t.endTime)) {
        overlappingDays.add(m.day);
      }
    }
  }

  const myDays = new Set(mine.map((a) => a.day)).size;
  const ratio = Math.min(overlappingDays.size / myDays, 1);
  return ratio * WEIGHTS.availability;
}

function formatScore(mine, theirs) {
  if (!mine || !theirs) return WEIGHTS.format * 0.5; // unknown → half credit
  if (mine === "BOTH" || theirs === "BOTH" || mine === theirs) {
    return WEIGHTS.format;
  }
  return 0;
}

function campusScore(mine, theirs) {
  if (!mine || !theirs) return 0;
  return mine.toLowerCase() === theirs.toLowerCase() ? WEIGHTS.campus : 0;
}

/**
 * Compute matches for a given user.
 * RECIPROCAL: both sides teach what the other wants to learn.
 * COMPATIBLE: the candidate can teach something this user wants to learn,
 *             but the reciprocal side isn't there yet.
 */
async function computeMatches(userId) {
  const [me, myProfile, myAvailability, blockedIds] = await Promise.all([
    prisma.userSkill.findMany({ where: { userId }, include: { skill: true } }),
    prisma.profile.findUnique({ where: { userId } }),
    prisma.availability.findMany({ where: { userId } }),
    getBlockedUserIds(userId),
  ]);

  const myTeach = me.filter((s) => s.type === "TEACH");
  const myLearn = me.filter((s) => s.type === "LEARN");
  const myTeachSkillIds = myTeach.map((s) => s.skillId);
  const myLearnSkillIds = myLearn.map((s) => s.skillId);

  if (myTeachSkillIds.length === 0 && myLearnSkillIds.length === 0) {
    return [];
  }

  // Candidates: anyone who teaches at least one skill I want to learn.
  const candidateSkills = await prisma.userSkill.findMany({
    where: {
      type: "TEACH",
      skillId: { in: myLearnSkillIds },
      userId: { notIn: [userId, ...blockedIds] },
    },
    include: { skill: true },
  });

  const candidateIds = Array.from(new Set(candidateSkills.map((c) => c.userId)));
  if (candidateIds.length === 0) return [];

  const [candidateUsers, candidateAllSkills, candidateAvailability] = await Promise.all([
    prisma.user.findMany({
      where: { id: { in: candidateIds } },
      include: { profile: true },
    }),
    prisma.userSkill.findMany({
      where: { userId: { in: candidateIds } },
      include: { skill: true },
    }),
    prisma.availability.findMany({ where: { userId: { in: candidateIds } } }),
  ]);

  const results = [];

  for (const candidate of candidateUsers) {
    const theirSkills = candidateAllSkills.filter((s) => s.userId === candidate.id);
    const theirTeach = theirSkills.filter((s) => s.type === "TEACH");
    const theirLearn = theirSkills.filter((s) => s.type === "LEARN");
    const theirAvailability = candidateAvailability.filter((a) => a.userId === candidate.id);

    const theyTeachWhatIWant = theirTeach.filter((s) => myLearnSkillIds.includes(s.skillId));
    const theyWantWhatITeach = theirLearn.some((s) => myTeachSkillIds.includes(s.skillId));

    if (theyTeachWhatIWant.length === 0) continue; // shouldn't happen given the query above

    const matchType = theyWantWhatITeach ? "RECIPROCAL" : "COMPATIBLE";

    // Skill compatibility: 25 pts for "they teach what I want",
    // +15 pts more if it's reciprocal.
    const skillCompat =
      (theyTeachWhatIWant.length > 0 ? 25 : 0) + (theyWantWhatITeach ? 15 : 0);

    const avail = availabilityScore(myAvailability, theirAvailability);
    const level = theyTeachWhatIWant.length > 0 ? WEIGHTS.skillLevel : 0;
    const format = formatScore(myProfile?.preferredFormat, candidate.profile?.preferredFormat);
    const campus = campusScore(myProfile?.university, candidate.profile?.university);

    const score = Math.round(skillCompat + avail + level + format + campus);

    // For display: pick one representative skill pair.
    const theyTeachSkill = theyTeachWhatIWant[0].skill;
    const iTeachSkillForThem = theirLearn.find((s) => myTeachSkillIds.includes(s.skillId));

    results.push({
      userId: candidate.id,
      name: candidate.name,
      rating: candidate.profile?.rating ?? 0,
      reliabilityScore: candidate.profile?.reliabilityScore ?? 100,
      matchType,
      score,
      youLearn: theyTeachSkill.name,
      youTeach: iTeachSkillForThem ? iTeachSkillForThem.skill.name : null,
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}

module.exports = { computeMatches };
