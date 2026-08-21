export const sessions = [
  {
    id: 1,
    skill: "Advanced React",
    partner: "Nisha Verma",
    date: "Tomorrow",
    time: "3:00 PM – 4:00 PM",
    location: "Main Library",
    status: "SCHEDULED",
    role: "learner",
  },
  {
    id: 2,
    skill: "Python for Data",
    partner: "Sita Lakshmi",
    date: "Saturday",
    time: "3:00 PM – 4:00 PM",
    location: "Campus Library",
    status: "SCHEDULED",
    role: "teacher",
  },
  {
    id: 3,
    skill: "Adobe Lightroom",
    partner: "Rohan Mehta",
    date: "Aug 14",
    time: "2:00 PM – 3:00 PM",
    location: "Online",
    status: "COMPLETED",
    role: "learner",
  },
];

export function getSessionById(id) {
  return sessions.find((s) => String(s.id) === String(id));
}
