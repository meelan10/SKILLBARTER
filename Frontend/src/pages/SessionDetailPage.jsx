import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, ArrowLeft } from "lucide-react";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import { getSessionById } from "../utils/mockSessions";

const statusColor = {
  SCHEDULED: "brand",
  STARTED: "amber",
  COMPLETED: "teal",
};

function generateCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export default function SessionDetailPage() {
  const { id } = useParams();
  const session = getSessionById(id) || getSessionById(1);

  const [status, setStatus] = useState(session.status);
  const [code] = useState(generateCode);
  const [enteredCode, setEnteredCode] = useState("");
  const [error, setError] = useState("");

  const handleStart = () => setStatus("STARTED");

  const handleVerify = (e) => {
    e.preventDefault();
    if (enteredCode === code) {
      setStatus("COMPLETED");
      setError("");
    } else {
      setError("That code doesn't match. Ask your partner to confirm it.");
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
            <Avatar name={session.partner} size={48} />
            <div>
              <h1 className="text-xl font-bold text-text">{session.skill}</h1>
              <p className="text-sm text-muted">
                {session.role === "teacher" ? "Teaching" : "Learning from"}{" "}
                {session.partner}
              </p>
            </div>
          </div>
          <Badge color={statusColor[status]}>{status}</Badge>
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
        {status === "SCHEDULED" && (
          <div className="mt-6 pt-6 border-t border-border">
            <Button onClick={handleStart} className="w-full">
              Start Session
            </Button>
          </div>
        )}

        {/* STARTED — verification */}
        {status === "STARTED" && (
          <div className="mt-6 pt-6 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-muted mb-2">
                SESSION CODE
              </p>
              <div className="bg-brand-soft text-brand text-center rounded-xl py-4 text-2xl font-bold tracking-[0.3em]">
                {code}
              </div>
              <p className="text-xs text-muted mt-2">
                Show this code to {session.partner} to verify.
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
              {error && (
                <p className="text-xs text-red mt-2">{error}</p>
              )}
              <Button type="submit" className="w-full mt-3">
                Verify
              </Button>
            </form>
          </div>
        )}

        {/* COMPLETED */}
        {status === "COMPLETED" && (
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
