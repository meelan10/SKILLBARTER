import { useAuth } from "../context/AuthContext";

export default function Matches() {
  const { user } = useAuth();

  return (
    <div>
      <p className="mb-1 font-mono text-xs font-medium uppercase tracking-widest text-sage">
        Step 3
      </p>
      <h2 className="mb-2 font-display text-2xl font-semibold text-ink">
        Welcome, {user?.name?.split(" ")[0]}
      </h2>
      <p className="mb-8 max-w-lg font-body text-sm text-slate">
        This is where your compatibility matches will appear once skill
        profiles and matching are wired up next.
      </p>

      <div className="trade-ticket mx-1 flex items-center justify-between px-6 py-5">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate">
            Coming next
          </p>
          <p className="font-display text-lg font-medium text-ink">
            Skills, availability &amp; matches
          </p>
        </div>
        <span className="rounded-full bg-sage-light px-3 py-1 font-mono text-xs font-semibold text-sage">
          PENDING
        </span>
      </div>
    </div>
  );
}
