import { useState } from "react";
import { Flame, CircleCheck } from "lucide-react";
import MatchCard from "../components/shared/MatchCard";
import { matches, matchScoreBreakdown } from "../utils/mockData";

export default function MatchesPage() {
  const [tab, setTab] = useState("perfect");

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Find Matches</h1>
      <p className="text-muted mt-1">
        Ranked by compatibility score — skills, availability, level, format
        and campus.
      </p>

      <div className="flex items-center gap-3 mt-6">
        <button
          onClick={() => setTab("perfect")}
          className={
            tab === "perfect"
              ? "flex items-center gap-1.5 bg-ink text-white text-sm font-medium px-4 py-2 rounded-full"
              : "flex items-center gap-1.5 bg-card border border-border text-muted text-sm font-medium px-4 py-2 rounded-full"
          }
        >
          <Flame size={14} /> Perfect Matches
        </button>
        <button
          onClick={() => setTab("compatible")}
          className={
            tab === "compatible"
              ? "flex items-center gap-1.5 bg-ink text-white text-sm font-medium px-4 py-2 rounded-full"
              : "flex items-center gap-1.5 bg-card border border-border text-muted text-sm font-medium px-4 py-2 rounded-full"
          }
        >
          <CircleCheck size={14} className="text-teal" /> Compatible
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-4">
          {matches.map((m) => (
            <MatchCard key={m.id} match={m} />
          ))}
        </div>

        <div className="bg-card border border-border rounded-2xl p-5 h-fit">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-semibold tracking-wide text-muted">
              COMPATIBILITY SCORE
            </p>
            <span className="text-xs font-semibold text-brand bg-brand-soft px-2 py-0.5 rounded-full">
              {matchScoreBreakdown.total}%
            </span>
          </div>

          <div className="space-y-3">
            {matchScoreBreakdown.rows.map((row) => (
              <div key={row.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-brand">{row.label}</span>
                  <span className="font-semibold text-text">
                    {row.value}/{row.max}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand rounded-full"
                    style={{ width: `${(row.value / row.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-muted mt-4">
            Computed from your profile — not a black box, and not AI.
          </p>
        </div>
      </div>
    </div>
  );
}
