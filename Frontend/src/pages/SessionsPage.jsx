import SessionCard from "../components/shared/SessionCard";
import { sessions } from "../utils/mockSessions";

export default function SessionsPage() {
  const upcoming = sessions.filter((s) => s.status !== "COMPLETED");
  const completed = sessions.filter((s) => s.status === "COMPLETED");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Sessions</h1>
      <p className="text-muted mt-1">
        Scheduled and completed skill exchange sessions.
      </p>

      <div className="mt-8">
        <p className="text-xs font-semibold tracking-wide text-muted mb-4">
          UPCOMING
        </p>
        <div className="space-y-4">
          {upcoming.length === 0 && (
            <p className="text-sm text-muted">
              No upcoming sessions. Find a skill partner to get started.
            </p>
          )}
          {upcoming.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-semibold tracking-wide text-muted mb-4">
          COMPLETED
        </p>
        <div className="space-y-4">
          {completed.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      </div>
    </div>
  );
}
