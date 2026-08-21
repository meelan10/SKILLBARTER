import { Search } from "lucide-react";
import { skillCategories } from "../utils/mockData";
import Button from "../components/ui/Button";

export default function SkillsPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-text">Search Skills</h1>
      <p className="text-muted mt-1">
        Every skill on campus, and who can teach it.
      </p>

      <div className="relative mt-6 max-w-2xl">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search for a skill — try Python"
          className="w-full bg-card border border-border rounded-full pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-brand/30"
        />
      </div>

      <div className="space-y-8 mt-8">
        {skillCategories.map((cat) => (
          <div key={cat.name}>
            <p className="text-xs font-semibold tracking-wide text-muted mb-3">
              {cat.name.toUpperCase()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="bg-card border border-border rounded-2xl p-5"
                >
                  <p className="font-semibold text-text">{skill.name}</p>
                  <p className="text-sm text-muted mb-4">
                    {skill.count} students can teach
                  </p>
                  <Button variant="secondary" className="w-full">
                    View Students
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
