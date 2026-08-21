import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import { useApi } from "../hooks/useApi";

const categories = ["Technology", "Music", "Design & Media", "Communication", "Business", "Languages", "Other"];

export default function AddSkillPage() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Technology");
  const [description, setDescription] = useState("");
  const { request, loading, error } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await request("/skills", { method: "POST", body: { name, category, description } });
      navigate(`/skills?category=${encodeURIComponent(category)}`);
    } catch {
      // The hook exposes the request error in the form.
    }
  };

  return <div className="max-w-2xl">
    <Link to="/skills" className="text-sm text-muted hover:text-text">Back to skills</Link>
    <h1 className="mt-5 text-2xl font-bold text-text">Add a skill</h1>
    <p className="mt-1 text-muted">Add a skill to the community directory.</p>
    <form onSubmit={handleSubmit} className="mt-7 space-y-5 rounded-2xl border border-border bg-white p-6">
      <div>
        <label htmlFor="skill-name" className="text-sm font-medium text-text">Skill name</label>
        <input id="skill-name" value={name} onChange={(event) => setName(event.target.value)} placeholder="e.g. JavaScript" minLength={2} maxLength={80} required className="mt-1 w-full rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20" />
      </div>
      <div>
        <label htmlFor="skill-category" className="text-sm font-medium text-text">Category</label>
        <select id="skill-category" value={category} onChange={(event) => setCategory(event.target.value)} className="mt-1 w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20">
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="skill-description" className="text-sm font-medium text-text">Description <span className="font-normal text-muted">(optional)</span></label>
        <textarea id="skill-description" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={300} rows={4} placeholder="What can people learn?" className="mt-1 w-full resize-none rounded-lg border border-border px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-teal-dark/20" />
      </div>
      {error && <p className="text-sm text-red">{error}</p>}
      <div className="flex gap-3">
        <Link to="/skills" className="flex-1"><Button type="button" variant="secondary" className="w-full">Cancel</Button></Link>
        <Button type="submit" disabled={loading} className="flex-1">{loading ? "Adding..." : "Add skill"}</Button>
      </div>
    </form>
  </div>;
}
