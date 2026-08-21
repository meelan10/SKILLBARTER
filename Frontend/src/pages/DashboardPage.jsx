import { Flame, Key } from "lucide-react";
import Badge from "../components/ui/Badge";
import ProgressBar from "../components/ui/ProgressBar";
import MatchCard from "../components/shared/MatchCard";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { matches, currentUser } from "../utils/mockData";

const reputation = [
  { label: "Teaching Quality", value: 4.9, color: "teal" },
  { label: "Communication", value: 5.0, color: "teal" },
  { label: "Punctuality", value: 4.7, color: "brand" },
  { label: "Knowledge", value: 4.9, color: "brand" },
];

export default function DashboardPage() {
  const { user } = useAuth();
  const firstName = (user?.name || currentUser.name).split(" ")[0];

  return (
    <div>
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">
            Welcome back, {firstName}
          </h1>
          <p className="text-muted mt-1">
            You have {matches.length} reciprocal matches waiting for your
            approval.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-card border border-border rounded-2xl px-5 py-3 text-center">
            <p className="text-[11px] tracking-wide text-muted font-semibold">
              RELIABILITY
            </p>
            <p className="text-lg font-bold text-teal">
              {currentUser.reliability}%
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl px-5 py-3 text-center">
            <p className="text-[11px] tracking-wide text-muted font-semibold">
              SESSIONS
            </p>
            <p className="text-lg font-bold text-text">
              {currentUser.verifiedSessions}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xs font-semibold tracking-wide text-muted">
              PERFECT MATCHES
            </h2>
            <Badge color="amber">
              <Flame size={12} /> RECIPROCAL
            </Badge>
          </div>

          <div className="space-y-4">
            {matches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-brand rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between text-xs">
              <span className="tracking-wide font-semibold opacity-80">
                NEXT SESSION
              </span>
              <span className="bg-white/20 px-2 py-0.5 rounded-full">
                Tomorrow 3:00 PM
              </span>
            </div>
            <h3 className="text-lg font-bold mt-3">Advanced React</h3>
            <p className="text-sm opacity-80">With Nisha Verma • Main Library</p>

            <div className="bg-white/10 rounded-xl p-3 mt-4 flex items-center justify-between">
              <div>
                <p className="text-[11px] opacity-70 font-semibold tracking-wide">
                  VERIFICATION STATUS
                </p>
                <p className="text-sm">Requires 6-digit code</p>
              </div>
              <Button variant="secondary" className="!text-brand !bg-white text-xs !px-3 !py-1.5">
                <Key size={13} className="inline mr-1" /> Open
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold tracking-wide text-muted mb-4">
              REPUTATION
            </p>
            <div className="space-y-3">
              {reputation.map((r) => (
                <div key={r.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-text">{r.label}</span>
                    <span className="font-semibold text-text">
                      {r.value.toFixed(1)}/5.0
                    </span>
                  </div>
                  <ProgressBar value={r.value} max={5} color={r.color} />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <p className="text-xs font-semibold tracking-wide text-muted mb-3">
              CAMPUS SKILL GAP
            </p>
            <div className="flex items-start gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber mt-1.5" />
              <div>
                <p className="text-sm font-semibold text-text">
                  High Demand: UI Design
                </p>
                <p className="text-sm text-muted">
                  15 students want to learn this.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
