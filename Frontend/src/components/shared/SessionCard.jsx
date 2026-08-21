import { Link } from "react-router-dom";
import { MapPin, Clock } from "lucide-react";
import Badge from "../ui/Badge";
import Avatar from "../ui/Avatar";

const statusColor = {
  SCHEDULED: "brand",
  STARTED: "amber",
  COMPLETED: "teal",
  CANCELLED: "red",
};

export default function SessionCard({ session }) {
  return (
    <Link to={`/sessions/${session.id}`}>
      <div className="bg-card border border-border rounded-2xl p-5 hover:border-brand/40 transition-colors">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar name={session.partner} size={40} />
            <div>
              <p className="font-semibold text-text">{session.skill}</p>
              <p className="text-sm text-muted">
                {session.role === "teacher" ? "Teaching" : "Learning from"}{" "}
                {session.partner}
              </p>
            </div>
          </div>
          <Badge color={statusColor[session.status]}>{session.status}</Badge>
        </div>

        <div className="flex items-center gap-5 mt-4 text-sm text-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {session.date} · {session.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {session.location}
          </span>
        </div>
      </div>
    </Link>
  );
}
