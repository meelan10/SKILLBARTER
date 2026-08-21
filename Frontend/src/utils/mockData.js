export const currentUser = {
  name: "Aarav Sharma",
  university: "Kathmandu University",
  department: "Computer Science",
  year: "3rd Year",
  rating: 4.8,
  reliability: 96.8,
  verifiedSessions: 24,
  bio: "Computer Science student who builds data tools for fun. I teach Python and React, and I am learning classical guitar one chord at a time.",
  teachSkills: [
    { name: "Python for Data", level: "ADVANCED" },
    { name: "React", level: "INTERMEDIATE" },
  ],
  learnSkills: [
    { name: "Classical Guitar", level: "BEGINNER" },
    { name: "Photography", level: "BEGINNER" },
  ],
  availability: [
    { day: "Mon – Fri", time: "5:00 PM – 9:00 PM" },
    { day: "Saturday", time: "10:00 AM – 2:00 PM" },
  ],
  format: "Campus + Online",
};

export const matches = [
  {
    id: 1,
    name: "Sita Lakshmi",
    meta: "Computer Science • 3rd Year",
    match: 96,
    type: "reciprocal",
    learn: "Classical Guitar",
    teach: "Python for Data",
  },
  {
    id: 2,
    name: "Nisha Verma",
    meta: "Communication Studies • 2nd Year",
    match: 88,
    type: "reciprocal",
    learn: "Public Speaking",
    teach: "React",
  },
];

export const matchScoreBreakdown = {
  total: 96,
  rows: [
    { label: "Skill compatibility", value: 40, max: 40 },
    { label: "Availability", value: 23, max: 25 },
    { label: "Skill level", value: 15, max: 15 },
    { label: "Format", value: 10, max: 10 },
    { label: "Campus", value: 8, max: 10 },
  ],
};

export const skillCategories = [
  {
    name: "Technology",
    skills: [
      { name: "Python", count: 42 },
      { name: "React", count: 31 },
      { name: "Excel", count: 22 },
    ],
  },
  {
    name: "Music",
    skills: [
      { name: "Classical Guitar", count: 18 },
      { name: "Piano", count: 9 },
    ],
  },
  {
    name: "Design & Media",
    skills: [
      { name: "Figma", count: 27 },
      { name: "Adobe Lightroom", count: 14 },
      { name: "Video Editing", count: 11 },
    ],
  },
  {
    name: "Communication",
    skills: [
      { name: "Public Speaking", count: 16 },
      { name: "English Writing", count: 25 },
    ],
  },
];

export const exchanges = [
  {
    id: 1,
    name: "Sita Lakshmi",
    status: "ACCEPTED",
    note: "I can teach Python in exchange for Guitar.",
    teach: "Python for Data",
    receive: "Classical Guitar",
    primaryAction: "Open Chat",
    secondaryAction: "Schedule Session",
  },
  {
    id: 2,
    name: "Nisha Verma",
    status: "PENDING",
    note: "Happy to walk you through React hooks this weekend.",
    teach: "React",
    receive: "Public Speaking",
    primaryAction: "Accept",
    secondaryAction: "Decline",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    status: "COMPLETED",
    note: "Thanks for the editing crash course!",
    teach: "Python for Data",
    receive: "Adobe Lightroom",
    primaryAction: "View Sessions",
  },
];

export const heroMatch = {
  you: { name: "Aarav Sharma" },
  them: { name: "Sita Sharma" },
  youTeach: { skill: "Python", level: "Advanced" },
  youLearn: { skill: "Guitar", level: "Beginner" },
  theyTeach: { skill: "Guitar", level: "Intermediate" },
  theyLearn: { skill: "Python", level: "Beginner" },
  score: 98,
};

export const recommendedMatches = [
  {
    id: 1,
    name: "Sita Sharma",
    match: 98,
    youTeach: "Python",
    theyTeach: "Guitar",
  },
  {
    id: 2,
    name: "Rohan Kandel",
    match: 86,
    youTeach: "Web Dev",
    theyTeach: "Photoshop",
  },
  {
    id: 3,
    name: "Maya Gurung",
    match: 78,
    youTeach: "Video Editing",
    theyTeach: "Photography",
  },
];

export const profileHeader = {
  name: "Aarav Sharma",
  badge: "Top Trader",
  role: "Python Developer & AI Enthusiast",
  location: "Kathmandu, Nepal",
  joined: "Jan 2024",
  bio: "Passionate about coding, problem solving and sharing knowledge.",
};

export const profileStats = {
  sessionsCompleted: 24,
  sessionsDelta: "+3 this month",
  avgRating: 4.8,
  avgRatingLabel: "Excellent",
  reliability: 96,
};

export const allSessions = [
  { id: 1, name: "Sita Sharma", skill: "Guitar", date: "May 12, 2024", duration: "1h 30m", status: "Completed", rating: 5.0 },
  { id: 2, name: "Rohan Kandel", skill: "Web Dev", date: "Apr 28, 2024", duration: "2h 15m", status: "Completed", rating: 4.5 },
  { id: 3, name: "Maya Gurung", skill: "Video Editing", date: "Apr 15, 2024", duration: "1h 45m", status: "Completed", rating: 5.0 },
  { id: 4, name: "Prabin Thapa", skill: "UI/UX Design", date: "Mar 30, 2024", duration: "2h 0m", status: "Completed", rating: 4.5 },
  { id: 5, name: "Anusha Rai", skill: "Python", date: "Mar 18, 2024", duration: "1h 30m", status: "Completed", rating: 5.0 },
  { id: 6, name: "Bikram Karki", skill: "Digital Marketing", date: "Mar 05, 2024", duration: "1h 15m", status: "Completed", rating: 4.0 },
  { id: 7, name: "Samikshya Dhakal", skill: "Content Writing", date: "Feb 20, 2024", duration: "1h 0m", status: "Completed", rating: 5.0 },
  { id: 8, name: "Nabin Shrestha", skill: "Photoshop", date: "Feb 10, 2024", duration: "1h 30m", status: "Completed", rating: 4.5 },
];

export const recentActivity = [
  { id: 1, type: "check", text: "You completed a session with Sita Sharma", time: "2h ago" },
  { id: 2, type: "star", text: "You received a 5-star rating from Sita Sharma", time: "2h ago" },
  { id: 3, type: "check", text: "You completed a session with Rohan Kandel", time: "1d ago" },
  { id: 4, type: "flame", text: "New match found! You and Maya Gurung both want to learn Python.", time: "2d ago" },
  { id: 5, type: "check", text: "You accepted a session request from Prabin Thapa", time: "3d ago" },
];

export const ratingBreakdown = [
  { stars: 5, count: 18 },
  { stars: 4, count: 5 },
  { stars: 3, count: 1 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

export const profileTeachSkills = [
  { name: "Python", level: "Advanced" },
  { name: "Guitar", level: "Intermediate" },
];

export const profileLearnSkills = [
  { name: "Web Development", level: "Beginner" },
  { name: "UI/UX Design", level: "Beginner" },
];
