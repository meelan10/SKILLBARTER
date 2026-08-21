import SessionCard from "../components/shared/SessionCard";
import { useResource } from "../hooks/useApi";

export default function SessionsPage() {
  const { data: apiSessions = [], loading, error } = useResource("/sessions", "sessions");
  const sessions = apiSessions.map((session) => ({
    ...session,
    id: session._id,
    partner: session.teacher?.name || session.learner?.name || "Partner",
    role: session.teacher?.name ? "learner" : "teacher",
  }));
  const upcoming = sessions.filter((session) => session.status !== "COMPLETED");
  const completed = sessions.filter((session) => session.status === "COMPLETED");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Sessions</h1>
      <p className="text-muted mt-1">
        Scheduled and completed skill exchange sessions.
      </p>

      {loading && <p className="mt-8 text-sm text-muted">Loading sessions...</p>}
      {error && <p className="mt-8 text-sm text-red">{error}</p>}

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
