export const conversations = [
  {
    id: 1,
    name: "Sita Lakshmi",
    lastMessage: "Booked. I'll bring my laptop, you bring the guitar.",
    time: "4:08 PM",
    unread: 0,
    exchangeLabel: "Exchange #1 • Accepted",
    skillLine: "Python for Data ↔ Classical Guitar",
    teach: "Python for Data",
    receive: "Classical Guitar",
    status: "ACCEPTED",
    messages: [
      { id: 1, from: "them", text: "Hey Aarav! Saw your Python profile — I'd love to swap.", time: "4:02 PM" },
      { id: 2, from: "me", text: "Perfect. Are you free Saturday at 3 PM?", time: "4:05 PM" },
      { id: 3, from: "them", text: "Saturday works. Campus library, quiet zone?", time: "4:06 PM" },
      { id: 4, from: "me", text: "Booked. I'll bring my laptop, you bring the guitar.", time: "4:08 PM" },
    ],
  },
  {
    id: 2,
    name: "Nisha Verma",
    lastMessage: "Happy to walk you through React hooks this weekend.",
    time: "1:20 PM",
    unread: 1,
    exchangeLabel: "Exchange #2 • Pending",
    skillLine: "React ↔ Public Speaking",
    teach: "React",
    receive: "Public Speaking",
    status: "PENDING",
    messages: [
      { id: 1, from: "them", text: "Hi! I want to learn React, saw you teach it.", time: "1:15 PM" },
      { id: 2, from: "them", text: "Happy to walk you through React hooks this weekend.", time: "1:20 PM" },
    ],
  },
  {
    id: 3,
    name: "Rohan Mehta",
    lastMessage: "Thanks for the editing crash course!",
    time: "Yesterday",
    unread: 0,
    exchangeLabel: "Exchange #3 • Completed",
    skillLine: "Python for Data ↔ Adobe Lightroom",
    teach: "Python for Data",
    receive: "Adobe Lightroom",
    status: "COMPLETED",
    messages: [
      { id: 1, from: "me", text: "How did the edits turn out?", time: "Yesterday" },
      { id: 2, from: "them", text: "Thanks for the editing crash course!", time: "Yesterday" },
    ],
  },
];

export function getConversation(id) {
  return conversations.find((c) => String(c.id) === String(id)) || conversations[0];
}
