import { useEffect, useState } from "react";
import { apiRequest } from "../api";
import Avatar from "../components/ui/Avatar";
import Button from "../components/ui/Button";

export default function MatchesPage() {
  const [matches, setMatches] = useState([]);
  useEffect(() => { apiRequest("/matches").then(({ matches: result }) => setMatches(result)).catch(() => setMatches([])); }, []);
  return <div><h1 className="text-2xl font-bold text-text">Find matches</h1><p className="mt-1 text-muted">People whose skills complement yours.</p><div className="mt-7 space-y-4">{matches.length ? matches.map(({ user, score, teach, learn }) => <div key={user.id} className="bg-white border border-border rounded-2xl p-5 flex items-center gap-4"><Avatar name={user.name} size={48} /><div className="flex-1"><div className="flex items-center justify-between"><h2 className="font-bold text-text">{user.name}</h2><span className="font-bold text-teal-dark">{score}% match</span></div><p className="mt-1 text-sm text-muted">Can teach: {teach.map((skill) => skill.name).join(", ") || "Explore your skills"}</p><p className="text-sm text-muted">Wants to learn: {learn.map((skill) => skill.name).join(", ") || "Your skills"}</p></div><Button>Connect</Button></div>) : <p className="text-sm text-muted">No matches yet. Complete onboarding and add skills to your profile.</p>}</div></div>;
}
