import { useEffect, useState } from "react";
import { apiRequest } from "../api";

export default function SkillsPage() {
  const [skills, setSkills] = useState([]);
  useEffect(() => { apiRequest("/skills").then(({ skills: result }) => setSkills(result)).catch(() => setSkills([])); }, []);
  return <div><h1 className="text-2xl font-bold text-text">Discover skills</h1><p className="mt-1 text-muted">Explore skills available in the community.</p><div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{skills.length ? skills.map((skill) => <div key={skill._id} className="bg-white border border-border rounded-2xl p-5"><p className="text-xs font-semibold uppercase tracking-wide text-teal-dark">{skill.category}</p><h2 className="mt-2 font-bold text-text">{skill.name}</h2><p className="mt-1 text-sm text-muted">Find someone who can teach or learn this skill.</p></div>) : <p className="text-sm text-muted">No skills loaded yet. Start the backend seed to populate the directory.</p>}</div></div>;
}
