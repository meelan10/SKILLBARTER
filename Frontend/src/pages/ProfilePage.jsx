import { useState } from "react";
import { Pencil, Share2, MapPin, Calendar, Star, ArrowRight, CheckCircle2, Flame } from "lucide-react";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Button from "../components/ui/Button";
import {
  profileHeader, profileStats, allSessions, recentActivity,
  ratingBreakdown, profileTeachSkills, profileLearnSkills,
} from "../utils/mockData";

const tabs = ["Overview", "Sessions", "Reviews", "Skills", "Badges"];

const activityIcon = {
  check: { icon: CheckCircle2, color: "text-teal-dark bg-teal-soft" },
  star: { icon: Star, color: "text-amber bg-amber-soft" },
  flame: { icon: Flame, color: "text-orange bg-orange-soft" },
};

export default function ProfilePage() {
  const [tab, setTab] = useState("Overview");
  const totalReviews = ratingBreakdown.reduce((s, r) => s + r.count, 0);

  return (
    <div>
      {/* Header card */}
      <div className="bg-white border border-border rounded-2xl p-6">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex gap-5">
            <div className="relative">
              <Avatar name={profileHeader.name} size={88} />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-border flex items-center justify-center text-muted hover:text-text">
                <Pencil size={13} />
              </button>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-text">
                  {profileHeader.name}
                </h1>
                <Badge color="teal">{profileHeader.badge}</Badge>
              </div>
              <p className="text-sm text-muted mt-1">{profileHeader.role}</p>
              <div className="flex items-center gap-4 text-sm text-muted mt-1.5">
                <span className="flex items-center gap-1">
                  <MapPin size={13} /> {profileHeader.location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} /> Joined {profileHeader.joined}
                </span>
              </div>
              <p className="text-sm text-text mt-2 max-w-md">
                {profileHeader.bio}
              </p>
              <div className="flex items-center gap-3 mt-4">
                <Button className="!py-2">Edit Profile</Button>
                <Button variant="secondary" className="!py-2 flex items-center gap-1.5">
                  <Share2 size={14} /> Share Profile
                </Button>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="text-center">
              <p className="text-sm text-muted">Sessions Completed</p>
              <p className="text-3xl font-bold text-text mt-1">
                {profileStats.sessionsCompleted}
              </p>
              <p className="text-xs text-teal-dark mt-1">
                {profileStats.sessionsDelta}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Average Rating</p>
              <p className="text-3xl font-bold text-text mt-1 flex items-center justify-center gap-1">
                {profileStats.avgRating}
                <Star size={20} className="text-amber fill-amber" />
              </p>
              <p className="text-xs text-teal-dark mt-1">
                {profileStats.avgRatingLabel}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted">Reliability Score</p>
              <p className="text-3xl font-bold text-text mt-1">
                {profileStats.reliability}%
              </p>
              <div className="w-24 h-1.5 bg-border rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-teal-dark rounded-full"
                  style={{ width: `${profileStats.reliability}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-border mt-6">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`pb-3 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-teal-dark text-teal-dark"
                : "border-transparent text-muted hover:text-text"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Overview" && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* All sessions table */}
            <div className="lg:col-span-2 bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text">All Sessions</h2>
                <button className="text-sm font-medium text-teal-dark flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={13} />
                </button>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-muted">
                    <th className="font-medium pb-2">Session</th>
                    <th className="font-medium pb-2">Skill</th>
                    <th className="font-medium pb-2">Duration</th>
                    <th className="font-medium pb-2">Status</th>
                    <th className="font-medium pb-2 text-right">Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {allSessions.map((s) => (
                    <tr key={s.id} className="border-t border-border">
                      <td className="py-2.5">
                        <div className="flex items-center gap-2.5">
                          <Avatar name={s.name} size={30} />
                          <div>
                            <p className="font-medium text-text">{s.name}</p>
                            <p className="text-xs text-muted">{s.date}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-muted">{s.skill}</td>
                      <td className="text-muted">{s.duration}</td>
                      <td>
                        <Badge color="teal">{s.status}</Badge>
                      </td>
                      <td className="text-right">
                        <span className="inline-flex items-center gap-1 font-medium text-text">
                          {s.rating.toFixed(1)}
                          <Star size={13} className="text-amber fill-amber" />
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button className="text-sm font-medium text-teal-dark flex items-center gap-1 hover:underline mx-auto mt-4">
                View all sessions <ArrowRight size={13} />
              </button>
            </div>

            {/* Recent activity */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text">Recent Activity</h2>
                <button className="text-sm font-medium text-teal-dark flex items-center gap-1 hover:underline">
                  View all <ArrowRight size={13} />
                </button>
              </div>

              <div className="space-y-4">
                {recentActivity.map((a) => {
                  const cfg = activityIcon[a.type];
                  const Icon = cfg.icon;
                  return (
                    <div key={a.id} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${cfg.color}`}>
                        <Icon size={15} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text leading-snug">{a.text}</p>
                        <p className="text-xs text-muted mt-0.5">{a.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Your rating */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text">Your Rating</h2>
                <button className="text-sm font-medium text-teal-dark hover:underline">
                  View details
                </button>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center shrink-0">
                  <p className="text-4xl font-bold text-text flex items-center gap-1">
                    {profileStats.avgRating}
                    <Star size={22} className="text-amber fill-amber" />
                  </p>
                  <p className="text-xs text-muted mt-1">
                    Based on {totalReviews} reviews
                  </p>
                </div>
                <div className="flex-1 space-y-1.5">
                  {ratingBreakdown.map((r) => (
                    <div key={r.stars} className="flex items-center gap-2 text-xs">
                      <span className="w-8 text-muted">{r.stars} Star</span>
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-teal-dark rounded-full"
                          style={{ width: `${(r.count / totalReviews) * 100}%` }}
                        />
                      </div>
                      <span className="w-4 text-muted">{r.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills teach */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text">Skills You Teach</h2>
                <button className="text-sm font-medium text-teal-dark hover:underline">
                  Manage Skills
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileTeachSkills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 bg-page border border-border rounded-full pl-3 pr-1 py-1"
                  >
                    <span className="text-sm font-medium text-text">{s.name}</span>
                    <Badge color="teal">{s.level}</Badge>
                  </span>
                ))}
              </div>
            </div>

            {/* Skills learn */}
            <div className="bg-white border border-border rounded-2xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-text">Skills You Want to Learn</h2>
                <button className="text-sm font-medium text-teal-dark hover:underline">
                  Manage Skills
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profileLearnSkills.map((s) => (
                  <span
                    key={s.name}
                    className="flex items-center gap-2 bg-page border border-border rounded-full pl-3 pr-1 py-1"
                  >
                    <span className="text-sm font-medium text-text">{s.name}</span>
                    <Badge color="amber">{s.level}</Badge>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {tab !== "Overview" && (
        <div className="bg-white border border-border rounded-2xl p-10 mt-6 text-center text-muted text-sm">
          {tab} tab coming soon.
        </div>
      )}
    </div>
  );
}
