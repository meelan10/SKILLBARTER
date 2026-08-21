import { useResource } from "../hooks/useApi";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";
import { useApi } from "../hooks/useApi";

export default function MatchesPage() {
  const { data: matches = [], loading, error } = useResource("/matches", "matches");
  const { request, loading: connecting, error: connectError } = useApi();

  const connect = async ({ user, teach, learn }) => {
    const teachSkill = learn[0]?.name || "Skill exchange";
    const receiveSkill = teach[0]?.name || "Knowledge sharing";
    await request("/exchanges", {
      method: "POST",
      body: { recipient: user.id, teach: receiveSkill, receive: teachSkill },
    });
  };
  return <div><h1 className="text-2xl font-bold text-text">Find matches</h1><p className="mt-1 text-muted">People whose skills complement yours.</p><div className="mt-7 space-y-4">{loading ? <p className="text-sm text-muted">Loading matches...</p> : error ? <p className="text-sm text-red">{error}</p> : matches.length ? matches.map((match) => <div key={match.user.id} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4"><Avatar name={match.user.name} size={48} /><div className="flex-1"><div className="flex items-center justify-between"><h2 className="font-bold text-text">{match.user.name}</h2><span className="font-bold text-teal-dark">{match.score}% match</span></div><p className="mt-1 text-sm text-muted">Can teach: {match.teach.map((skill) => skill.name).join(", ") || "Explore your skills"}</p><p className="text-sm text-muted">Wants to learn: {match.learn.map((skill) => skill.name).join(", ") || "Your skills"}</p>{connectError && <p className="mt-2 text-xs text-red">{connectError}</p>}</div><Button disabled={connecting} onClick={() => connect(match)}>{connecting ? "Sending..." : "Connect"}</Button></div>) : <p className="text-sm text-muted">No matches yet. Complete onboarding and add skills to your profile.</p>}</div></div>;
}
