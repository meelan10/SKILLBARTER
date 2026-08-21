import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import { useResource, useApi } from "../hooks/useApi";

const statusColor = {
  SCHEDULED: "brand",
  STARTED: "amber",
  COMPLETED: "teal",
};

export default function SessionDetailPage() {
  const { id } = useParams();
  const { data: session, loading, error: resourceError } = useResource(`/sessions/${id}`, "session");
  const { request } = useApi();

  const [status, setStatus] = useState("");
  const [enteredCode, setEnteredCode] = useState("");
  const [formError, setFormError] = useState("");

  if (loading) return <p className="text-sm text-muted">Loading session...</p>;
  if (resourceError || !session) return <p className="text-sm text-red">{resourceError || "Session not found"}</p>;
  const currentStatus = status || session.status;

  const handleStart = async () => {
    const result = await request(`/sessions/${id}/start`, { method: "PATCH" });
    setStatus(result.session.status);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const result = await request(`/sessions/${id}/verify`, { method: "POST", body: { code: enteredCode } });
      setStatus(result.session.status);
      setFormError("");
    } catch (requestError) {
      setFormError(requestError.message);
    }
  };

  return (
    <div className="max-w-2xl">
      <Link
        to="/sessions"
        className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text mb-6"
      >
        <ArrowLeft size={15} /> Back to sessions
      </Link>

      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={session.teacher?.name || session.learner?.name || "Partner"} size={48} />
            <div>
              <h1 className="text-xl font-bold text-text">{session.skill}</h1>
              <p className="text-sm text-muted">
                {session.teacher?.name ? "Teaching" : "Learning from"}{" "}
                  {session.teacher?.name || session.learner?.name}
              </p>
            </div>
          </div>
          <Badge color={statusColor[currentStatus]}>{currentStatus}</Badge>
        </div>

        <div className="flex items-center gap-6 mt-5 text-sm text-muted border-t border-border pt-5">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {session.date} · {session.time}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {session.location}
          </span>
        </div>

        {/* SCHEDULED */}
        {currentStatus === "SCHEDULED" && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button onClick={handleStart} className="w-full">
              Start Session
            </Button>
          </div>
        )}

        {/* STARTED — verification */}
        {currentStatus === "STARTED" && (
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted mb-2">
                SESSION CODE
              </p>
              <div className="bg-brand-soft text-brand text-center rounded-xl py-4 text-2xl font-bold tracking-[0.3em]">
                Session verification required
              </div>
              <p className="text-xs text-muted mt-2">
                Ask your partner for their session code to verify.
              </p>
            </div>

            <form onSubmit={handleVerify}>
              <p className="text-xs font-semibold tracking-wide text-muted mb-2">
                ENTER PARTNER CODE
              </p>
              <input
                type="text"
                maxLength={6}
                value={enteredCode}
                onChange={(e) => setEnteredCode(e.target.value)}
                placeholder="000000"
                className="w-full border border-border rounded-xl py-3 text-center text-xl tracking-[0.3em] outline-none focus:ring-2 focus:ring-brand/30"
              />
              {formError && (
                <p className="text-xs text-red mt-2">{formError}</p>
              )}
              <Button type="submit" className="w-full mt-3">
                Verify
              </Button>
            </form>
          </div>
        )}

        {/* COMPLETED */}
        {currentStatus === "COMPLETED" && (
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-teal font-semibold mb-3">
              ✓ Session verified and completed
            </p>
            <Link to="/exchanges">
              <Button className="w-full">Leave a Review</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
