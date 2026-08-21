import { Link, useSearchParams } from "react-router-dom";
import { Plus, Users } from "lucide-react";
import { useResource } from "../hooks/useApi";
import Button from "../components/ui/Button";

export default function SkillsPage() {
  const { data: skills = [], loading, error } = useResource("/skills", "skills");
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";
  const visibleSkills = selectedCategory === "All"
    ? skills
    : skills.filter((skill) => skill.category === selectedCategory);

  const selectCategory = (category) => {
    if (category === "All") setSearchParams({});
    else setSearchParams({ category });
  };

  return <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text">Discover skills</h1>
          <p className="mt-1 text-muted">Explore skills available in the community.</p>
        </div>
        <Link to="/skills/add"><Button className="flex items-center gap-2"><Plus size={16} /> Add skill</Button></Link>
      </div>

      <div className="mt-7 flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((category) => <button key={category} onClick={() => selectCategory(category)} className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${selectedCategory === category ? "border-teal-dark bg-teal-dark text-white" : "border-border bg-white text-muted hover:border-teal"}`}>{category}</button>)}
      </div>

      {selectedCategory !== "All" && <h2 className="mt-5 text-lg font-bold text-text">{selectedCategory} skills</h2>}
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {loading ? <p className="text-sm text-muted">Loading skills...</p> : error ? <p className="text-sm text-red">{error}</p> : visibleSkills.length ? visibleSkills.map((skill) => <div key={skill._id} className="rounded-2xl border border-border bg-white p-5 transition hover:-translate-y-0.5 hover:border-teal">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-dark">{skill.category}</p>
          <h2 className="mt-2 font-bold text-text">{skill.name}</h2>
          <p className="mt-2 text-sm leading-5 text-muted">{skill.description || "Learn this skill from someone in the community."}</p>
          <p className="mt-4 flex items-center gap-1.5 text-xs text-muted"><Users size={14} /> Connect with a skill partner</p>
        </div>) : <p className="text-sm text-muted">No skills found in this category yet.</p>}
      </div>
  </div>;
}
