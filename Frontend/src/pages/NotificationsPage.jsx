import { Flame, MessageSquare, CheckCircle2, Star, Handshake } from "lucide-react";

const notifications = [
  {
    id: 1,
    icon: Flame,
    color: "text-orange bg-orange-soft",
    title: "New perfect match",
    body: "Sita Sharma is a 98% match for Python ↔ Guitar.",
    time: "2h ago",
  },
  {
    id: 2,
    icon: Handshake,
    color: "text-brand bg-brand-soft",
    title: "Exchange request",
    body: "Nisha Verma wants to exchange React for Public Speaking.",
    time: "5h ago",
  },
  {
    id: 3,
    icon: MessageSquare,
    color: "text-teal-dark bg-teal-soft",
    title: "New message",
    body: "Sita Lakshmi: \"Saturday works. Campus library, quiet zone?\"",
    time: "1d ago",
  },
  {
    id: 4,
    icon: CheckCircle2,
    color: "text-teal-dark bg-teal-soft",
    title: "Session completed",
    body: "Your Python session with Rohan Mehta was verified.",
    time: "2d ago",
  },
  {
    id: 5,
    icon: Star,
    color: "text-amber bg-amber-soft",
    title: "Review available",
    body: "Leave a review for your session with Rohan Mehta.",
    time: "2d ago",
  },
];

export default function NotificationsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-text">Notifications</h1>
      <p className="text-muted mt-1">Stay on top of matches, requests and sessions.</p>

      <div className="mt-6 space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className="flex items-start gap-4 bg-white border border-border rounded-2xl p-4"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}>
              <n.icon size={18} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text text-sm">{n.title}</p>
              <p className="text-sm text-muted mt-0.5">{n.body}</p>
            </div>
            <span className="text-xs text-muted whitespace-nowrap">{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
