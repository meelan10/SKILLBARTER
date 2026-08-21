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
